import React from 'react';
import { useSearchParams } from 'react-router-dom';
import LZString from 'lz-string';

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const d = searchParams.get('d');
  
  let recipient = '', content = '', sender = '', imgId = '';
  
  if (d) {
    try {
      const data = JSON.parse(LZString.decompressFromEncodedURIComponent(d));
      recipient = data.recipient || '';
      content = data.content || '';
      sender = data.sender || '';
      imgId = data.imgId || '';
    } catch (e) {
      console.error(e);
    }
  } else {
    recipient = searchParams.get('recipient') || '';
    content = searchParams.get('content') || '';
    sender = searchParams.get('sender') || '';
    imgId = searchParams.get('imgId') || '';
  }

  const img = imgId ? localStorage.getItem(imgId) : searchParams.get('img') || '';

  return (
    <div className="result-layout">
      <div className="letter-paper">
        {img && <img src={img} alt="Drawing" className="result-img" />}
        
        {recipient && <h2 className="handwriting recipient">To. {recipient}</h2>}
        
        <div className="handwriting content">
          {content ? content.split('\n').map((line, i) => <p key={i}>{line}</p>) : <p>편지 내용이 없어요.</p>}
        </div>
        
        {sender && <h3 className="handwriting sender">From. {sender}</h3>}
      </div>
    </div>
  );
}
