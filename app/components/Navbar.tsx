import Link from 'next/link';
export default function Navbar() {
    return (
        <>
            <div className='flex font-extrabold border-4 shadow-2xl w-[800px] h-auto rounded-4xl my-8 p-4 mx-auto'>
                <nav>
                    <ul className='flex font-bold text-2xl items-center justify-between gap-4'>
                        <li><h2 className='text-3xl flex gap-4 px-6 mr-8'>PromptShield</h2></li>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/chat">Chat</Link></li>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/login">Login</Link></li>
                        <li><Link href="/signup">Sign Up</Link></li>
                    </ul>
                </nav>
            </div>
        </>
    )
};