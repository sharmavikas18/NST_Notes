import React from 'react';
import { LayoutDashboard, Upload, FileText, Bookmark, User, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Upload, label: 'Upload', id: 'upload' },
    { icon: FileText, label: 'All Notes', id: 'notes' },
    { icon: Bookmark, label: 'Bookmarks', id: 'bookmarks' },
    { icon: User, label: 'Profile', id: 'profile' },
];

export const Sidebar: React.FC<{ activeTab: string, setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="w-64 border-r border-neutral-800 flex flex-col h-screen sticky top-0 bg-background">
            <div className="p-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                    NST Notes
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                            activeTab === item.id
                                ? "bg-neutral-800 text-white shadow-lg"
                                : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                        )}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-neutral-800">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-neutral-900 transition-all duration-200">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};
