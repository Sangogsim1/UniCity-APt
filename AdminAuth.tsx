
import React, { useState, useEffect } from 'react';

interface AdminAuthProps {
  onAuthenticated: () => void;
  onClose: () => void;
  adminPin: string;
  setAdminPin: (newPin: string) => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated, onClose, adminPin, setAdminPin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPinStage, setNewPinStage] = useState(0); // 0: current, 1: new, 2: confirm
  const [tempNewPin, setTempNewPin] = useState('');

  const handleInput = (val: string) => {
    if (val.length > 4) return;
    setPin(val);
    setError(false);
    
    if (val.length === 4) {
      if (isChangingPin) {
        handlePinChangeLogic(val);
      } else {
        if (val === adminPin) {
          onAuthenticated();
        } else {
          setError(true);
          setTimeout(() => setPin(''), 500);
        }
      }
    }
  };

  const handlePinChangeLogic = (input: string) => {
    if (newPinStage === 0) {
      if (input === adminPin) {
        setNewPinStage(1);
        setPin('');
      } else {
        setError(true);
        setTimeout(() => setPin(''), 500);
      }
    } else if (newPinStage === 1) {
      setTempNewPin(input);
      setNewPinStage(2);
      setPin('');
    } else if (newPinStage === 2) {
      if (input === tempNewPin) {
        setAdminPin(input);
        alert('비밀번호가 성공적으로 변경되었습니다.');
        setIsChangingPin(false);
        setNewPinStage(0);
        setPin('');
      } else {
        setError(true);
        alert('비밀번호가 일치하지 않습니다. 다시 시도하세요.');
        setNewPinStage(1);
        setPin('');
      }
    }
  };

  const getTitle = () => {
    if (!isChangingPin) return "관리자 인증";
    if (newPinStage === 0) return "기존 비밀번호 입력";
    if (newPinStage === 1) return "새 비밀번호 입력";
    return "비밀번호 확인";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white rounded-3xl p-8 w-80 shadow-2xl space-y-6 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900">{getTitle()}</h3>
          <p className="text-sm text-slate-500">비밀번호 4자리를 입력하세요.</p>
        </div>
        
        <div className="flex justify-center gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                pin.length > i 
                  ? 'bg-blue-600 border-blue-600 scale-125' 
                  : error ? 'border-red-400 animate-bounce' : 'border-slate-300'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6,7,8,9, 'C', 0, 'X'].map((n) => (
            <button
              key={n}
              onClick={() => {
                if (n === 'C') setPin('');
                else if (n === 'X') onClose();
                else handleInput(pin + n);
              }}
              className={`h-12 rounded-xl font-bold text-lg active:scale-90 transition-transform ${
                typeof n === 'number' ? 'bg-slate-50 text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {n === 'X' ? '취소' : n}
            </button>
          ))}
        </div>

        {!isChangingPin && (
          <button 
            onClick={() => { setIsChangingPin(true); setPin(''); }}
            className="text-xs text-blue-600 font-bold hover:underline"
          >
            비밀번호 변경하기
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminAuth;
