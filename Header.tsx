
import React from 'react';
import { Property } from '../types';

interface HeaderProps {
  property: Property;
}

const Header: React.FC<HeaderProps> = ({ property }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h1 className="text-xl font-extrabold text-blue-900 tracking-tight">여여부동산 <span className="text-slate-400 font-normal mx-1">|</span> <span className="text-blue-600">UniCity A.P.T</span></h1>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-slate-900">{property.name}</p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{property.complex} · {property.address}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
             <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
               <span>등록일: {property.createdAt}</span>
             </div>
             <a href="tel:010-5016-3331" className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold border border-blue-100 flex items-center gap-2 hover:bg-blue-100 transition-colors">
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 005.47 5.47l.772-1.547a1 1 0 011.06-.539l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
               </svg>
               010-5016-3331
             </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
