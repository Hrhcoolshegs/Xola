import { useState, useRef, useCallback } from 'react';
import { Image, Upload, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

interface ImageUploaderProps {
  onImagesChange: (files: File[]) => void;
  initialImages?: File[];
}

export const ImageUploader = ({ onImagesChange, initialImages = [] }: ImageUploaderProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(initialImages);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updatePreviews = useCallback((files: File[]) => {
    // Clean up existing preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    
    // Create new preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  }, [previewUrls]);

  const handleFileUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => {
        const updated = [...prev, ...newFiles];
        onImagesChange(updated);
        updatePreviews(updated);
        return updated;
      });
      simulateUploadProgress();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => {
      const updated = prev.filter((_, i) => i !== index);
      onImagesChange(updated);
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
          isDragging 
            ? 'border-[#0073b9] bg-blue-50' 
            : 'border-gray-300 hover:border-[#0073b9]'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/dicom"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <div className="text-center">
          <Upload size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Upload Images</h3>
          <p className="text-gray-500 mb-4">Drag and drop files here or click to browse</p>
          <p className="text-xs text-gray-400">Supported formats: JPG, PNG, DICOM</p>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Preview</h3>
          
          {uploadProgress < 100 ? (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Processing...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#0073b9] h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedFiles.map((file, index) => (
                  <motion.div
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group"
                  >
                    <div className="border rounded-lg p-2 h-full aspect-square flex items-center justify-center bg-gray-50">
                      {previewUrls[index] ? (
                        <img 
                          src={previewUrls[index]} 
                          alt={`Preview ${index + 1}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <Image size={48} className="text-gray-400" />
                      )}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                    <p className="mt-2 text-xs text-center truncate">{file.name}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
};