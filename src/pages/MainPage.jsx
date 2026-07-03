import React, { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import LZString from 'lz-string';

const DUMMY_EXAMPLES = {
  low: "To. 사랑하는 할머니께\n\n할머니, 안녕하세요? 저 지훈이에요!\n\n요즘 날씨가 많이 더워졌는데 건강은 어떠신가요?\n저는 학교에서 친구들이랑 재밌게 놀고 있어요.\n이번 주말에 꼭 놀러 갈게요!\n\n항상 건강하세요. 사랑해요!\n\n2026년 6월 14일\nFrom. 지훈 올림",
  high: "To. 존경하는 선생님께\n\n선생님, 안녕하세요? 저 수아입니다.\n\n어제 체육 시간에 다쳤을 때 챙겨주셔서 정말 감사합니다.\n선생님 덕분에 금방 나을 수 있었어요.\n앞으로도 수업 시간에 더 열심히 참여하는 수아가 될게요!\n\n건강 조심하시고 내일 뵙겠습니다.\n\n2026년 6월 14일\nFrom. 김수아 올림"
};

export default function MainPage() {
  const [grade, setGrade] = useState('low');
  const [suggestion, setSuggestion] = useState(null);
  
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [sender, setSender] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  
  // 맞춤법 점검용 고정 키 (Gemini)
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  // 그림 생성용 사용자 입력 키 (OpenAI) - 이제 .env에서 관리
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem('openai_api_key') || '';
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const qrRef = useRef(null);

  const handleCheck = async () => {
    setErrorMessage('');
    if (!content.trim()) {
      setErrorMessage("편지 본문을 먼저 적어주세요!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "너는 초등학생의 글쓰기를 도와주는 다정한 선생님이야. 학생이 쓴 편지글을 보고, 학생의 마음과 내용은 그대로 유지하면서 맞춤법을 교정하고 문맥을 더 자연스럽게 고쳐서 다시 보여줘. 초등 국어과정의 편지글 형식(받을 사람, 첫인사, 본문, 끝인사, 쓴 사람)을 잘 갖추도록 자연스럽게 다듬어줘." }]
          },
          contents: [{
            parts: [{ text: `To. ${recipient}\n\n${content}\n\nFrom. ${sender}` }]
          }]
        })
      });

      if (!response.ok) throw new Error("API 오류 발생");
      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "결과를 받아오지 못했습니다.";
      setSuggestion(resultText);
    } catch (error) {
      setErrorMessage("맞춤법 점검 오류: API 키 또는 네트워크 상태를 확인해주세요.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async () => {
    setErrorMessage('');
    if (!content.trim() || !sender.trim() || !recipient.trim()) {
      setErrorMessage("받는 분, 편지 내용, 보내는 사람을 모두 입력해주세요!");
      return;
    }

    if (!apiKey) {
      setErrorMessage("루트 폴더의 .env 파일에 VITE_OPENAI_API_KEY를 입력해주세요!");
      return;
    }

    setShowModal(true);
    setShowQR(false);
    setIsImageLoading(true);
    setSelectedImage(null);
    setImages([]);

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: "gpt-image-2",
          prompt: `따뜻하고 귀여운 크레파스 손그림(Crayon drawing) 스타일의 동화책 삽화. 다음 편지 내용을 잘 표현해줘: ${content.substring(0, 500)}`,
          n: 1,
          size: "1024x1024"
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "API 오류 발생");
      }
      
      const data = await response.json();
      
      const generatedImages = data.data.map(item => {
        if (item.b64_json) return `data:image/png;base64,${item.b64_json}`;
        if (item.url) return item.url;
        return "";
      });
      
      setImages(generatedImages);
      if (generatedImages.length > 0) {
        setSelectedImage(generatedImages[0]);
        localStorage.setItem('current_drawing', generatedImages[0]);
      }
    } catch (error) {
      setErrorMessage(`앗! 로봇 화가가 넘어졌어요 😭 [이유] ${error.message}`);
      console.error(error);
      setShowModal(false);
    } finally {
      setIsImageLoading(false);
    }
  };

  const generatePostcardBase64 = async (imageSrc, r, c, s) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024 + 600; 
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.drawImage(img, 0, 0, 1024, 1024);
        
        ctx.fillStyle = '#23251d';
        ctx.font = '50px "Nanum Pen Script", cursive, sans-serif';
        
        ctx.fillText(`To. ${r}`, 50, 1024 + 80);
        
        const maxWidth = 924;
        let y = 1024 + 160;
        const lines = c.split('\n');
        for (let line of lines) {
          let words = line.split('');
          let currentLine = '';
          for(let n = 0; n < words.length; n++) {
            let testLine = currentLine + words[n];
            let metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
              ctx.fillText(currentLine, 50, y);
              currentLine = words[n];
              y += 60;
            } else {
              currentLine = testLine;
            }
          }
          ctx.fillText(currentLine, 50, y);
          y += 60;
        }
        
        ctx.textAlign = 'right';
        ctx.fillText(`From. ${s}`, 974, y + 60);
        
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = () => reject(new Error("이미지를 합성하는 중 오류가 발생했습니다."));
      img.src = imageSrc;
    });
  };

  const uploadToImgBB = async (base64Data) => {
    const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
    if (!API_KEY) throw new Error("루트 폴더의 .env 파일에 VITE_IMGBB_API_KEY를 입력해주세요!");
    
    const base64Image = base64Data.split(',')[1];
    const formData = new FormData();
    formData.append("image", base64Image);
    
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error("ImgBB 업로드 실패");
    const data = await response.json();
    return data.data.url;
  };

  const handleCreateQR = async () => {
    if (!selectedImage) return;
    setIsUploading(true);
    setErrorMessage('');
    try {
      const combinedBase64 = await generatePostcardBase64(selectedImage, recipient, content, sender);
      const url = await uploadToImgBB(combinedBase64);
      setQrCodeUrl(url);
      setShowQR(true);
    } catch (error) {
      setErrorMessage(`업로드 실패: ${error.message}`);
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadQR = async () => {
    if (qrRef.current) {
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement('a');
      link.download = 'picture-letter-qr.png';
      link.href = dataUrl;
      link.click();
    }
  };

  const handleCopyQR = async () => {
    if (qrRef.current) {
      try {
        // html-to-image로 dataUrl 생성 후 blob으로 변환하여 클립보드에 저장
        const dataUrl = await toPng(qrRef.current);
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        alert("QR 코드가 클립보드에 쏙! 복사되었습니다 📋✨\n그림판이나 카카오톡에 붙여넣기(Ctrl+V) 해보세요.");
      } catch (err) {
        console.error("복사 실패:", err);
        alert("복사에 실패했습니다. 다른 브라우저를 시도해보세요.");
      }
    }
  };

  const handleCopyPrevent = (e) => {
    e.preventDefault();
    alert("예시글은 복사할 수 없어요! 눈으로 참고해서 나만의 편지를 써보세요 😊");
  };

  const currentExample = suggestion ? suggestion : DUMMY_EXAMPLES[grade];

  return (
    <div className="main-layout">
      {/* API Key UI 제거됨 */}

      <div className="panes-container">
        <div className="pane left-pane glass-panel">
          <div className="header-section">
            <h2>{suggestion ? '💡 AI 선생님의 추천 편지글' : '📖 참고용 예시'}</h2>
            {!suggestion && (
              <div className="toggle-group">
                <button 
                  className={`toggle-btn ${grade === 'low' ? 'active' : ''}`}
                  onClick={() => setGrade('low')}
                >저학년 예시</button>
                <button 
                  className={`toggle-btn ${grade === 'high' ? 'active' : ''}`}
                  onClick={() => setGrade('high')}
                >고학년 예시</button>
              </div>
            )}
            {suggestion && (
               <button className="btn btn-secondary btn-small" onClick={() => setSuggestion(null)}>
                 예시 다시보기
               </button>
            )}
          </div>
          
          <div 
            className="example-content unselectable handwriting"
            onCopy={handleCopyPrevent}
          >
            {isLoading ? (
              <div className="loading-text" style={{ padding: '40px', textAlign: 'center' }}>
                선생님이 편지를 꼼꼼하게 다듬고 있어요... ✍️
              </div>
            ) : (
              currentExample.split('\n').map((line, idx) => (
                 <p key={idx} style={{ minHeight: '1.8rem' }}>{line}</p>
              ))
            )}
          </div>
          <p className="notice">※ 눈으로만 참고하고 복사하기는 안 돼요! 👀</p>
        </div>

        <div className="pane right-pane glass-panel">
          <h2>✍️ 나만의 그림편지 쓰기</h2>
          
          <div className="form-group">
            <label>받을 사람 (To)</label>
            <input 
              type="text" 
              placeholder="누구에게 보내나요? (예: 사랑하는 부모님께)" 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div className="form-group flex-grow">
            <label>편지 본문 (첫인사, 하고 싶은 말, 끝인사)</label>
            <textarea 
              placeholder="마음을 담아 예쁜 편지를 적어보세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>쓴 사람 (From)</label>
            <input 
              type="text" 
              placeholder="누가 보내나요? (예: 홍길동 올림)" 
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            />
          </div>

          <div className="action-buttons" style={{ flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            {errorMessage && (
              <div style={{ color: '#d32f2f', background: '#ffebee', padding: '8px 12px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', width: '100%', textAlign: 'right' }}>
                🔔 {errorMessage}
              </div>
            )}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={handleCheck} 
              >
                ✨ 맞춤법 점검
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleComplete}
              >
                🚀 그림 만들기
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            {!showQR ? (
              <>
                <h2>🎨 완성된 그림</h2>
                {isImageLoading ? (
                  <div className="loading-state" style={{ padding: '40px', textAlign: 'center' }}>
                    로봇 화가가 그림을 쓱싹쓱싹 그리고 있어요... 🎨
                  </div>
                ) : (
                  <>
                    <div className="image-options" style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                      {selectedImage && (
                        <img 
                          src={selectedImage} 
                          alt="Generated Drawing" 
                          style={{ width: '250px', height: '250px', cursor: 'default', border: 'none', borderRadius: '16px' }} 
                        />
                      )}
                    </div>
                    <div className="modal-actions">
                      <button className="btn btn-secondary" onClick={handleComplete}>다시 만들기</button>
                      <button className="btn btn-primary" onClick={handleCreateQR} disabled={isUploading}>
                        {isUploading ? '업로드 중...' : 'QR 생성'}
                      </button>
                      <button className="btn" onClick={() => setShowModal(false)}>닫기</button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <h2>🎉 짜잔! QR코드가 완성되었습니다!</h2>
                <p>프린트해서 점선을 따라 오리거나, <b>QR을 클릭해서 복사</b>해보세요.</p>
                <div className="qr-wrapper" ref={qrRef} onClick={handleCopyQR} title="클릭해서 복사하기" style={{ cursor: 'pointer' }}>
                  <div className="qr-border" style={{ border: '2px dashed black', padding: '20px', borderRadius: '4px' }}>
                    <QRCodeSVG value={qrCodeUrl} size={150} />
                    <p className="qr-sender" style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center', color: 'black' }}>
                      From. {sender}
                    </p>
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="btn btn-secondary" onClick={handleDownloadQR}>💾 이미지로 저장</button>
                  <button className="btn" onClick={() => {
                    setShowModal(false);
                    setShowQR(false);
                    setSelectedImage(null);
                  }}>닫기</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
