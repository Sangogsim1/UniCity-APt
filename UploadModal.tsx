import React, { useState, useEffect } from 'react';
import { Category, Complex, ApartmentType, Space, PropertyImage, FloorLevel } from '../types';
import { COMPLEX_TYPES } from '../constants';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (image: PropertyImage) => void;
  onVideoUpload: (category: string, url: string) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload, onVideoUpload }) => {
  const [uploadType, setUploadType] = useState<'image' | 'video'>('image');
  const [preview, setPreview] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [metadata, setMetadata] = useState({
    category: '내부' as Category,
    complex: '1단지' as Complex,
    type: '25ty' as ApartmentType,
    space: '거실' as Space,
    floorLevel: '중층' as FloorLevel
  });

  useEffect(() => {
    const firstAvailableType = COMPLEX_TYPES[metadata.complex][0];
    setMetadata(prev => ({ ...prev, type: firstAvailableType }));
  }, [metadata.complex]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(f);
      });
      setPreview(dataUrl);
    }
  };

  const handleSubmit = async () => {
    if (uploadType === 'image' && !preview) return;
    if (uploadType === 'video' && !videoUrl) return;

    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    if (uploadType === 'image') {
      onUpload({
        id: `local-${Date.now()}`,
        propertyId: 'prop-101',
        imageUrl: preview,
        createdAt: new Date().toISOString().split('T')[0],
        orientation: '남향',
        ...metadata
      });
    } else {
      onVideoUpload(metadata.category, videoUrl);
    }
    
    setIsUploading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 p-4 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-black tracking-tight">콘텐츠 관리 시스템</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2.5}/></svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex p-1.5 bg-slate-100 rounded-2xl">
            <button onClick={() => setUploadType('image')} className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${uploadType === 'image' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>PHOTO UPLOAD</button>
            <button onClick={() => setUploadType('video')} className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${uploadType === 'video' ? 'bg-white text-red-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>VIDEO URL</button>
          </div>

          {uploadType === 'image' ? (
            <div className="aspect-video w-full rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 cursor-pointer overflow-hidden relative group" onClick={() => document.getElementById('file-input')?.click()}>
              {preview ? (
                <>
                  <img src={preview} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black">사진 변경하기</div>
                </>
              ) : (
                <div className="text-center space-y-3">
                  <div className="text-slate-300 flex justify-center"><svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4" strokeWidth={2}/></svg></div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">매물 사진 선택 (JPG/PNG)</p>
                </div>
              )}
              <input id="file-input" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">YouTube URL</label>
              <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500 outline-none transition-all" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">분류</label>
              <select value={metadata.category} onChange={(e) => setMetadata({...metadata, category: e.target.value as Category})} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none">
                <option value="내부">내부</option><option value="외부">외부</option><option value="조망">조망</option><option value="커뮤니티">커뮤니티</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">단지</label>
              <select value={metadata.complex} onChange={(e) => setMetadata({...metadata, complex: e.target.value as Complex})} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none">
                <option value="1단지">1단지</option><option value="2단지">2단지</option><option value="3단지">3단지</option><option value="4단지">4단지</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">타입</label>
              <select value={metadata.type} onChange={(e) => setMetadata({...metadata, type: e.target.value as ApartmentType})} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none">
                {COMPLEX_TYPES[metadata.complex].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">공간</label>
              <select value={metadata.space} onChange={(e) => setMetadata({...metadata, space: e.target.value as Space})} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none">
                <option value="거실">거실</option><option value="주방">주방</option><option value="안방">안방</option><option value="욕실(거실)">욕실(거실)</option><option value="외부뷰">외부뷰</option><option value="기타관련이미지">기타</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50/50 border-t border-slate-100">
          <button 
            disabled={isUploading || (uploadType === 'image' ? !preview : !videoUrl)} 
            onClick={handleSubmit} 
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm disabled:bg-slate-200 transition-all active:scale-95"
          >
            {isUploading ? '처리 중...' : '등록 완료'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;