'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, CheckCircle2, Link as LinkIcon, Cloud } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  hint?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  required?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  label,
  hint,
  aspectRatio = 'auto',
  required = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCloudinary = (url: string) => url.includes('cloudinary.com') || url.includes('res.cloudinary.com');

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WebP, SVG)');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('Image file size must be under 20MB');
      return;
    }

    // Instant local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewSrc(objectUrl);
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image to Cloudinary');
      }

      if (data.url) {
        onChange(data.url);
        setPreviewSrc(null); // Switch to remote URL
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error uploading image';
      setError(msg);
      setPreviewSrc(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square max-w-[150px]';
      case 'video':
        return 'aspect-video max-w-md';
      case 'wide':
        return 'aspect-[21/9] max-w-lg';
      default:
        return 'h-40 max-w-md';
    }
  };

  const currentDisplayUrl = previewSrc || value;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
          {label} {required && <span className="text-cyan-400">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Switch to File Upload' : 'Paste Image URL'}</span>
        </button>
      </div>

      {hint && <p className="text-[11px] text-slate-500 -mt-1">{hint}</p>}

      {showUrlInput ? (
        <div className="space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400 placeholder:text-slate-600 font-mono"
            placeholder="https://res.cloudinary.com/... or https://..."
          />
        </div>
      ) : (
        <div>
          {currentDisplayUrl ? (
            /* Image Preview Card with Replace / Remove Actions */
            <div className={`relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-[#050B18] group ${getAspectClass()}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentDisplayUrl}
                alt={label}
                className={`w-full h-full object-cover transition-opacity duration-300 ${uploading ? 'opacity-50' : 'opacity-100'}`}
              />

              {/* Uploading Spinner Overlay */}
              {uploading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                  <span className="text-[11px] text-white font-medium">Uploading to Cloudinary...</span>
                </div>
              )}

              {/* Hover overlay with action buttons (when not uploading) */}
              {!uploading && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2 p-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-colors shadow-lg flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Replace File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onChange('');
                      setPreviewSrc(null);
                    }}
                    className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-colors"
                    title="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Upload Source Badge */}
              {!uploading && value && (
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  {isCloudinary(value) ? (
                    <>
                      <Cloud className="w-3 h-3 text-cyan-400" />
                      <span className="font-semibold">Cloudinary 8K CDN</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span className="font-semibold">Uploaded</span>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Upload Dropzone */
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
                isDragOver
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : 'border-white/[0.12] hover:border-cyan-500/40 bg-white/[0.02] hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-11 h-11 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  {uploading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                  ) : (
                    <UploadCloud className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    {uploading ? 'Uploading to Cloudinary...' : 'Click to select photo or drag & drop'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Cloudinary CDN • PNG, JPG, WebP, SVG up to 20MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Hidden HTML File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg">
          {error}
        </p>
      )}
    </div>
  );
}
