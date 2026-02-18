import React from 'react';
import { BentoCard } from '../components/BentoCard';
import { Bookmark, FileText, Download, Search } from 'lucide-react';

export const Bookmarks: React.FC = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Saved Resources</h2>
                    <p className="text-neutral-400">Everything you've bookmarked for later.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search bookmarks..."
                        className="bg-card border border-neutral-800 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-accent-blue w-64"
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <BentoCard className="col-span-12" title="Your Bookmarks">
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900/50 hover:bg-neutral-800 transition-colors border border-transparent hover:border-neutral-700">
                                <div className="flex items-center gap-4">
                                    <div className="bg-neutral-800 p-3 rounded-xl text-accent-purple">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Data Structures & Algorithms - Final Revision</h4>
                                        <p className="text-xs text-neutral-500">Subject: CS • Semester 4 • Bookmarked 2 days ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 hover:bg-neutral-700 rounded-lg text-accent-purple transition-colors">
                                        <Bookmark size={18} fill="currentColor" />
                                    </button>
                                    <button className="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors">
                                        <Download size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Empty state simulation if nothing bookmarked */}
                        {false && (
                            <div className="py-20 text-center">
                                <Bookmark className="mx-auto text-neutral-800 mb-4" size={48} />
                                <h3 className="text-xl font-bold text-neutral-400">No bookmarks yet</h3>
                                <p className="text-neutral-600">Save resources to find them here quickly.</p>
                            </div>
                        )}
                    </div>
                </BentoCard>
            </div>
        </div>
    );
};
