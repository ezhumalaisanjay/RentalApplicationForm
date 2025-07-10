# Rental Application System

## Overview

This is a full-stack rental application management system built with modern web technologies. The application provides a comprehensive multi-step form for rental applications, complete with file uploads, signature capture, and data persistence. It features a React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **File Handling**: Multer for multipart form data processing
- **Development**: Hot reload with Vite middleware in development

### Build System
- **Frontend Build**: Vite with React plugin
- **Backend Build**: esbuild for production bundling
- **Development**: Concurrent development server with Vite proxy

## Key Components

### Form Wizard System
- Multi-step form with progress tracking
- Steps include: Application Details, Primary Applicant, Co-Applicant, Guarantor, Financial Info, Legal Questions, Review & Submit
- Conditional logic for optional sections (co-applicant, guarantor)
- Form validation using Zod schemas
- Mobile-responsive design

### Database Schema
- Single table (`rental_applications`) storing all application data
- JSON fields for complex nested data (applicant info, financial data, legal questions)
- Timestamps for audit trails
- Status tracking for application workflow

### File Management
- In-memory storage for development (MemStorage class)
- File upload handling with signature pad integration
- Support for document attachments

### UI Components
- Comprehensive set of reusable components from shadcn/ui
- Custom form components for rental application workflow
- Signature pad for digital signatures
- File upload with drag-and-drop support
- Progress bar with step indicators

## Data Flow

1. **Form Submission**: User fills out multi-step form with client-side validation
2. **Data Processing**: Form data is structured and validated using Zod schemas
3. **API Communication**: Data sent to Express backend via REST API
4. **Database Storage**: Drizzle ORM handles database operations with PostgreSQL
5. **Response Handling**: Success/error states managed through TanStack Query
6. **PDF Generation**: Application data converted to PDF format for download

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Framework**: Radix UI primitives, shadcn/ui components
- **Utilities**: Tailwind CSS, clsx, class-variance-authority
- **State Management**: TanStack React Query
- **Date Handling**: date-fns
- **Form Validation**: Zod with Hookform resolvers

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM, @neondatabase/serverless
- **File Processing**: Multer for file uploads
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **Development Tools**: tsx for TypeScript execution

### Development Tools
- **Build Tools**: Vite, esbuild, PostCSS
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: Tailwind CSS configuration

## Deployment Strategy

### Development Environment
- Vite development server with hot module replacement
- Express server with automatic restarts
- Environment variables for database configuration
- Replit-specific plugins for development experience

### Netlify Production Deployment
- Frontend: Static React application served from CDN
- Backend: Serverless functions for API endpoints (/api -> /.netlify/functions/api)
- Storage: In-memory storage with MemStorage class
- CORS: Configured for cross-origin requests
- Build: Vite build process generating static assets in dist/

### Netlify Configuration Files
- `netlify.toml`: Main configuration with build settings and redirects
- `netlify/functions/api.js`: Serverless function handling all API routes
- `_headers`: HTTP security headers configuration
- `NETLIFY_DEPLOYMENT.md`: Complete deployment guide

### Database Management
- Development: In-memory storage (MemStorage class)
- Production: In-memory storage via serverless functions
- Future: Can be upgraded to persistent PostgreSQL database
- Schema: Defined using Drizzle ORM with type safety

The system is designed to be scalable and maintainable, with clear separation of concerns between frontend and backend, comprehensive error handling, and a modern development experience.