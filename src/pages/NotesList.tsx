import React, { useState, useEffect } from 'react';
import { FileText, Download, Search } from 'lucide-react';
import { fileService } from '../services/api';

export const NotesList: React.FC = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [subject, setSubject] = useState('');

    useEffect(() => {
        fetchFiles();
    }, [search, subject]);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const data = await fileService.getFiles({ search, subject });
            setFiles(data);
        } catch (error) {
            console.error("Failed to fetch files", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-3xl font-bold">All Notes</h2>

                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-card border border-neutral-800 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-accent-blue"
                        />
                    </div>
                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="bg-card border border-neutral-800 rounded-xl py-2 px-4 focus:outline-none focus:border-accent-blue"
                    >
                        <option value="">All Subjects</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Computer Science">Computer Science</option>
                    </select>
                </div>
            </div>

            <div className="bg-card border border-neutral-800 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-neutral-800 text-neutral-400 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Title</th>
                            <th className="px-6 py-4 font-semibold">Subject</th>
                            <th className="px-6 py-4 font-semibold">Semester</th>
                            <th className="px-6 py-4 font-semibold">Uploader</th>
                            <th className="px-6 py-4 font-semibold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/50">
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={5} className="px-6 py-8 h-16 bg-neutral-900/20"></td>
                                </tr>
                            ))
                        ) : files.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-20 text-center text-neutral-500">
                                    <FileText className="mx-auto mb-4 opacity-20" size={48} />
                                    No documents found matching your criteria.
                                </td>
                            </tr>
                        ) : (
                            files.map((file) => (
                                <tr key={file.id} className="hover:bg-neutral-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-neutral-800 p-2 rounded-lg text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-colors">
                                                <FileText size={18} />
                                            </div>
                                            <span className="font-medium text-white">{file.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-400">{file.subject}</td>
                                    <td className="px-6 py-4 text-neutral-400">Sem {file.semester}</td>
                                    <td className="px-6 py-4 text-neutral-400">User_{file.uploaded_by}</td>
                                    <td className="px-6 py-4 text-right">
                                        <a
                                            href={file.file_url}
                                            download
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-accent-blue text-white rounded-xl transition-all text-sm font-medium"
                                        >
                                            <Download size={16} />
                                            Download
                                        </a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
