import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuerySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit a new query
  app.post("/api/queries", async (req, res) => {
    try {
      // Extend the type to include dataSources
      type QueryData = {
        sessionId: number;
        query: string;
        response?: string | null;
        isVoiceInput?: boolean | null;
        dataSources?: string[];
      };
      const queryData = insertQuerySchema.parse(req.body) as QueryData;
      
           // Simulate AI processing with data source information
      const dataSourcesText = queryData.dataSources && queryData.dataSources.length > 0 
        ? ` Searched across ${queryData.dataSources.join(', ')} data sources.`
        : '';
      
      const aiResponse = `I understand you're asking about: "${queryData.query}".${dataSourcesText} This is a simulated AI response that would normally be processed by REG AI Insight's intelligent analysis system using the selected data sources.`;
      const query = await storage.createQuery({
        ...queryData,
        response: aiResponse,
      });
      
      res.json(query);
    } catch (error) {
      res.status(400).json({ error: "Invalid query data" });
    }
  });

  // Get all queries
  app.get("/api/queries", async (req, res) => {
    try {
      const queries = await storage.getAllQueries();
      res.json(queries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch queries" });
    }
  });

  // Clear all queries (Clear History)
  app.delete("/api/queries", async (req, res) => {
    try {
      await storage.clearAllQueries();
      res.json({ message: "All queries cleared successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear queries" });
    }
  });

  // Export chat history
  app.get("/api/export", async (req, res) => {
    try {
      const queries = await storage.exportQueries();
      const exportData = {
        exportDate: new Date().toISOString(),
        totalQueries: queries.length,
        queries: queries.map(q => ({
          id: q.id,
          query: q.query,
          response: q.response,
          isVoiceInput: q.isVoiceInput,
          createdAt: q.createdAt,
        })),
      };
      
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=reg-ai-insight-export.json');
      res.json(exportData);
    } catch (error) {
      res.status(500).json({ error: "Failed to export data" });
    }
  });

  // Create default chat session (for demo purposes)
  app.post("/api/sessions", async (req, res) => {
    try {
      const session = await storage.createChatSession({
        userId: 1, // Default user
        title: "REG AI Insight Session",
      });
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to create session" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
