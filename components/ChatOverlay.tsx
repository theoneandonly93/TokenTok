'use client';
import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

type Message = { id: string; user: string; text: string };

export default function ChatOverlay({ streamId }:{ streamId: string }){
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
  // TODO: Send message to backend
  setMessages(m => [...m, { id: Math.random().toString(36).slice(2), user: 'you', text: input.trim() }]);
    setInput('');
    // TODO: plug into your websocket or Livepeer chat if enabled
  };

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-3">
      <div className="pointer-events-auto max-h-[55%] overflow-y-auto rounded-2xl bg-black/30 p-3 backdrop-blur-sm">
        {messages.map(msg => (
          <div key={msg.id} className="mb-1 text-[13px] leading-tight">
            <span className="font-semibold text-white/90">@{msg.user}</span>{' '}
            <span className="text-white/80">{msg.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="pointer-events-auto mt-2 flex items-center gap-2">
        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=> e.key==='Enter' && send()}
          placeholder="Say something nice…"
          className="flex-1 rounded-2xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/50"
        />
        <button
          onClick={send}
          className="rounded-2xl bg-white/15 p-3"
          aria-label="Send"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
