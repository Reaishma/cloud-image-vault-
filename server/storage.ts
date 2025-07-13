import { users, images, storageAnalytics, type User, type InsertUser, type Image, type InsertImage, type StorageAnalytics, type InsertStorageAnalytics } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getImages(userId?: number): Promise<Image[]>;
  getImage(id: number): Promise<Image | undefined>;
  createImage(image: InsertImage): Promise<Image>;
  updateImage(id: number, image: Partial<InsertImage>): Promise<Image | undefined>;
  deleteImage(id: number): Promise<boolean>;
  deleteImages(ids: number[]): Promise<boolean>;
  
  getStorageAnalytics(): Promise<StorageAnalytics | undefined>;
  updateStorageAnalytics(analytics: InsertStorageAnalytics): Promise<StorageAnalytics>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private images: Map<number, Image>;
  private analytics: StorageAnalytics | undefined;
  private currentId: number;
  private currentImageId: number;

  constructor() {
    this.users = new Map();
    this.images = new Map();
    this.currentId = 1;
    this.currentImageId = 1;
    
    // Initialize with sample analytics
    this.analytics = {
      id: 1,
      totalStorage: "2.4 TB",
      totalImages: 0,
      bandwidth: "847 GB",
      monthlyCost: "$124.67",
      lastUpdated: new Date(),
    };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getImages(userId?: number): Promise<Image[]> {
    const allImages = Array.from(this.images.values());
    if (userId) {
      return allImages.filter(image => image.userId === userId);
    }
    return allImages;
  }

  async getImage(id: number): Promise<Image | undefined> {
    return this.images.get(id);
  }

  async createImage(insertImage: InsertImage): Promise<Image> {
    const id = this.currentImageId++;
    const image: Image = { 
      ...insertImage, 
      id, 
      uploadDate: new Date(),
      metadata: insertImage.metadata || null,
      dimensions: insertImage.dimensions || null,
      thumbnailUrl: insertImage.thumbnailUrl || null,
      userId: insertImage.userId || null,
      provider: insertImage.provider || "google"
    };
    this.images.set(id, image);
    
    // Update analytics
    if (this.analytics) {
      this.analytics.totalImages = this.images.size;
    }
    
    return image;
  }

  async updateImage(id: number, updateData: Partial<InsertImage>): Promise<Image | undefined> {
    const image = this.images.get(id);
    if (!image) return undefined;
    
    const updatedImage = { ...image, ...updateData };
    this.images.set(id, updatedImage);
    return updatedImage;
  }

  async deleteImage(id: number): Promise<boolean> {
    const deleted = this.images.delete(id);
    if (deleted && this.analytics) {
      this.analytics.totalImages = this.images.size;
    }
    return deleted;
  }

  async deleteImages(ids: number[]): Promise<boolean> {
    let allDeleted = true;
    for (const id of ids) {
      if (!this.images.delete(id)) {
        allDeleted = false;
      }
    }
    if (this.analytics) {
      this.analytics.totalImages = this.images.size;
    }
    return allDeleted;
  }

  async getStorageAnalytics(): Promise<StorageAnalytics | undefined> {
    if (this.analytics) {
      this.analytics.totalImages = this.images.size;
    }
    return this.analytics;
  }

  async updateStorageAnalytics(analytics: InsertStorageAnalytics): Promise<StorageAnalytics> {
    this.analytics = {
      id: 1,
      ...analytics,
      lastUpdated: new Date(),
    };
    return this.analytics;
  }
}

export const storage = new MemStorage();

