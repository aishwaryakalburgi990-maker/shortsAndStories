import { useState, useCallback } from 'react';

export function useUploadProgress() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const startUpload = useCallback(() => {
    setIsUploading(true);
    setProgress(0);
  }, []);

  const updateProgress = useCallback((newProgress: number) => {
    setProgress(Math.min(100, Math.max(0, newProgress)));
  }, []);

  const finishUpload = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setIsUploading(false);
      setProgress(0);
    }, 500);
  }, []);

  const resetUpload = useCallback(() => {
    setIsUploading(false);
    setProgress(0);
  }, []);

  return {
    progress,
    isUploading,
    startUpload,
    updateProgress,
    finishUpload,
    resetUpload,
  };
}