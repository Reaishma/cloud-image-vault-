import { useState } from "react";
import AppHeader from "@/components/app-header";
import StorageAnalytics from "@/components/storage-analytics";
import GalleryControls from "@/components/gallery-controls";
import UploadDropzone from "@/components/upload-dropzone";
import ImageGallery from "@/components/image-gallery";
import ImagePreviewModal from "@/components/image-preview-modal";
import { useQuery } from "@tanstack/react-query";
import type { Image } from "@shared/schema";

export default function Gallery() {
  const [selectedProvider, setSelectedProvider] = useState<"google" | "aws">("google");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [previewImage, setPreviewImage] = useState<Image | null>(null);

  const { data: images = [], isLoading, refetch } = useQuery<Image[]>({
    queryKey: ["/api/images"],
  });

  const filteredImages = images.filter(image => {
    const matchesSearch = image.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.originalName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedImages = [...filteredImages].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.filename.localeCompare(b.filename);
      case "size":
        return a.size - b.size;
      case "type":
        return a.mimeType.localeCompare(b.mimeType);
      default:
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    }
  });

  const handleImageSelect = (id: number) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imageId => imageId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedImages(
      selectedImages.length === sortedImages.length 
        ? [] 
        : sortedImages.map(img => img.id)
    );
  };

  const handleImagePreview = (image: Image) => {
    setPreviewImage(image);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader 
        selectedProvider={selectedProvider}
        onProviderChange={setSelectedProvider}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StorageAnalytics />
        
        <GalleryControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedCount={selectedImages.length}
          onSelectAll={handleSelectAll}
          onRefresh={refetch}
        />
        
        <UploadDropzone 
          provider={selectedProvider}
          onUploadComplete={refetch}
        />
        
        <ImageGallery
          images={sortedImages}
          viewMode={viewMode}
          selectedImages={selectedImages}
          isLoading={isLoading}
          onImageSelect={handleImageSelect}
          onImagePreview={handleImagePreview}
        />
      </div>

      {previewImage && (
        <ImagePreviewModal
          image={previewImage}
          onClose={() => setPreviewImage(null)}
          onProviderChange={setSelectedProvider}
          onImageUpdate={refetch}
        />
      )}
    </div>
  );
}

