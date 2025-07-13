# CloudVault - Cloud Storage Gallery        Application

## Overview

CloudVault is a modern full-stack web application that provides a cloud storage gallery interface with multi-provider support (Google Cloud and AWS S3). The application allows users to upload, view, organize, and manage images through an intuitive web interface with comprehensive analytics and storage management features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom cloud-native color scheme
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Build Tool**: esbuild for server-side bundling

### Project Structure
- **Monorepo Design**: Shared code between client and server
- **`client/`**: React frontend application
- **`server/`**: Express.js backend API
- **`shared/`**: Common schemas and types used by both frontend and backend

## Key Components

### Database Schema (Drizzle ORM)
- **Users Table**: User authentication and management
- **Images Table**: Image metadata, file information, and cloud provider details
- **Storage Analytics Table**: Storage usage statistics and cost tracking

### Frontend Components
- **Gallery Interface**: Grid and list view modes for image browsing
- **Upload System**: Drag-and-drop file upload with provider selection
- **Image Preview**: Full-screen image viewer with zoom controls
- **Storage Analytics**: Real-time storage usage and cost monitoring
- **Provider Management**: Toggle between Google Cloud and AWS S3

### Backend API Endpoints
- **`/api/images`**: CRUD operations for image management
- **`/api/analytics`**: Storage analytics and usage statistics
- **Authentication**: User management and session handling

## Data Flow

1. **Image Upload**: Client uploads images via drag-and-drop or file picker
2. **Provider Selection**: User selects cloud storage provider (Google/AWS)
3. **Metadata Processing**: Server processes image metadata and stores in PostgreSQL
4. **Storage Analytics**: Real-time calculation of storage usage and costs
5. **Gallery Display**: Images retrieved from database and displayed in chosen view mode
6. **Image Operations**: Preview, download, and deletion operations through API

## External Dependencies

### Cloud Storage Integration
- **Google Cloud Storage**: Primary cloud storage provider
- **AWS S3**: Alternative cloud storage provider
- **CDN Support**: Thumbnail generation and content delivery

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Modern icon library
- **shadcn/ui**: Pre-built component library

### Development Tools
- **Vite**: Fast build tool with HMR
- **TypeScript**: Type safety across the stack
- **ESLint/Prettier**: Code formatting and linting
- **Drizzle Kit**: Database migration and management

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with Express.js API
- **Hot Reload**: Full-stack hot module replacement
- **Database**: Neon Database for development and production

### Production Build
- **Frontend**: Static assets built with Vite and served by Express
- **Backend**: Server bundle created with esbuild
- **Database**: PostgreSQL migrations managed by Drizzle Kit
- **Environment**: Configured for Node.js production deployment

### Key Features
- **Multi-provider Support**: Seamless switching between cloud storage providers
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Real-time Analytics**: Live storage usage and cost monitoring
- **Batch Operations**: Multiple image selection and bulk operations
- **Search and Filtering**: Advanced image search and organization
- **Accessibility**: WCAG compliant interface with keyboard navigation

The architecture prioritizes developer experience with TypeScript throughout, modern build tools, and a shared codebase approach that reduces duplication and ensures type safety across the full stack.