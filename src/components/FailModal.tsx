import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface FailModalProps {
  isOpen: boolean;
  message: string | null;
  onRestart: () => void;
}

export function FailModal({ isOpen, message, onRestart }: FailModalProps) {
  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 bg-red-950/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-[#FF3366] border-[4px] border-white shadow-[8px_8px_0px_0px_#9f1239] rounded-2xl w-full max-w-md flex flex-col items-center justify-center p-6 sm:p-8 animate-in zoom-in fade-in duration-200 relative">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#9f1239]">
           <AlertTriangle className="w-10 h-10 text-[#FF3366] animate-pulse" />
        </div>
        <h3 className="text-3xl sm:text-4xl font-black uppercase text-white mb-4 text-center tracking-wider drop-shadow-md">Alerta!</h3>
        <p className="text-lg sm:text-xl font-bold text-white text-center mb-8 leading-relaxed">
          {message}
        </p>
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white hover:bg-slate-100 text-[#FF3366] font-black rounded-xl border-[4px] border-[#9f1239] shadow-[4px_4px_0px_0px_#9f1239] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_#9f1239] transition-all text-lg"
        >
          <RotateCcw className="w-6 h-6" /> TENTAR NOVAMENTE
        </button>
      </div>
    </div>
  );
}
