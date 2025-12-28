
import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const currentUrl = window.location.href;

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500">여여</span>부동산중개사무소
            </h2>
            <p className="text-sm italic font-light tracking-wide">"여여스럽게 한결같은 동반자가 되겠습니다."</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">대표자</p>
              <p className="text-slate-200 font-bold">박혜경</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">전화번호</p>
              <a href="tel:010-5016-3331" className="text-blue-400 hover:text-blue-300 font-bold">010-5016-3331</a>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">주소</p>
              <p className="text-slate-300 leading-relaxed text-xs">
                창원시 의창구 중동로 59, 110호 (유니시티3단지 상가)
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:items-end justify-between space-y-6">
           <div className="flex gap-4">
              <button 
                onClick={() => setShowQR(true)}
                className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" strokeWidth={2}/></svg>
                모바일로 보기
              </button>
           </div>
           <p className="text-[10px] text-slate-600 text-right">
             © 2024 Yeoyeo Real Estate. All rights reserved.<br/>
             전문가용 AI 매물 비교 플랫폼 v2.0
           </p>
        </div>
      </div>

      {showQR && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4" onClick={() => setShowQR(false)}>
          <div className="bg-white rounded-[3rem] p-8 max-w-sm w-full text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">모바일 테스트</h3>
              <p className="text-xs text-slate-500">QR 코드를 스캔하여 폰에서 확인하세요.</p>
            </div>
            <div className="aspect-square w-48 h-48 bg-slate-50 rounded-3xl mx-auto flex items-center justify-center border-4 border-slate-100 p-4">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`} 
                alt="QR Code" 
                className="w-full h-full"
              />
            </div>
            <button 
              onClick={() => setShowQR(false)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
