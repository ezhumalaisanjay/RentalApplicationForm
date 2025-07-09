import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRentalApplicationSchema } from "@shared/schema";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Create rental application
  app.post("/api/rental-applications", async (req, res) => {
    try {
      const validatedData = insertRentalApplicationSchema.parse(req.body);
      const application = await storage.createRentalApplication(validatedData);
      res.json(application);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  // Get rental application
  app.get("/api/rental-applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const application = await storage.getRentalApplication(id);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update rental application
  app.patch("/api/rental-applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const application = await storage.updateRentalApplication(id, updates);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get all rental applications
  app.get("/api/rental-applications", async (req, res) => {
    try {
      const applications = await storage.getAllRentalApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // File upload
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filename = `${Date.now()}-${req.file.originalname}`;
      await storage.storeFile(filename, req.file.buffer);
      
      res.json({ filename, originalName: req.file.originalname });
    } catch (error) {
      res.status(500).json({ error: "File upload failed" });
    }
  });

  // Get file
  app.get("/api/files/:filename", async (req, res) => {
    try {
      const file = await storage.getFile(req.params.filename);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      res.send(file);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
