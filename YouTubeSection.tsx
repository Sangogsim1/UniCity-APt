
import React, { useState, useEffect } from 'react';
import { Category } from '../types';

interface YouTubeSectionProps {
  initialVideos?: Record<string, string>;
  generalVideo?: string;
  activeCategory: Category | '전체';
  isAdmin: boolean;
  onUpdateVideos: (videos: Record<string, string>) => void;
}

const YouTubeSection: React.FC<YouTubeSectionProps> = ({ 
  initialVideos = {}, 
  generalVideo = '', 
  activeCategory, 
  isAdmin,
  onUpdateVideos
}) => {
  const [videos, setVideos] = useState<Record<string, string>>(initialVideos);
  const [selectedCategory, setSelectedCategory] = useState<Category | '전체'>(activeCategory);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  const categories: (Category | '전체')[] = ['전체', '내부', '외부', '조망', '커뮤니티'];

  useEffect(() => {
    setVideos(initialVideos);
  }, [initialVideos]);

  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  const getEmbedUrl = (input: string) => {
    if (!input) return '';
    if (input.includes('embed/')) return input;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = input.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : input;
  };

  const handleSave = () => {
    const updated = { ...videos };
    const embed = getEmbedUrl(tempUrl);
    if (embed) {
      updated[selectedCategory] = embed;
    } else {
      delete updated[selectedCategory];
    }
    setVideos(updated);
    onUpdateVideos(updated);
    setIsEditing(false);
    setTempUrl('');
  };

  const currentVideoUrl = selectedCategory === '전체' 
    ? (videos['전체'] || generalVideo) 
    : (videos[selectedCategory] || videos['전체'] || generalVideo);

  const hasVideo = !!currentVideoUrl;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-100">
             <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
               <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
             </svg>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">
              {selectedCategory === '전체' ? '단지 전체 홍보 영상' : `${selectedCategory} 영상 투어`}
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              {selectedCategory === '전체' ? 'General Tour' : `${selectedCategory} Video Selection`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === cat 
                  ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-100' 
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
          {isAdmin && (
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="ml-2 p-1.5 text-slate-400 hover:text-red-600 transition-colors"
              title="Edit Video URL"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="p-4 bg-slate-50 border-b border-slate-100 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase">영상 URL 수정: {selectedCategory}</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="YouTube URL 입력 (https://...)"
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button 
              onClick={handleSave}
              className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold"
            >
              저장
            </button>
          </div>
        </div>
      )}

      <div className="aspect-video w-full bg-slate-900">
        {hasVideo ? (
          <iframe 
            src={currentVideoUrl}
            title="YouTube video player"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold">{selectedCategory} 분류에 등록된 영상이 없습니다.</p>
              <p className="text-xs text-slate-600 italic">No video tour available for this category yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeSection;
