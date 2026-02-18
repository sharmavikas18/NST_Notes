import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { BentoCard } from '../components/BentoCard';
import { supabase } from '../lib/supabaseClient';

export const UploadPage: React.FC = () => {
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('Mathematics');
    const [semester, setSemester] = useState('1');
    const [labels, setLabels] = useState('');
    const [description, setDescription] = useState('');

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        try {
            // 1. Upload file to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('notes')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('notes')
                .getPublicUrl(filePath);

            // 3. Insert metadata into Supabase Database
            const { error: dbError } = await supabase
                .from('files')
                .insert([
                    {
                        title,
                        subject,
                        semester: parseInt(semester),
                        labels: labels.split(',').map(s => s.trim()),
                        description,
                        file_url: publicUrl,
                        storage_path: filePath,
                    }
                ]);

            if (dbError) throw dbError;

            setSuccess(true);
            setFile(null);
            setTitle('');
            setDescription('');
            setTimeout(() => setSuccess(false), 5000);
        } catch (err: any) {
            console.error('Upload error detail:', err);
            alert(err.message + (err.details ? ': ' + err.details : ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Upload Documents</h2>

            {success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-2xl flex items-center gap-3 text-green-500">
                    <CheckCircle size={20} />
                    <p>Document uploaded successfully!</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
                            <input
                                type="text"
                                placeholder="e.g. Linear Algebra Unit 1"
                                className="w-full bg-card border border-neutral-800 rounded-xl py-3 px-4 focus:outline-none focus:border-accent-blue"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Subject</label>
                            <select
                                className="w-full bg-card border border-neutral-800 rounded-xl py-3 px-4 focus:outline-none focus:border-accent-blue appearance-none"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            >
                                <option>Mathematics</option>
                                <option>Physics</option>
                                <option>Computer Science</option>
                                <option>Artificial Intelligence</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Semester</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="8"
                                    className="w-full bg-card border border-neutral-800 rounded-xl py-3 px-4 focus:outline-none focus:border-accent-blue"
                                    required
                                    value={semester}
                                    onChange={(e) => setSemester(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Labels</label>
                                <input
                                    type="text"
                                    placeholder="Comma separated"
                                    className="w-full bg-card border border-neutral-800 rounded-xl py-3 px-4 focus:outline-none focus:border-accent-blue"
                                    value={labels}
                                    onChange={(e) => setLabels(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <BentoCard
                        className={`border-2 border-dashed flex flex-col items-center justify-center p-8 transition-colors ${dragActive ? "border-accent-blue bg-accent-blue/5" : "border-neutral-800"
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        {!file ? (
                            <div
                                className="w-full h-full flex flex-col items-center justify-center text-center group cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="bg-neutral-800 p-4 rounded-2xl mb-4 inline-block group-hover:bg-accent-blue/20 group-hover:text-accent-blue transition-colors">
                                    <Upload size={32} />
                                </div>
                                <p className="font-medium mb-1">Click to upload or drag and drop</p>
                                <p className="text-xs text-neutral-500">PDF, PPT, DOCX, ZIP up to 50MB</p>
                                <input
                                    id="file-upload"
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={(e) => {
                                        console.log('File selection detected');
                                        if (e.target.files && e.target.files[0]) {
                                            setFile(e.target.files[0]);
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="w-full">
                                <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <FileText className="text-accent-blue" />
                                        <div className="text-left">
                                            <p className="text-sm font-medium truncate max-w-[150px]">{file.name}</p>
                                            <p className="text-[10px] text-neutral-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setFile(null)} className="p-1 hover:bg-neutral-700 rounded text-neutral-400">
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </BentoCard>
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
                    <textarea
                        rows={4}
                        placeholder="What is this document about?"
                        className="w-full bg-card border border-neutral-800 rounded-xl py-3 px-4 focus:outline-none focus:border-accent-blue resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-accent-blue to-accent-purple text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-accent-blue/20 flex items-center justify-center gap-2"
                >
                    {loading && <Loader2 className="animate-spin" size={20} />}
                    {loading ? 'Uploading...' : 'Upload Document'}
                </button>
            </form>
        </div>
    );
};
