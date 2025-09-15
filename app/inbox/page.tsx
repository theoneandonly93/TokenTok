"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Shell from '@/components/Shell';

export default function InboxPage() {
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Fetch conversations from backend
    setConversations([]);
  }, []);

  return (
    <Shell>
      <div className="h-dvh overflow-y-auto p-4 pt-16">
        <h1 className="mb-4 text-xl font-semibold">Inbox</h1>
        {conversations.length === 0 ? (
          <div className="text-zinc-400">No messages yet.</div>
        ) : (
          <ul className="space-y-3">
            {conversations.map(conv => (
              <li key={conv.id}>
                <Link href={`/inbox/${conv.id}`} className="block rounded-xl bg-white/10 p-4">
                  <div className="font-semibold">{conv.title}</div>
                  <div className="text-xs text-zinc-400">{conv.lastMessage}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Shell>
  );
}
