import React, { useState } from 'react';
import { X, Copy, Check, QrCode, ExternalLink } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QrCodeModal({ isOpen, onClose }: QrCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const url = "https://simulador-de-queda-livre-ufs.vercel.app";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar link:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[101] flex items-center justify-center p-4">
      <div className="bg-[#F4F1EB] w-full max-w-md rounded-2xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-slate-900 bg-[#7C3AED]">
          <div className="flex items-center gap-2">
            <QrCode className="w-6 h-6 text-white" />
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Compartilhar Simulador</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center gap-5 text-center">
          <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
            Escaneie o QR Code abaixo com a câmera do seu celular para abrir o simulador instantaneamente!
          </p>

          {/* QR Code Container */}
          <div className="bg-white p-4 rounded-2xl border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] relative group overflow-hidden">
            <img 
              src={qrCodeUrl} 
              alt="QR Code do Simulador" 
              className="w-48 h-48 sm:w-56 sm:h-56 select-none"
              referrerPolicy="no-referrer"
            />
            
            {/* Soft decorative visual indicator */}
            <div className="absolute inset-0 bg-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          {/* Link display & copy section */}
          <div className="w-full flex flex-col gap-2.5 mt-2">
            <div className="bg-white px-3 py-2.5 rounded-xl border-2 border-slate-900 flex items-center justify-between gap-2 overflow-hidden shadow-[2px_2px_0px_0px_#0f172a]">
              <span className="text-xs font-mono font-bold text-slate-600 truncate">
                {url}
              </span>
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                title="Abrir no navegador"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-slate-900 font-black uppercase text-xs transition-all ${
                  copied 
                    ? 'bg-[#00C48C] text-slate-900 shadow-[2px_2px_0px_0px_#0f172a]' 
                    : 'bg-[#FFB800] text-slate-900 hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_#0f172a] shadow-[4px_4px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar Link
                  </>
                )}
              </button>
              
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-white text-slate-900 rounded-xl border-2 border-slate-900 font-black uppercase text-xs hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_#0f172a] shadow-[4px_4px_0px_0px_#0f172a] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_0px_#0f172a] transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
