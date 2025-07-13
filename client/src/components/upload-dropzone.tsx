import { useState, useCallback } from "react";
import { CloudUpload, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface UploadDropzoneProps {
  provider: "google" | "aws";
  onUploadComplete: () => void;
}

export default function UploadDropzone({ provider, onUploadComplete }: UploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleUpload(files);
  }, [provider]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await handleUpload(files);
  }, [provider]);

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;

    // Filter for image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please select only image files (JPG, PNG, GIF)",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileData = await Promise.all(
        imageFiles.map(async (file) => {
          return new Promise<any>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve({
                name: file.name,
                size: file.size,
                type: file.type,
                width: 1920, // Mock dimensions
                height: 1080,
                dataUrl: e.target?.result,
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      );

      const response = await apiRequest("POST", "/api/upload", {
        files: fileData,
        provider,
      });

      const result = await response.json();

      toast({
        title: "Upload successful",
        description: `${imageFiles.length} images uploaded to ${provider === "google" ? "Google Cloud Storage" : "AWS S3"}`,
      });

      onUploadComplete();
    } catch (error) {
      toast({
        title: "Upload failed",
        description: `Failed to upload images to ${provider === "google" ? "Google Cloud Storage" : "AWS S3"}`,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`bg-white border-2 border-dashed rounded-lg p-12 text-center mb-8 transition-colors ${
        isDragOver 
          ? "border-google-blue bg-blue-50" 
          : "border-gray-300 hover:border-google-blue"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CloudUpload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {isUploading ? "Uploading..." : "Drag and drop your images here"}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        or click to browse from your computer
      </p>
      
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        <Button disabled={isUploading} className="bg-google-blue hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? "Uploading..." : "Choose Files"}
        </Button>
      </div>
      
      <p className="text-xs text-gray-400 mt-4">
        Supports JPG, PNG, GIF up to 10MB each
      </p>
    </div>
  );
}
