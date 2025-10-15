import React, { useEffect, useRef, useState } from 'react';

const Modal = ({ open, onClose, title, children, footer }) => {
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
      setTimeout(() => setMounted(true), 0);
      setTimeout(() => closeBtnRef.current?.focus(), 80);
    } else {
      setMounted(false);
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 transition-opacity duration-200 ${mounted ? 'opacity-100' : 'opacity-0'} bg-black/50 backdrop-blur-sm`}
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 flex flex-col transition-all duration-200
        ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}
        style={{ maxHeight: '85vh' }}
      >
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700">🗓</span>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-label="Fechar modal"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto">{children}</div>

        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 bg-white/90 rounded-b-2xl sticky bottom-0">
            <div className="flex justify-end gap-3">{footer}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
