import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertImageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all images
  app.get("/api/images", async (req, res) => {
    try {
      const images = await storage.getImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch images" });
    }
  });

  // Get single image
  app.get("/api/images/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const image = await storage.getImage(id);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.json(image);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch image" });
    }
  });

  // Create new image
  app.post("/api/images", async (req, res) => {
    try {
      const imageData = insertImageSchema.parse(req.body);
      const image = await storage.createImage(imageData);
      res.status(201).json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid image data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create image" });
    }
  });

  // Update image
  app.put("/api/images/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const image = await storage.updateImage(id, updateData);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.json(image);
    } catch (error) {
      res.status(500).json({ error: "Failed to update image" });
    }
  });

  // Delete single image
  app.delete("/api/images/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteImage(id);
      if (!deleted) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete image" });
    }
  });

  // Delete multiple images
  app.delete("/api/images", async (req, res) => {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids)) {
        return res.status(400).json({ error: "Expected array of IDs" });
      }
      const deleted = await storage.deleteImages(ids);
      res.json({ success: deleted });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete images" });
    }
  });

  // Get storage analytics
  app.get("/api/analytics", async (req, res) => {
    try {
      const analytics = await storage.getStorageAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Simulate file upload
  app.post("/api/upload", async (req, res) => {
    try {
      const { files, provider } = req.body;
      
      if (!Array.isArray(files)) {
        return res.status(400).json({ error: "Expected array of files" });
      }

      const uploadedImages = [];
      
      for (const file of files) {
        const imageData = {
          filename: file.name,
          originalName: file.name,
          size: file.size,
          mimeType: file.type,
          dimensions: `${file.width || 1920}x${file.height || 1080}`,
          provider: provider || "google",
          cdnUrl: file.dataUrl || `https://picsum.photos/800/600?random=${Date.now()}`,
          thumbnailUrl: file.dataUrl || `https://picsum.photos/400/300?random=${Date.now()}`,
          metadata: JSON.stringify({
            uploadedAt: new Date().toISOString(),
            provider: provider || "google",
            originalFile: file.name,
          }),
          userId: 1, // Mock user ID
        };

        const image = await storage.createImage(imageData);
        uploadedImages.push(image);
      }

      res.json({ 
        success: true, 
        images: uploadedImages,
        message: `${uploadedImages.length} images uploaded successfully`
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload images" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

