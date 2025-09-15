
"use client";
import { useState, useEffect } from "react";
import Shell from "@/components/Shell";
import Link from "next/link";
import { supabase } from "@/lib/supabase";


// Get current user from localStorage (profileName)
function getCurrentUser() {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('profileName') || '';
	}
	return '';
}

// Fetch conversations for the current user
async function fetchConversations(username: string) {
	if (!username) return [];
	// Find all conversations where user is a participant
	const { data: participants, error } = await supabase
		.from('conversation_participants')
		.select('conversation_id')
		.eq('user_id', username);
	if (error || !participants) return [];
	const ids = participants.map((p: any) => p.conversation_id);
	if (ids.length === 0) return [];
	// Get last message for each conversation
	const { data: conversations } = await supabase
		.from('conversations')
		.select('id, created_at, messages:messages(content, created_at)')
		.in('id', ids)
		.order('created_at', { ascending: false });
	return conversations || [];
}

export default function InboxPage() {
	const [showNew, setShowNew] = useState(false);
	const [recipient, setRecipient] = useState("");
	const [message, setMessage] = useState("");
	const [conversations, setConversations] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const username = getCurrentUser();

	useEffect(() => {
		if (!username) return;
		setLoading(true);
		fetchConversations(username).then((convs) => {
			setConversations(convs);
			setLoading(false);
		});
	}, [username, showNew]);

	// Send a new message (create conversation if needed)
	const handleSend = async () => {
		if (!recipient || !message) return;
		// Ensure both users exist
		await supabase.from('users').upsert([{ username }, { username: recipient }], { onConflict: 'username' });
		// Check if conversation exists
		// NOTE: You may want to create a Postgres function for this in production
		let { data: convs } = await supabase
			.from('conversation_participants')
			.select('conversation_id')
			.eq('user_id', username)
			.in('conversation_id',
				(await supabase.from('conversation_participants').select('conversation_id').eq('user_id', recipient)).data?.map((p: any) => p.conversation_id) || []
			);
		let conversation_id;
		if (convs && convs.length > 0) {
			conversation_id = convs[0].conversation_id;
		} else {
			// Create new conversation
			const { data: newConv } = await supabase.from('conversations').insert({}).select().single();
			conversation_id = newConv.id;
			// Add both users as participants
			await supabase.from('conversation_participants').insert([
				{ conversation_id, user_id: username },
				{ conversation_id, user_id: recipient },
			]);
		}
		// Insert message
		await supabase.from('messages').insert({ conversation_id, sender_id: username, content: message });
		setShowNew(false);
		setRecipient("");
		setMessage("");
		// Refresh conversations
		fetchConversations(username).then(setConversations);
	};

	return (
		<Shell>
			<div className="h-dvh overflow-y-auto p-4 pt-16">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-xl font-semibold">Inbox</h1>
					<button
						className="rounded-full bg-pink-500 text-white px-4 py-2 font-bold shadow hover:bg-pink-600 transition"
						onClick={() => setShowNew(true)}
					>
						+ Create Message
					</button>
				</div>
				{loading ? (
					<div className="text-zinc-400 text-center py-12">Loading...</div>
				) : conversations.length === 0 ? (
					<div className="text-zinc-400 text-center py-12">No conversations yet.</div>
				) : (
					<ul className="space-y-3">
						{conversations.map((conv) => (
							<li key={conv.id} className="rounded-xl bg-white/10 p-4">
								<Link href={`/inbox/${conv.id}`}>Conversation {conv.id}</Link>
								<div className="text-xs text-zinc-400 mt-1">
									{conv.messages && conv.messages.length > 0 ? conv.messages[0].content : 'No messages yet.'}
								</div>
							</li>
						))}
					</ul>
				)}
				{showNew && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
						<div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-xs mx-auto flex flex-col gap-4">
							<h2 className="text-lg font-bold text-white mb-2">New Message</h2>
							<input
								className="rounded-xl px-4 py-2 bg-zinc-800 text-white outline-none"
								placeholder="Recipient username or address"
								value={recipient}
								onChange={e => setRecipient(e.target.value)}
								autoFocus
							/>
							<textarea
								className="rounded-xl px-4 py-2 bg-zinc-800 text-white outline-none min-h-[80px]"
								placeholder="Type your message..."
								value={message}
								onChange={e => setMessage(e.target.value)}
							/>
							<div className="flex gap-2 mt-2">
								<button
									className="flex-1 rounded-xl bg-pink-500 py-2 font-semibold text-white hover:bg-pink-600 transition"
									onClick={handleSend}
									disabled={!recipient || !message}
								>
									Send
								</button>
								<button
									className="flex-1 rounded-xl bg-zinc-700 py-2 font-semibold text-white hover:bg-zinc-600 transition"
									onClick={() => setShowNew(false)}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</Shell>
	);
}


