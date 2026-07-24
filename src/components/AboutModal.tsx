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

        <div className="max-w-sm flex flex-col items-center w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] py-4">
          <img src="/ufs_logo.png" className="w-56 h-auto mb-8 object-contain drop-shadow-md shrink-0" alt="Logo UFS" />
          <p className="text-white text-[14px] sm:text-sm font-sans font-medium text-center leading-relaxed drop-shadow-sm mb-8">
            Projeto desenvolvido durante a diciplina de <span className="font-black tracking-wide">TÓPICOS ESPECIAIS EM FERRAMENTAS COMPUTACIONAIS PARA O ENSINO DE FÍSICA - T01</span> do periodo <strong>2026.1</strong> da <strong>Universidade Federal de Sergipe</strong>
          </p>
          
          <div className="flex flex-col items-center w-full">
            <h3 className="text-white font-black tracking-wider text-sm mb-4 uppercase drop-shadow-sm">Desenvolvedores</h3>
            <ul className="text-white text-xs sm:text-[13px] font-medium text-center space-y-2 opacity-90 drop-shadow-sm">
              <li>VANDERLEI SCARNERA JUNIOR</li>
              <li>ELVIS REIS DO NASCIMENTO</li>
              <li>PEDRO HENRIQUE RODRIGUES SAMPAIO</li>
              <li>MATHEUS KALLEY DE LIMA BARROS</li>
              <li>GUSTAVO FALCAO VALVERDE</li>
              <li>DAVID DOS SANTOS CAMPOS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
