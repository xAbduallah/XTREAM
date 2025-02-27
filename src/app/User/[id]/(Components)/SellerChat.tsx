import React, { useState } from 'react';
import { IUser } from '@/Interfaces/User';
import { formatDistanceToNow } from 'date-fns';
import { IProduct } from '@/Interfaces/Products';
import { Bell, Clipboard, Send, Star, User2 } from 'lucide-react';
import Loader from '@/Utils/Loader';

export default function SellerChat({ user, products }: { user: IUser | null, products: IProduct[] }) {

    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);

    const handleSendMessage = () => {
        if (message.trim()) {
            setChatHistory([...chatHistory, message]);
            setMessage('');
        }
    };
    return (
        <div className='w-full lg:w-[35%] space-y-4 sticky top-24 h-[calc(100vh-20rem)]'>
            {user == null ? <Loader /> : <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border)] shadow-md h-full flex flex-col">
                <div className="flex items-center justify-between mb-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center">
                            <User2 className="w-7 h-7 text-[var(--accent-primary)]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[var(--text-primary)]">
                                {user?.username}
                            </h2>
                            <span className="text-sm text-green-500">Online</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors">
                            <Clipboard className="w-5 h-5 text-[var(--text-secondary)]" />
                        </button>
                        <button className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors">
                            <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
                        </button>
                    </div>
                </div>
                <div className="text-center space-y-2 mb-6 shrink-0">
                    <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                        ))}
                    </div>
                    <div className="text-sm text-[var(--accent-primary)]">
                        {products?.length || 0} products • Joined {formatDistanceToNow(new Date(user?.createdAt || new Date()))} ago
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Contact the seller before payment
                    </p>
                </div>
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-[200px] p-4 bg-[var(--bg-tertiary)]/50 rounded-lg">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className="bg-[var(--bg-secondary)] p-3 rounded-lg shadow-sm">
                            <p className="text-[var(--text-primary)]">{msg}</p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 border-t border-[var(--border)] pt-4 shrink-0">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-3 bg-[var(--accent-primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
            }
        </div>
    )
}
