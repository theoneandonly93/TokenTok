'use client';
import { ReactNode } from 'react';

export default function Modal({ open, onClose, children }:{open:boolean;onClose:()=>void;children:ReactNode}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 p-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
