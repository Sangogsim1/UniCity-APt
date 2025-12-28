
import React from 'react';
import { FilterState, Category, Complex, ApartmentType, Space } from '../types';
import { COMPLEX_TYPES } from '../constants';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange }) => {
  const categories: { label: string; sub: string; value: Category | '전체' }[] = [
    { label: '전체', sub: 'All', value: '전체' },
    { label: '내부', sub: 'Interior', value: '내부' },
    { label: '외부', sub: 'Exterior', value: '외부' },
    { label: '조망', sub: 'View', value: '조망' },
    { label: '커뮤니티', sub: 'Community', value: '커뮤니티' },
  ];

  const complexes: { label: string; sub: string; value: Complex | '전체' }[] = [
    { label: '전체', sub: 'All', value: '전체' },
    { label: '1단지', sub: 'C1', value: '1단지' },
    { label: '2단지', sub: 'C2', value: '2단지' },
    { label: '3단지', sub: 'C3', value: '3단지' },
    { label: '4단지', sub: 'C4', value: '4단지' },
  ];

  const spaces: { label: string; sub: string; value: Space | '전체' }[] = [
    { label: '전체', sub: 'All', value: '전체' },
    { label: '거실', sub: 'L-Room', value: '거실' },
    { label: '주방', sub: 'Kitchen', value: '주방' },
    { label: '안방', sub: 'M-Room', value: '안방' },
    { label: '욕실(거실)', sub: 'Bath1', value: '욕실(거실)' },
    { label: '욕실(안방)', sub: 'Bath2', value: '욕실(안방)' },
    { label: '작은방1', sub: 'Room1', value: '작은방1' },
    { label: '작은방2', sub: 'Room2', value: '작은방2' },
    { label: '작은방3', sub: 'Room3', value: '작은방3' },
    { label: '작은방4', sub: 'Room4', value: '작은방4' },
    { label: '드레스룸', sub: 'Dress', value: '드레스룸' },
    { label: '펜트리', sub: 'Pantry', value: '펜트리' },
    { label: '알파룸', sub: 'Alpha', value: '알파룸' },
    { label: '세탁실', sub: 'Laundry', value: '세탁실' },
    { label: '외부뷰', sub: 'View', value: '외부뷰' },
    { label: '옵션', sub: 'Option', value: '옵션' },
    { label: '구조도', sub: 'Structure', value: '구조도' },
    { label: '평면도', sub: 'Plan', value: '평면도' },
    { label: '기타자료', sub: 'Etc', value: '기타관련이미지' },
  ];

  const getTypes = () => {
    const list: { label: string; sub: string; value: ApartmentType | '전체' }[] = [
      { label: '전체', sub: 'All', value: '전체' }
    ];
    
    if (filters.complex !== '전체') {
      COMPLEX_TYPES[filters.complex].forEach(t => {
        list.push({ label: t, sub: t, value: t });
      });
    } else {
      const allTypes = Array.from(new Set(Object.values(COMPLEX_TYPES).flat()));
      allTypes.sort().forEach(t => {
        list.push({ label: t, sub: t, value: t });
      });
    }
    return list;
  };

  const renderButtons = (items: { label: string; sub: string; value: any }[], current: any, key: keyof FilterState, isScrollable: boolean = false) => (
    <div className={`flex gap-1.5 ${isScrollable ? 'overflow-x-auto no-scrollbar pb-1 -mx-2 px-2' : 'flex-wrap'}`}>
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange({ ...filters, [key]: item.value })}
          className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs transition-all flex flex-col items-center min-w-[56px] active:scale-95 ${
            current === item.value
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span className="font-bold whitespace-nowrap">{item.label}</span>
          <span className={`text-[7px] md:text-[8px] uppercase tracking-tighter ${current === item.value ? 'text-blue-100' : 'text-slate-400'}`}>
            {item.sub}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center">
            <span>카테고리 Category</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-20"></span>
          </label>
          {renderButtons(categories, filters.category, 'category', true)}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center">
            <span>단지 Complex</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-20"></span>
          </label>
          {renderButtons(complexes, filters.complex, 'complex', true)}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center">
            <span>타입 Type</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-20"></span>
          </label>
          {renderButtons(getTypes(), filters.type, 'type', true)}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center">
            <span>포토존분류 Photo Zone</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-20"></span>
          </label>
          {renderButtons(spaces, filters.space, 'space', true)}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
