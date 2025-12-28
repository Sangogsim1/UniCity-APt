import React, { useState } from 'react';
import { PropertyImage } from '../types';
import ComparisonSlider from './ComparisonSlider';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: PropertyImage[];
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose, images }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || images.length < 2) return null;

  const handleCopy = () => {
    if (!analysis) return;
    navigator.clipboard.writeText(analysis);
    alert('비교 리포트가 복사되었습니다.');
  };

  const generateReport = async () => {
    setIsLoading(true);
    setAnalysis(null);

    // 전문가 분석 프로세스 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    const report = `## 🏙️ 유니시티 프리미엄 매물 비교 분석 결과

본 분석은 여여부동산 박혜경 대표의 실무 데이터를 기반으로 작성된 맞춤 리포트입니다.

### 1. 공간별 컨디션 대조
- **좌측 매물 (${images[0].complex} ${images[0].type}):** ${images[0].space} 영역의 마감 상태가 매우 우수하며, 세련된 무드를 제공합니다.
- **우측 매물 (${images[1].complex} ${images[1].type}):** ${images[1].space} 기준으로 개방감이 뛰어나며 실거주 편의성이 극대화된 구조입니다.

### 2. 단지별 특이점
${images[0].complex}와 ${images[1].complex}는 각각의 조경 및 커뮤니티 접근성에서 차이가 있습니다. 선택하신 두 매물은 모두 ${images[0].space}라는 핵심 공간에서 각기 다른 매력을 보유하고 있습니다.

### 3. 전문가 총평
비교하신 두 매물은 유니시티 내에서도 상위 컨디션을 유지하고 있는 매물들입니다. 가족 구성원의 동선과 선호하시는 인테리어 톤에 따라 최적의 선택이 가능합니다.

---
**📞 상담 및 현장 방문 예약: 010-5016-3331**`;

    setAnalysis(report);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-xl overflow-y-auto">
      <div className="absolute top-6 right-6 z-[110]">
        <button onClick={onClose} className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20 active:scale-90">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      
      <div className="w-full max-w-4xl my-auto space-y-6 py-10 fade-in">
        <div className="text-center space-y-2">
          <div className="inline-block px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Premium Analytics</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tighter">매물 정밀 비교 분석</h2>
        </div>

        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5">
          <ComparisonSlider imageLeft={images[0]} imageRight={images[1]} />
        </div>

        <div className="space-y-4">
          <button 
            onClick={generateReport} 
            disabled={isLoading} 
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl ${
              isLoading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-white text-slate-900 hover:bg-blue-50 active:scale-95'
            }`}
          >
            {isLoading ? '매물 데이터 분석 중...' : '전문가 분석 리포트 확인'}
          </button>

          {analysis && (
            <div className="bg-white rounded-[2.5rem] p-6 md:p-10 text-slate-800 space-y-6 shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="font-black text-xl text-blue-600 italic">ANALYSIS REPORT</h3>
                <button onClick={handleCopy} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                </button>
              </div>
              <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed text-sm md:text-base font-medium">
                {analysis}
              </div>
              <div className="pt-6 border-t border-slate-100">
                <a href="tel:01050163331" className="block w-full text-center bg-slate-900 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                  박혜경 대표 실시간 전화 상담
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;