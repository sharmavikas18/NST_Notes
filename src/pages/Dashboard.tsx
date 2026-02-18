import React from 'react';
import { BentoCard } from '../components/BentoCard';
import { Upload, Download, Search, FileText } from 'lucide-react';

export const Dashboard: React.FC = () => {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Welcome back, Vikas!</h2>
                    <p className="text-neutral-400">Find and organize your academic resources.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search notes..."
                            className="bg-card border border-neutral-800 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-accent-blue w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-12 gap-6">
                {/* Welcome Stats */}
                <BentoCard className="col-span-8 h-48 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border-accent-blue/30" title="Statistics">
                    <div className="grid grid-cols-3 gap-4 h-full items-center">
                        <div className="text-center">
                            <p className="text-4xl font-bold">24</p>
                            <p className="text-neutral-400">Documents</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold">12</p>
                            <p className="text-neutral-400">Downloads</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold">8</p>
                            <p className="text-neutral-400">Contributions</p>
                        </div>
                    </div>
                </BentoCard>

                {/* Quick Upload */}
                <BentoCard className="col-span-4 h-48 flex items-center justify-center border-dashed border-neutral-700 hover:border-accent-blue hover:bg-accent-blue/5 group" title="Quick Upload">
                    <div className="text-center">
                        <div className="bg-neutral-800 p-3 rounded-2xl mb-3 inline-block group-hover:bg-accent-blue/20 group-hover:text-accent-blue transition-colors">
                            <Upload size={24} />
                        </div>
                        <p className="font-medium">Upload Notes</p>
                    </div>
                </BentoCard>

                {/* Recent Notes */}
                <BentoCard className="col-span-12" title="Recent Uploads" subtitle="Latest materials from your batch">
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900/50 hover:bg-neutral-800 transition-colors border border-transparent hover:border-neutral-700">
                                <div className="flex items-center gap-4">
                                    <div className="bg-neutral-800 p-3 rounded-xl text-accent-blue">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Mathematics II - Unit 3 Notes</h4>
                                        <p className="text-xs text-neutral-500">Uploaded by John Doe • 2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-neutral-800 rounded-md text-[10px] text-neutral-400 uppercase tracking-widest font-bold">SEM 2</span>
                                    <button className="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors">
                                        <Download size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </BentoCard>

                {/* Filter Categories */}
                <BentoCard className="col-span-4 h-40" title="Subjects">
                    <div className="flex flex-wrap gap-2">
                        {['Math', 'Physics', 'CS', 'AI'].map(s => (
                            <span key={s} className="px-3 py-1 bg-neutral-800 rounded-full text-sm hover:bg-neutral-700 cursor-pointer transition-colors">{s}</span>
                        ))}
                    </div>
                </BentoCard>

                <BentoCard className="col-span-4 h-40" title="Semesters">
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4].map(s => (
                            <span key={s} className="px-3 py-1 bg-neutral-800 rounded-full text-sm hover:bg-neutral-700 cursor-pointer transition-colors">SEM {s}</span>
                        ))}
                    </div>
                </BentoCard>

                <BentoCard className="col-span-4 h-40" title="Popular Labels">
                    <div className="flex flex-wrap gap-2">
                        {['Important', 'Exam', 'Practical', 'Theory'].map(s => (
                            <span key={s} className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-full text-sm hover:bg-accent-blue/20 cursor-pointer transition-colors">#{s}</span>
                        ))}
                    </div>
                </BentoCard>
            </div>
        </div>
    );
};
