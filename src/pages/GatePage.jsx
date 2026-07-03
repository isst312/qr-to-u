import React from 'react';
import { useNavigate } from 'react-router-dom';

const GatePage = () => {
  const navigate = useNavigate();

  const handleAgree = () => {
    navigate('/main');
  };

  const handleDisagree = () => {
    alert("윤리 핵심가이드에 동의하지 않으시면 다음으로 넘어갈 수 없습니다! 꼭 다시 읽고 실천을 다짐해 주세요. 😊");
  };

  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const termsText = `본 이용약관(이하 '약관')은 QR to U(이하 '본 서비스')이 제공하는 교육용 웹 애플리케이션 서비스의 이용에 관한 사항을 규정합니다.

제1조 (목적)
이 약관은 본 서비스가 제공하는 무료 교육용 웹 애플리케이션 서비스(이하 '서비스')를 이용함에 있어 서비스 제공자와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (정의)
'서비스'란 본 플랫폼에서 제공하는 교육용 웹 애플리케이션을 말합니다.
'이용자'란 본 서비스에 접속하여 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.
'회원'이란 본 서비스에 회원등록을 한 자로서, 서비스를 이용할 수 있는 자를 말합니다.

제3조 (약관의 명시와 개정)
① 본 서비스는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.
② 본 서비스는 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
③ 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 서비스 내에 그 적용일자 7일 이전부터 공지합니다.

제4조 (서비스의 제공)
본 서비스는 교육 목적의 무료 웹 애플리케이션을 제공합니다.
서비스의 이용은 무료이며, 별도의 유료 결제가 필요하지 않습니다.
본 서비스는 교육 활동 지원을 목적으로 하며, 상업적 목적으로 운영되지 않습니다.

제5조 (서비스의 중단)
① 본 서비스는 시스템 점검, 교체 및 고장, 통신 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
② 본 서비스는 무료로 제공되는 교육용 서비스이므로, 서비스 중단으로 인한 별도의 보상은 제공되지 않습니다.

제6조 (회원가입)
① 이용자는 서비스가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의함으로써 회원가입을 신청합니다.
② 만 14세 미만의 아동은 학교 가정통신문 등을 통해 보호자(법정대리인)의 동의를 받은 후 서비스를 이용할 수 있습니다.

제7조 (회원 탈퇴)
회원은 본 서비스에 언제든지 탈퇴를 요청할 수 있으며, 서비스는 즉시 회원탈퇴를 처리합니다.

제8조 (이용자의 의무)
이용자는 다음 행위를 하여서는 안 됩니다.
- 허위 내용의 등록
- 타인의 정보 도용
- 서비스에 게시된 정보의 무단 변경
- 서비스의 운영을 방해하는 행위
- 타인의 명예를 손상시키거나 불이익을 주는 행위
- 공서양속에 반하는 정보를 게시하는 행위

제9조 (저작권)
① 본 서비스가 작성한 저작물에 대한 저작권은 서비스 제공자에게 귀속합니다.
② 이용자는 서비스를 이용하여 얻은 정보를 서비스 제공자의 사전 승낙 없이 복제, 송신, 출판, 배포하여서는 안 됩니다.

제10조 (면책조항)
① 본 서비스는 무료로 제공되는 교육용 서비스로서, 서비스 이용 중 발생하는 기술적 문제나 오류에 대해 제한적 책임을 집니다.
② 본 서비스가 연결하는 외부 웹 애플리케이션의 내용에 대해서는 해당 애플리케이션 제공자가 책임을 집니다.

제11조 (분쟁해결)
본 서비스와 이용자 간에 발생한 분쟁에 관하여는 대한민국 법을 적용하며, 소송이 제기되는 경우 서비스 제공자의 소재지를 관할하는 법원을 관할법원으로 합니다.

부칙
이 약관은 2026년 7월 3일부터 시행됩니다.`;

  const privacyText = `교사 개발 학습지원 소프트웨어 표준 개인정보처리방침(안)

본 표준안은 서울시 소속 교사가 직접 개발하여 교육 활동에 활용하는 소프트웨어가 학습지원 소프트웨어 선정 기준(교육부)의 필수 요건을 충족하도록 돕기 위해 작성되었습니다.

[ingyu’s ai world](이하 본 서비스)은(는) 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.

제1조 (개인정보의 처리 목적)
학생 회원 가입 및 관리: 학급 구성원 식별, 학습 진도율 확인, 교사의 피드백 제공
서비스 제공: 학습 콘텐츠 제공, 과제 제출 및 기록 저장, 학습 이력 관리

제2조 (개인정보의 처리 및 보유기간)
보유 기간: 해당 학년도 종료 시(익년 2월 말) 또는 학생의 졸업/진급 시까지
파기 시점: 보유 기간 종료 후 지체 없이(5일 이내) 파기

제3조 (처리하는 개인정보 항목)
수집 항목: 아이디, 비밀번호, 이름(또는 닉네임), 학년, 반, 번호
수집하지 않는 항목: 주민등록번호, 주소, 전화번호, 이메일 등 불필요한 민감 정보

제4조 (만 14세 미만 아동의 개인정보 처리에 관한 사항)
법정대리인의 동의를 받습니다.

제5조 (개인정보의 파기 절차 및 방법)
지체 없이 해당 개인정보를 파기(DB 영구 삭제)합니다.

제6조 (개인정보의 안전성 확보조치)
비밀번호 암호화 및 해킹 등에 대비한 기술적 대책을 운영합니다.

제7조 (정보주체와 법정대리인의 권리·의무 및 행사방법)
언제든지 개인정보 열람·정정·삭제 요구를 할 수 있습니다.

제8조 (개인정보 보호책임자)
성명: 백인규 (개발자)
소속: 서울가동초등학교
직위: 교사

제9조 (개인정보 처리방침 변경)
이 방침은 2026년 3월 1일부터 적용됩니다.`;

  return (
    <div className="gate-container">
      <div className="gate-panel">
        <div className="gate-header">
          <p className="eyebrow">Ethics Guide</p>
          <h2>윤리 핵심가이드</h2>
          <p>안전하고 올바른 AI 활용을 위해 아래의 가이드를 꼭 읽어주세요.</p>
        </div>

        <div className="ethics-list">
          <div className="ethics-item">
            <div className="ethics-badges">
              <span className="badge badge-orange">주도성</span>
              <span className="badge badge-green">합목적성</span>
            </div>
            <div className="ethics-content">
              <p className="ethics-guide-num">가이드 1. 활용 목적</p>
              <h3>생성형 AI를 쓰기 전, '왜' 쓰는지 말할 수 있어야 해요.</h3>
              <p>생성형 AI를 사용하기 전에 '지금 내가 왜 쓰려고 하지?'라고 스스로 물어보세요. 생성형 AI는 내 생각을 대신해주는 게 아니라, 내 생각을 도와주는 도구임을 기억하세요. 모든 공부에 생성형 AI가 필요한 것은 아니므로, 지금 하는 활동에 생성형 AI를 사용하는 것이 나의 학습에 정말 도움이 될지 먼저 고민해요.</p>
            </div>
          </div>
          
          <div className="ethics-item">
            <div className="ethics-badges">
              <span className="badge badge-orange">주도성</span>
            </div>
            <div className="ethics-content">
              <p className="ethics-guide-num">가이드 2. 주도적 학습</p>
              <h3>생성형 AI에게 물어보기 전, 내 생각을 먼저 말해요.</h3>
              <p>막막할 때 바로 생성형 AI에게 묻고 싶은 마음이 들 수 있지만, 먼저 스스로 시도해 보아야 나의 성장에 도움이 돼요. 주제에 대해 내가 아는 것과 내 아이디어를 먼저 공책에 적거나 정리한 뒤에 생성형 AI를 활용하세요.</p>
            </div>
          </div>
          
          <div className="ethics-item">
            <div className="ethics-badges">
              <span className="badge badge-orange">주도성</span>
            </div>
            <div className="ethics-content">
              <p className="ethics-guide-num">가이드 3. 비판적 검증</p>
              <h3>생성형 AI가 틀릴 수 있다는 점을 알아요.</h3>
              <p>생성형 AI는 틀린 정보를 마치 사실인 것처럼 제시하기도 하므로, 알려준 내용은 항상 '정말 맞을까?' 하고 한 번 더 확인하는 습관을 가져요. 중요한 내용일수록 책을 찾아보거나 선생님께 여쭤보는 등 다른 방법으로도 꼭 다시 확인하세요.</p>
            </div>
          </div>
          
          <div className="ethics-item">
            <div className="ethics-badges">
              <span className="badge badge-orange">주도성</span>
              <span className="badge badge-green">합목적성</span>
            </div>
            <div className="ethics-content">
              <p className="ethics-guide-num">가이드 4. 사고의 확장</p>
              <h3>생성형 AI와 함께 상상하며 내 생각을 더 크게 키워요.</h3>
              <p>생성형 AI를 내 생각의 범위를 넓혀주는 도구로 사용해보세요. 생성형 AI의 결과물을 그대로 사용하지 않고, 나의 경험과 생각을 더하여 나만의 색깔을 담은 최종 결과물을 만들어요.</p>
            </div>
          </div>
          
          <div className="ethics-item">
            <div className="ethics-badges">
              <span className="badge badge-blue">안전성</span>
            </div>
            <div className="ethics-content">
              <p className="ethics-guide-num">가이드 5. 안전과 관계</p>
              <h3>나의 정보와 비밀을 말하지 않아요.</h3>
              <p>내가 입력한 정보는 어디에서 어떻게 사용될지 모르기 때문에 이름, 주소, 학교, 전화번호 같은 개인정보는 생성형 AI에게 알려주면 안돼요. 생성형 AI는 계산된 답변을 내놓는 프로그램이라 감정이 없어요. 나의 고민을 털어놓으며 지나치게 의지하기보다, 친구나 부모님, 선생님과의 실제 대화를 통해 마음을 나누어요.</p>
            </div>
          </div>
          
          <div className="ethics-item">
            <div className="ethics-badges">
              <span className="badge badge-yellow">투명성</span>
            </div>
            <div className="ethics-content">
              <p className="ethics-guide-num">가이드 6. 투명성·윤리</p>
              <h3>생성형 AI의 도움을 받았다면 숨기지 않고 정직하게 이야기해요.</h3>
              <p>어느 부분이 생성형 AI의 것이고 어느 부분이 나의 것인지 명확히 밝히는 것은 나 자신을 속이지 않는 정직한 태도예요. 생성형 AI를 쓴 사실을 정직하게 밝힐 때 나의 노력이 더 빛나고 가치 있게 인정받을 수 있어요.</p>
            </div>
          </div>
        </div>
        
        <div className="gate-footer" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary agree-button" onClick={handleAgree} style={{ width: 'auto', padding: '1rem 3rem' }}>
            동의함
          </button>
          <button className="btn btn-secondary disagree-button" onClick={handleDisagree} style={{ width: 'auto', padding: '1rem 3rem', borderRadius: '100px', fontSize: '1.2rem' }}>
            동의하지 않음
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '14px', color: 'var(--ph-body)', opacity: 0.8, fontWeight: 500, display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
          <span>제작자: 서울대방초등학교 교사 이시온</span>
          <span>|</span>
          <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setShowTerms(true)}>이용약관</span>
          <span>|</span>
          <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setShowPrivacy(true)}>개인정보처리방침</span>
        </div>
      </div>

      {/* 이용약관 모달 */}
      {showTerms && (
        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', textAlign: 'left', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '16px' }}>이용약관</h2>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: 'var(--ph-canvas)', borderRadius: '6px', whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.6' }}>
              {termsText}
            </div>
            <button className="btn btn-primary" onClick={() => setShowTerms(false)} style={{ marginTop: '16px', alignSelf: 'center' }}>닫기</button>
          </div>
        </div>
      )}

      {/* 개인정보처리방침 모달 */}
      {showPrivacy && (
        <div className="modal-overlay" onClick={() => setShowPrivacy(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', textAlign: 'left', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '16px' }}>개인정보처리방침</h2>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: 'var(--ph-canvas)', borderRadius: '6px', whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.6' }}>
              {privacyText}
            </div>
            <button className="btn btn-primary" onClick={() => setShowPrivacy(false)} style={{ marginTop: '16px', alignSelf: 'center' }}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GatePage;
