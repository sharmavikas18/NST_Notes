import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Mail, Calendar, LogOut, Settings, Bell, Shield } from 'lucide-react';
import { BentoCard } from '../components/BentoCard';

export const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    if (!user) return <div className="p-8 text-neutral-400">Loading profile...</div>;

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold mb-2">My Profile</h2>
                    <p className="text-neutral-400">Manage your account and preferences.</p>
                </div>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all font-medium"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* User Info Card */}
                <BentoCard className="col-span-8 flex items-center gap-8 p-10" title="Account Details">
                    <div className="h-24 w-24 bg-gradient-to-br from-accent-blue to-accent-purple rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-accent-blue/20">
                        {user.email?.[0].toUpperCase()}
                    </div>
                    <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3 text-neutral-300">
                            <Mail size={18} className="text-neutral-500" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-300">
                            <Calendar size={18} className="text-neutral-500" />
                            <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-300">
                            <Shield size={18} className="text-neutral-500" />
                            <span className="text-xs px-2 py-0.5 bg-accent-blue/10 text-accent-blue rounded-md font-bold uppercase tracking-wider">Verified Student</span>
                        </div>
                    </div>
                </BentoCard>

                {/* Quick Stats */}
                <BentoCard className="col-span-4" title="Quick Stats">
                    <div className="space-y-6">
                        <div>
                            <p className="text-2xl font-bold">12</p>
                            <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Uploads</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">45</p>
                            <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Downloads</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">8</p>
                            <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Bookmarked</p>
                        </div>
                    </div>
                </BentoCard>

                {/* Settings Grid */}
                <div className="col-span-12 grid grid-cols-3 gap-6">
                    <BentoCard className="flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-neutral-800/50" title="">
                        <div className="p-4 bg-neutral-800 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                            <Bell size={24} className="text-accent-blue" />
                        </div>
                        <h4 className="font-bold">Notifications</h4>
                        <p className="text-xs text-neutral-500 mt-1">Manage your alerts</p>
                    </BentoCard>

                    <BentoCard className="flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-neutral-800/50" title="">
                        <div className="p-4 bg-neutral-800 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                            <Shield size={24} className="text-accent-purple" />
                        </div>
                        <h4 className="font-bold">Privacy</h4>
                        <p className="text-xs text-neutral-500 mt-1">Control your visibility</p>
                    </BentoCard>

                    <BentoCard className="flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-neutral-800/50" title="">
                        <div className="p-4 bg-neutral-800 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                            <Settings size={24} className="text-neutral-400" />
                        </div>
                        <h4 className="font-bold">Preferences</h4>
                        <p className="text-xs text-neutral-500 mt-1">Customize your experience</p>
                    </BentoCard>
                </div>
            </div>
        </div>
    );
};
