import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ComparisonModal from './components/ComparisonModal';
import YouTubeSection from './components/YouTubeSection';
import Footer from './components/Footer';
import AdminAuth from './components/AdminAuth';
import UploadModal from './components/UploadModal';
import { MOCK_PROPERTY, MOCK_IMAGES } from './constants';
import { FilterState, PropertyImage, Category, Space, Complex } from './types';

const TRANSLATIONS: Record<string, string> = {
  '내부': 'Interior', '외부': 'Exterior', '조망': 'View', '커뮤니티': 'Community',
  '거실': 'Living', '주방': 'Kitchen', '안방': 'Master', '욕실(거실)': 'Bath 1',
  '욕실(안방)': 'Bath 2', '작은방1': 'Room 1', '작은방2': 'Room 2', '작은방3': 'Room 3',
  '작은방4': 'Room 4', '드레스룸': 'Dress', '펜트리': 'Pantry', '알파룸': 'Alpha',
  '세탁실': 'Laundry', '외부뷰': 'View', '옵션': 'Option', '구조도': 'Structure',
  '평면도': 'Floorplan', '기타관련이미지': 'Related', '기타': 'Misc',
  '저층': 'Low', '중층': 'Mid', '고층': 'High',
  '1단지': 'Complex 1', '2단지': 'Complex 2', '3단지': 'Complex 3', '4단지': 'Complex 4',
};

