import { users, chatSessions, queries, type User, type InsertUser, type ChatSession, type InsertChatSession, type Query, type InsertQuery } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getChatSession(id: number): Promise<ChatSession | undefined>;
  getChatSessionsByUserId(userId: number): Promise<ChatSession[]>;
  deleteChatSession(id: number): Promise<void>;
  
  createQuery(query: InsertQuery): Promise<Query>;
  getQueriesBySessionId(sessionId: number): Promise<Query[]>;
  getAllQueries(): Promise<Query[]>;
  clearAllQueries(): Promise<void>;
  exportQueries(): Promise<Query[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatSessions: Map<number, ChatSession>;
  private queries: Map<number, Query>;
  private currentUserId: number;
  private currentSessionId: number;
  private currentQueryId: number;

  constructor() {
    this.users = new Map();
    this.chatSessions = new Map();
    this.queries = new Map();
    this.currentUserId = 1;
    this.currentSessionId = 1;
    this.currentQueryId = 1;
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
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const id = this.currentSessionId++;
    const now = new Date();
    const session: ChatSession = { 
      id,
      userId: insertSession.userId || 1,
      title: insertSession.title || null,
      createdAt: now, 
      updatedAt: now 
    };
    this.chatSessions.set(id, session);
    return session;
  }

  async getChatSession(id: number): Promise<ChatSession | undefined> {
    return this.chatSessions.get(id);
  }

  async getChatSessionsByUserId(userId: number): Promise<ChatSession[]> {
    return Array.from(this.chatSessions.values()).filter(
      (session) => session.userId === userId,
    );
  }

  async deleteChatSession(id: number): Promise<void> {
    this.chatSessions.delete(id);
    // Also delete associated queries
    Array.from(this.queries.entries()).forEach(([queryId, query]) => {
      if (query.sessionId === id) {
        this.queries.delete(queryId);
      }
    });
  }

  async createQuery(insertQuery: InsertQuery): Promise<Query> {
    const id = this.currentQueryId++;
    const query: Query = { 
      id,
      sessionId: insertQuery.sessionId || 1,
      query: insertQuery.query,
      response: insertQuery.response || null,
      isVoiceInput: insertQuery.isVoiceInput || false,
      createdAt: new Date() 
    };
    this.queries.set(id, query);
    return query;
  }

  async getQueriesBySessionId(sessionId: number): Promise<Query[]> {
    return Array.from(this.queries.values()).filter(
      (query) => query.sessionId === sessionId,
    );
  }

  async getAllQueries(): Promise<Query[]> {
    return Array.from(this.queries.values());
  }

  async clearAllQueries(): Promise<void> {
    this.queries.clear();
  }

  async exportQueries(): Promise<Query[]> {
    return Array.from(this.queries.values());
  }
}

export const storage = new MemStorage();
