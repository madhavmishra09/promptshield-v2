'use client';

import { useState } from 'react';

import PromptInput from '../components/PromptInput';
import ChatMessage from '../components/ChatMessage';
import SecurityBadge from '../components/SecurityBadge';
import HoverText from '../components/HoverText';
import Navbar from '../components/Navbar';

type ChatMessageType = {
    role: 'user' | 'bot' | 'error';
    text: string;
    status?: string;
    score?: number;
};

export default function ChatLayout() {
    const [chat, setChat] = useState<ChatMessageType[]>([]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-950">

            <Navbar />

            {/* Page Heading */}
            <div className="mx-auto flex flex-col items-center gap-2 px-6 py-16 text-center">

                <h2 className="text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl">
                    <HoverText>Security Playground</HoverText>
                </h2>

                <p className="text-lg font-semibold text-slate-500 sm:text-xl">
                    <HoverText>
                        Test your prompts against PromptShield
                    </HoverText>
                </p>

            </div>

            {/* Chat Area */}
            <main className="mx-auto flex min-h-[500px] max-w-5xl flex-col px-6">

                {chat.length === 0 ? (

                    /* Empty State */
                    <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">

                        <h3 className="mb-3 text-3xl font-bold text-slate-900">
                            <HoverText>Start testing your prompt</HoverText>
                        </h3>

                        <p className="max-w-xl text-lg text-slate-500">
                            <HoverText>Enter a prompt below and PromptShield will analyze
                            it for potential security threats.</HoverText>
                        </p>

                    </div>

                ) : (

                    /* Messages */
                    <div className="flex flex-col gap-6 py-8">

                        {chat.map((message, index) => (
                            <div key={index}>

                                <ChatMessage
                                    role={message.role}
                                    text={message.text}
                                    status={message.status}
                                    score={message.score}
                                />

                                {message.role === 'bot' && (
                                    <div className="mt-3">
                                        <SecurityBadge />
                                    </div>
                                )}

                            </div>
                        ))}

                    </div>
                )}

                {/* Input */}
                <div className="sticky bottom-4 mt-auto pb-6">
                    <PromptInput setChat={setChat} />
                </div>

            </main>

        </div>
    );
}