const App: React.FC = () => {
  const [images, setImages] = useState<PropertyImage[]>(MOCK_IMAGES);
  const [categoryVideos, setCategoryVideos] = useState<Record<string, string>>(MOCK_PROPERTY.categoryVideos || {});
  const [filters, setFilters] = useState<FilterState>({
    category: '전체',
    complex: '전체',
    type: '전체',
    space: '전체',
  });
  
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [adminPin, setAdminPin] = useState(() => localStorage.getItem('admin_pin') || '1234');

  // 권한 체크 시뮬레이션 (userId !== req.user.id 상황 대응)
  const checkPermission = () => {
    // 실제 서버 환경이라면 401 에러를 반환하겠지만,
    // 클라이언트에서는 세션 유효성이나 관리자 상태를 체크합니다.
    if (!isAdmin) {
      alert('오류: 권한 없음 (Unauthorized - 401)');
      setIsAuthOpen(true);
      return false;
    }
    return true;
  };

  useEffect(() => {
    localStorage.setItem('admin_pin', adminPin);
  }, [adminPin]);

  const filteredImages = useMemo(() => {
    return images.filter(img => {
      const matchCat = filters.category === '전체' || img.category === filters.category;
      const matchComp = filters.complex === '전체' || img.complex === filters.complex;
      const matchType = filters.type === '전체' || img.type === filters.type;
      const matchSpace = filters.space === '전체' || img.space === filters.space;
      return matchCat && matchComp && matchType && matchSpace;
    });
  }, [filters, images]);

  const toggleSelection = (id: string) => {
    setSelectedImageIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  const deleteImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // 요청하신 권한 체크 로직 적용
    if (!checkPermission()) return;
    
    if (!window.confirm('이 사진을 정말 삭제하시겠습니까?')) return;
    setImages(prev => prev.filter(img => img.id !== id));
    setSelectedImageIds(prev => prev.filter(pId => pId !== id));
  };

  const handleUpload = (newImg: PropertyImage) => {
    if (!checkPermission()) return;
    setImages(prev => [newImg, ...prev]);
    setIsUploadOpen(false);
  };

  const handleVideoUpload = (category: string, url: string) => {
    if (!checkPermission()) return;
    setCategoryVideos(prev => ({ ...prev, [category]: url }));
    setIsUploadOpen(false);
  };

  const handleUpdateVideos = (updatedVideos: Record<string, string>) => {
    if (!checkPermission()) return;
    setCategoryVideos(updatedVideos);
  };

  const selectedImages = useMemo(() => {
    return images.filter(img => selectedImageIds.includes(img.id));
  }, [selectedImageIds, images]);

  const clearSelection = () => setSelectedImageIds([]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header property={MOCK_PROPERTY} />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 md:py-8 space-y-6 md:space-y-8">
        <div className="flex justify-end gap-3 px-1">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-green-600 bg-green-100 px-3 py-1.5 rounded-full border border-green-200 shadow-sm">ADMIN MODE</span>
              <button 
                onClick={() => setIsUploadOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4" strokeWidth={3}/></svg>
                콘텐츠 등록
              </button>
              <button 
                onClick={() => setIsAdmin(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-medium p-2 transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="text-slate-300 hover:text-slate-500 flex items-center gap-2 transition-all group p-1.5"
            >
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth={2.5}/></svg>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Manager Login</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <YouTubeSection 
              initialVideos={categoryVideos} 
              generalVideo={MOCK_PROPERTY.youtubeUrl} 
              activeCategory={filters.category}
              isAdmin={isAdmin}
              onUpdateVideos={handleUpdateVideos}
            />
            <FilterBar filters={filters} onChange={setFilters} />
          </div>
          
          <div className="lg:col-span-1">
             <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl md:rounded-[2rem] p-6 md:p-8 text-white shadow-2xl shadow-blue-200 lg:sticky lg:top-24 border border-white/10">
                <h4 className="text-lg md:text-xl font-black mb-4 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                   </div>
                   포토존 비교 가이드
                </h4>
                <p className="text-blue-100 text-[9px] mb-6 font-black tracking-[0.1em] uppercase opacity-60">Visual Analytics Tool</p>
                <ul className="space-y-4 md:space-y-6 text-sm text-blue-50">
                  <li className="flex gap-3 md:gap-4">
                    <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black text-xs md:text-sm border border-white/20 shadow-inner">1</span>
                    <div>
                      <p className="font-black text-sm md:text-base">사진 2장 선택</p>
                      <p className="text-[11px] md:text-xs opacity-70 mt-0.5">비교할 사진을 탭하여 번호를 확인하세요.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 md:gap-4">
                    <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black text-xs md:text-sm border border-white/20 shadow-inner">2</span>
                    <div>
                      <p className="font-black text-sm md:text-base">분석 시작</p>
                      <p className="text-[11px] md:text-xs opacity-70 mt-0.5">하단의 '비교분석' 버튼을 클릭합니다.</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
                  <p className="text-[9px] opacity-50 mb-2 md:mb-3 font-black uppercase tracking-[0.2em]">Consultation Service</p>
                  <p className="text-xs md:text-sm opacity-80 mb-0.5">박혜경 대표 (CEO)</p>
                  <p className="text-xl md:text-2xl font-black tabular-nums tracking-tight">010-5016-3331</p>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 px-1">
            <h3 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-2">
              매물 갤러리 
              <span className="text-blue-600 font-black text-xs bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shadow-sm">
                {filteredImages.length}
              </span>
            </h3>
            {selectedImageIds.length > 0 && (
              <button 
                onClick={clearSelection}
                className="text-[10px] md:text-xs font-black text-red-500 hover:text-red-600 transition-all flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-xl border border-red-100 shadow-sm active:scale-95"
              >
                선택 초기화 ({selectedImageIds.length}/2)
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredImages.map(img => {
              const isSelected = selectedImageIds.includes(img.id);
              const selectionIndex = selectedImageIds.indexOf(img.id);
              
              return (
                <div 
                  key={img.id}
                  onClick={() => toggleSelection(img.id)}
                  className={`group relative aspect-[4/3] rounded-2xl md:rounded-[1.5rem] overflow-hidden cursor-pointer transition-all duration-500 ring-offset-2 md:ring-offset-4 ${
                    isSelected 
                      ? 'ring-4 md:ring-[6px] ring-blue-600 shadow-2xl scale-[1.03] z-10' 
                      : 'hover:shadow-xl hover:ring-2 md:hover:ring-4 hover:ring-slate-300'
                  }`}
                >
                  <img 
                    src={img.imageUrl} 
                    alt={img.space} 
                    className={`w-full h-full object-cover transition-transform duration-1000 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                  
                  <div className="absolute top-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-white text-[9px] md:text-[10px] font-black tracking-tight drop-shadow-md flex items-center gap-1.5">
                        <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
                        {img.complex} {img.type}
                      </span>
                      <span className="text-blue-300 text-[11px] md:text-[13px] font-black drop-shadow-lg pl-2 md:pl-3">
                        {img.space}
                      </span>
                    </div>
                  </div>

                  <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'bg-blue-600/10' : 'bg-black/0 group-hover:bg-black/10'}`} />

                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-2 z-20">
                      <button 
                        onClick={(e) => deleteImage(img.id, e)}
                        className="p-1.5 md:p-2 bg-red-600/90 text-white rounded-lg md:rounded-xl shadow-lg hover:bg-red-700 transition-all active:scale-90 border border-white/20 backdrop-blur-md"
                      >
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2.5}/></svg>
                      </button>
                    </div>
                  )}

                  <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 flex flex-wrap gap-1 md:gap-1.5 opacity-0 md:group-hover:opacity-100 translate-y-2 md:group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-[8px] md:text-[9px] px-2 py-0.5 md:px-3 md:py-1 rounded-full font-black uppercase tracking-wider border border-white/10">
                      {TRANSLATIONS[img.category] || img.category}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-blue-600/90 backdrop-blur-md rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-2xl border-2 md:border-4 border-white/50 scale-100 animate-in zoom-in-75 duration-300 z-30">
                      <span className="font-black text-xl md:text-2xl">{selectionIndex + 1}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredImages.length === 0 && (
            <div className="py-16 md:py-24 text-center space-y-6 bg-white rounded-3xl md:rounded-[3rem] border-2 md:border-4 border-dashed border-slate-100 shadow-inner px-4">
              <div className="text-slate-200 flex justify-center">
                <svg className="w-16 h-16 md:w-24 md:h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-1 px-4 max-w-sm mx-auto">
                <p className="text-slate-600 font-black text-lg md:text-xl">결과가 없습니다.</p>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">필터를 변경하거나 초기화 버튼을 눌러주세요.</p>
              </div>
              <button 
                onClick={() => setFilters({ category: '전체', complex: '전체', type: '전체', space: '전체' })}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-slate-800 transition-all shadow-xl active:scale-95"
              >
                전체 조건 초기화
              </button>
            </div>
          )}
        </div>
      </main>

      <div className={`fixed bottom-6 md:bottom-8 left-0 right-0 z-40 px-4 md:px-6 transition-all duration-700 ${selectedImageIds.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'}`}>
        <div className="max-w-md mx-auto bg-slate-900/95 shadow-2xl rounded-3xl md:rounded-[2.5rem] p-3 md:p-5 border border-white/10 flex items-center justify-between gap-3 md:gap-5 backdrop-blur-3xl">
          <div className="flex -space-x-3 md:-space-x-5 overflow-hidden p-1">
            {selectedImages.map(img => (
              <div key={img.id} className="relative group">
                 <img 
                  src={img.imageUrl} 
                  className="inline-block h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-[1.25rem] ring-4 md:ring-[6px] ring-slate-900 object-cover shadow-2xl" 
                />
              </div>
            ))}
            {selectedImageIds.length < 2 && (
              <div className="inline-block h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-[1.25rem] bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center text-white/30 font-black text-sm md:text-xl ml-2">
                ?
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <p className="text-white font-black text-xs md:text-sm uppercase tracking-wider">
              {selectedImageIds.length === 2 ? '준비 완료' : '추가 선택'}
            </p>
            <p className="text-blue-400 text-[10px] md:text-[11px] font-black uppercase tracking-widest opacity-80">
              {selectedImageIds.length}/2 콘텐츠
            </p>
          </div>

          <button 
            disabled={selectedImageIds.length < 2}
            onClick={() => setIsModalOpen(true)}
            className={`px-6 py-3 md:px-8 md:py-4 rounded-2xl md:rounded-[1.5rem] text-sm md:text-base font-black transition-all ${
              selectedImageIds.length === 2 
                ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-2xl shadow-blue-600/40 active:scale-95' 
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            비교분석
          </button>
        </div>
      </div>

      <Footer />

      <ComparisonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        images={selectedImages} 
      />

      {isAuthOpen && (
        <AdminAuth 
          onAuthenticated={() => { setIsAdmin(true); setIsAuthOpen(false); }} 
          onClose={() => setIsAuthOpen(false)} 
          adminPin={adminPin}
          setAdminPin={setAdminPin}
        />
      )}

      {isUploadOpen && (
        <UploadModal 
          onClose={() => setIsUploadOpen(false)} 
          onUpload={handleUpload} 
          onVideoUpload={handleVideoUpload}
        />
      )}
    </div>
  );
};

export default App;