type ChatMessageProps = {
    role: 'user' | 'bot' | 'error';
    text: string;
    status?: string;
    score?: number;
};

export default function ChatMessage({ role, text, status, score }: ChatMessageProps) {
    const isUser = role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-2xl rounded-2xl border px-5 py-4 shadow-sm ${
                    isUser
                        ? 'border-blue-700 bg-blue-950 text-white'
                        : role === 'error'
                            ? 'border-red-200 bg-red-50 text-red-700'
                            : 'border-slate-200 bg-white text-slate-900'
                }`}
            >
                <p className="whitespace-pre-wrap text-sm leading-6 sm:text-base">{text}</p>

                {!isUser && (status || score !== undefined) && (
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                        {status && <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{status}</span>}
                        {score !== undefined && <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">Risk score: {score}</span>}
                    </div>
                )}
            </div>
        </div>
    );
}