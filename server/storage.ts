import { rentalApplications, type RentalApplication, type InsertRentalApplication } from "@shared/schema";

export interface IStorage {
  // Rental Applications
  createRentalApplication(application: InsertRentalApplication): Promise<RentalApplication>;
  getRentalApplication(id: number): Promise<RentalApplication | undefined>;
  updateRentalApplication(id: number, application: Partial<InsertRentalApplication>): Promise<RentalApplication | undefined>;
  getAllRentalApplications(): Promise<RentalApplication[]>;
  
  // File storage (simplified for in-memory)
  storeFile(filename: string, content: Buffer): Promise<string>;
  getFile(filename: string): Promise<Buffer | undefined>;
}

export class MemStorage implements IStorage {
  private applications: Map<number, RentalApplication>;
  private files: Map<string, Buffer>;
  private currentId: number;

  constructor() {
    this.applications = new Map();
    this.files = new Map();
    this.currentId = 1;
  }

  async createRentalApplication(insertApplication: InsertRentalApplication): Promise<RentalApplication> {
    const id = this.currentId++;
    const application: RentalApplication = {
      ...insertApplication,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.applications.set(id, application);
    return application;
  }

  async getRentalApplication(id: number): Promise<RentalApplication | undefined> {
    return this.applications.get(id);
  }

  async updateRentalApplication(id: number, updates: Partial<InsertRentalApplication>): Promise<RentalApplication | undefined> {
    const existing = this.applications.get(id);
    if (!existing) return undefined;

    const updated: RentalApplication = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.applications.set(id, updated);
    return updated;
  }

  async getAllRentalApplications(): Promise<RentalApplication[]> {
    return Array.from(this.applications.values());
  }

  async storeFile(filename: string, content: Buffer): Promise<string> {
    this.files.set(filename, content);
    return filename;
  }

  async getFile(filename: string): Promise<Buffer | undefined> {
    return this.files.get(filename);
  }
}

export const storage = new MemStorage();
