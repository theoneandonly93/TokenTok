

"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import Link from "next/link";

export default function InboxPage() {
	const [showNew, setShowNew] = useState(false);
	const [recipient, setRecipient] = useState("");
	const [message, setMessage] = useState("");

	// Placeholder: Replace with real inbox data
	const messages = [];

	const handleSend = () => {
		// TODO: Send message to backend
		alert(`Message sent to ${recipient}: ${message}`);
		setShowNew(false);
		setRecipient("");
		setMessage("");
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
				{messages.length === 0 && (
					<div className="text-zinc-400 text-center py-12">No conversations yet.</div>
				)}
				{/* List of conversations would go here */}

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


