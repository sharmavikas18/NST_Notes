import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { LogIn, UserPlus, Mail, Lock, Loader2 } from 'lucide-react';

export const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: email.split('@')[0], // Basic placeholder
                        }
                    }
                });
                if (error) throw error;
                alert('Check your email for the confirmation link!');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent mb-2">
                        NST Notes Hub
                    </h1>
                    <p className="text-neutral-400">Your academic universe in one place.</p>
                </div>

                <div className="bg-card border border-neutral-800 rounded-3xl p-8 shadow-2xl">
                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${isLogin ? "bg-neutral-800 text-white shadow-lg" : "text-neutral-500 hover:text-white"}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${!isLogin ? "bg-neutral-800 text-white shadow-lg" : "text-neutral-500 hover:text-white"}`}
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-medium text-neutral-500 uppercase tracking-widest mb-1 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@college.edu"
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent-blue transition-colors text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-neutral-500 uppercase tracking-widest mb-1 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent-blue transition-colors text-white"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-accent-blue to-accent-purple text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-accent-blue/10 mt-6"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                isLogin ? <LogIn size={20} /> : <UserPlus size={20} />
                            )}
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-neutral-600">
                            By continuing, you agree to our Terms and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
