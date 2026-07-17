import React from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-[#7C3AED] border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] rounded-2xl w-full max-w-lg aspect-[3/4] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 relative p-8 items-center justify-center" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header/Close */}
        <div className="absolute top-4 right-4 z-[100]">
          <button 
            type="button" 
            onClick={onClose} 
            className="w-10 h-10 bg-white hover:bg-slate-100 rounded-xl border-2 border-slate-900 flex items-center justify-center transition-colors shadow-[2px_2px_0px_0px_#0f172a]"
          >
            <X className="w-5 h-5 text-slate-900" />
          </button>
        </div>

        <div className="max-w-sm flex flex-col items-center">
          <img src="/ufs_logo.png" className="w-56 h-auto mb-10 object-contain drop-shadow-md" alt="Logo UFS" />
          <p className="text-white text-[14px] sm:text-sm font-sans font-medium text-center leading-relaxed drop-shadow-sm">
            Projeto desenvolvido durante a diciplina de <span className="font-black tracking-wide">TÓPICOS ESPECIAIS EM FERRAMENTAS COMPUTACIONAIS PARA O ENSINO DE FÍSICA - T01</span> do periodo <strong>2026.1</strong> da <strong>Universidade Federal de Sergipe</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
