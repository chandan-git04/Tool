# REG AI Insight - Intelligent Search & Analysis Platform

## Overview

REG AI Insight is a full-stack web application that provides intelligent search capabilities and AI-powered data analysis. The platform allows users to submit queries through text or voice input, receive AI-generated responses, and manage their search history. Built with modern web technologies, it features a clean, professional interface with comprehensive data management capabilities.

## System Architecture

The application follows a traditional client-server architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the entire stack
- **API Design**: RESTful API endpoints for query management
- **Development**: Hot module replacement via Vite integration

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured but can be easily switched)
- **Connection**: Neon Database serverless PostgreSQL adapter
- **Migrations**: Drizzle Kit for schema management

## Key Components

### Core Features
1. **Search Interface**: Primary search functionality with text and voice input support
2. **AI Response System**: Simulated AI processing with intelligent response generation
3. **Query History**: Complete query storage and retrieval system
4. **Data Export**: JSON export functionality for chat history
5. **Voice Recognition**: Web Speech API integration for voice-to-text input

### Database Schema
The application uses a relational database structure with three main tables:
- **Users**: User authentication and profile management
- **Chat Sessions**: Grouping queries into conversational sessions
- **Queries**: Individual search queries with responses and metadata

### UI Components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Comprehensive shadcn/ui components for consistency
- **Accessibility**: ARIA-compliant components and keyboard navigation
- **Interactive Elements**: Loading states, toasts, and smooth animations

## Data Flow

1. **User Input**: Users submit queries via text input or voice recognition
2. **API Processing**: Express server receives and validates query data
3. **AI Simulation**: Server generates intelligent responses (placeholder for actual AI integration)
4. **Database Storage**: Queries and responses are persisted using Drizzle ORM
5. **Real-time Updates**: TanStack Query manages cache invalidation and UI updates
6. **Export Functionality**: Users can download their complete query history

## External Dependencies

### Frontend Libraries
- **@radix-ui/**: Headless UI components for accessibility
- **@tanstack/react-query**: Server state management and caching
- **lucide-react**: Icon library for consistent iconography
- **date-fns**: Date manipulation and formatting utilities
- **wouter**: Lightweight routing solution

### Backend Libraries
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **@neondatabase/serverless**: Serverless PostgreSQL database driver
- **express**: Web application framework
- **tsx**: TypeScript execution for development

### Development Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Static type checking throughout
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 and PostgreSQL 16 modules
- **Hot Reload**: Vite development server with Express integration
- **Port Configuration**: Development server on port 5000

### Production Deployment
- **Build Process**: Vite builds client-side assets, ESBuild bundles server code
- **Target**: Replit autoscale deployment with optimized bundling
- **Static Assets**: Client build output served from Express server
- **Environment**: Production mode with optimized asset serving

### Configuration Management
- **Environment Variables**: DATABASE_URL for database connection
- **Build Scripts**: Separate development and production build processes
- **Asset Handling**: Public assets served through Express static middleware

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 26, 2025. Initial setup