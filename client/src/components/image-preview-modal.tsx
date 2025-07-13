import { useState } from "react";
import { X, ZoomIn, ZoomOut, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Image } from "@shared/schema";

interface ImagePreviewModalProps {
  image: Image;
  onClose: () => void;
  onProviderChange: (provider: "google" | "aws") => void;
  onImageUpdate: () => void;
}

export default function ImagePreviewModal({
  image,
  onClose,
  onProviderChange,
  onImageUpdate,
}: ImagePreviewModalProps) {
  const [zoom, setZoom] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(3, prev + 0.25));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(0.25, prev - 0.25));
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.cdnUrl;
    link.download = image.filename;
    link.click();
    
    toast({
      title: "Download started",
      description: `Downloading ${image.filename}`,
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await apiRequest("DELETE", `/api/images/${image.id}`);
      toast({
        title: "Image deleted",
        description: `${image.filename} has been deleted`,
      });
      onImageUpdate();
      onClose();
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete image",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMoveToProvider = async (newProvider: "google" | "aws") => {
    try {
      await apiRequest("PUT", `/api/images/${image.id}`, {
        provider: newProvider,
      });
      
      toast({
        title: "Image moved",
        description: `${image.filename} moved to ${newProvider === "google" ? "Google Cloud Storage" : "AWS S3"}`,
      });
      
      onProviderChange(newProvider);
      onImageUpdate();
      onClose();
    } catch (error) {
      toast({
        title: "Move failed",
        description: `Failed to move image to ${newProvider === "google" ? "Google Cloud Storage" : "AWS S3"}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center justify-between">
            <span>{image.filename}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-6 overflow-auto">
            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 min-h-[400px]">
              <img
                src={image.cdnUrl}
                alt={image.originalName}
                className="max-w-full max-h-full object-contain rounded-lg shadow-lg transition-transform"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
            
            <div className="flex items-center justify-center space-x-4 mt-4">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="w-4 h-4 mr-2" />
                Zoom Out
              </Button>
              <span className="text-sm text-gray-500">{Math.round(zoom * 100)}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="w-4 h-4 mr-2" />
                Zoom In
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="w-80 bg-gray-50 p-6 border-l border-gray-200 overflow-auto">
            <h4 className="font-semibold text-gray-900 mb-4">Image Details</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filename
                </label>
                <p className="text-sm text-gray-900">{image.filename}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File Size
                </label>
                <p className="text-sm text-gray-900">{formatFileSize(image.size)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dimensions
                </label>
                <p className="text-sm text-gray-900">{image.dimensions || "Unknown"}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Date
                </label>
                <p className="text-sm text-gray-900">{formatDate(image.uploadDate)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Storage Provider
                </label>
                <div className="flex items-center space-x-2">
                  {image.provider === "google" ? (
                    <svg className="w-5 h-5 text-google-blue" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-aws-orange" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335c-.072.048-.144.072-.208.072-.08 0-.16-.04-.239-.112-.112-.12-.208-.248-.288-.384-.08-.144-.16-.304-.256-.48-.64.759-1.44 1.135-2.4 1.135-.687 0-1.239-.2-1.663-.591-.424-.4-.64-.936-.64-1.599 0-.712.255-1.287.776-1.727.52-.44 1.215-.664 2.087-.664.287 0 .583.024.895.08.32.048.648.128.991.224v-.735c0-.768-.16-1.303-.488-1.606-.32-.304-.87-.456-1.64-.456-.36 0-.728.047-1.119.136-.39.096-.775.224-1.151.4-.168.072-.295.12-.375.127-.08.016-.144-.056-.2-.2l-.319-.512c-.048-.08-.056-.168-.024-.248.032-.08.104-.16.2-.24.375-.192.823-.352 1.343-.479.52-.127 1.072-.2 1.648-.2 1.256 0 2.175.287 2.759.852.583.568.871 1.424.871 2.576v3.4z"/>
                    </svg>
                  )}
                  <span className="text-sm text-gray-900">
                    {image.provider === "google" ? "Google Cloud Storage" : "AWS S3"}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CDN URL
                </label>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-900 flex-1 truncate">
                    {image.cdnUrl.startsWith('data:') 
                      ? `data:${image.mimeType};base64,... (${Math.round(image.cdnUrl.length / 1024)}KB)`
                      : image.cdnUrl
                    }
                  </p>
                  <button
                    onClick={() => navigator.clipboard.writeText(image.cdnUrl)}
                    className="text-xs text-gray-500 hover:text-gray-700 p-1 rounded"
                    title="Copy URL"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MIME Type
                </label>
                <Badge variant="outline">{image.mimeType}</Badge>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              {image.provider === "google" ? (
                <Button
                  onClick={() => handleMoveToProvider("aws")}
                  className="w-full bg-aws-orange hover:bg-orange-600 text-white"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335c-.072.048-.144.072-.208.072-.08 0-.16-.04-.239-.112-.112-.12-.208-.248-.288-.384-.08-.144-.16-.304-.256-.48-.64.759-1.44 1.135-2.4 1.135-.687 0-1.239-.2-1.663-.591-.424-.4-.64-.936-.64-1.599 0-.712.255-1.287.776-1.727.52-.44 1.215-.664 2.087-.664.287 0 .583.024.895.08.32.048.648.128.991.224v-.735c0-.768-.16-1.303-.488-1.606-.32-.304-.87-.456-1.64-.456-.36 0-.728.047-1.119.136-.39.096-.775.224-1.151.4-.168.072-.295.12-.375.127-.08.016-.144-.056-.2-.2l-.319-.512c-.048-.08-.056-.168-.024-.248.032-.08.104-.16.2-.24.375-.192.823-.352 1.343-.479.52-.127 1.072-.2 1.648-.2 1.256 0 2.175.287 2.759.852.583.568.871 1.424.871 2.576v3.4z"/>
                  </svg>
                  Move to AWS S3
                </Button>
              ) : (
                <Button
                  onClick={() => handleMoveToProvider("google")}
                  className="w-full bg-google-blue hover:bg-blue-700 text-white"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  </svg>
                  Move to Google Cloud
                </Button>
              )}
              
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete Image"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

