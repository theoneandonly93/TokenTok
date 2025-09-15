"use client";
import { useEffect, useRef, useState } from 'react';
import Shell from '@/components/Shell';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // TODO: Fetch messages for this conversation from backend
    setMessages([]);
  }, [params.id]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    // TODO: Send message to backend
    setMessages(m => [...m, { id: Math.random().toString(36).slice(2), user: 'you', text: input.trim() }]);
    setInput('');
  };

  return (
    <Shell>
      <div className="h-dvh flex flex-col pt-16">
        <header className="px-4 pb-2 flex items-center gap-2">
          <button onClick={() => router.back()} className="text-white/60">&larr; Back</button>
          <h1 className="text-lg font-semibold">Chat</h1>
        </header>
        <div className="flex-1 overflow-y-auto px-4">
          {messages.length === 0 && <div className="text-zinc-400 mt-8">No messages yet.</div>}
          {messages.map(msg => (
            <div key={msg.id} className="mb-2 text-[13px] leading-tight">
              <span className="font-semibold text-white/90">@{msg.user}</span>{' '}
              <span className="text-white/80">{msg.text}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="p-4 flex items-center gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Type a message
"
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
    </Shell>
  );
}
