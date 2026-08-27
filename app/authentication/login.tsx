'use client';
import { useState, FormEvent } from 'react';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            alert('Login successful!');
            window.location.href = '/dashboard';
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div>
                <div>
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="Email Address">Email Address</label>
                            <input type="email" id="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='you@example.com'  />
                        </div>
                        <div>
                            <label htmlFor="Password">Password</label>
                            <input type="password" id="password" required value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='********' />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading?'Logging in....':'Login'}
                        </button>
                    </form>
                    <p>
                        Don't have an account?
                        <a href="/signup">Sign Up</a>
                    </p>
                </div>
            </div>
        </>
    )
};