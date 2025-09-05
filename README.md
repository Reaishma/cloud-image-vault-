# CloudVault - Advanced Image Gallery Application

CloudVault is a modern, professional cloud storage gallery application that simulates both Google Cloud Storage and AWS S3 providers. Built with React, TypeScript, and Express.js, it provides a comprehensive image management solution with real-time analytics, multi-provider support, and an intuitive user interface.

![Overview](https://github.com/Reaishma/cloud-image-vault-/blob/main/Screenshot_20250904-201302_1.jpg)

# 🚀 Live Demo 
   
 view demo https://reaishma.github.io/cloud-image-vault-/

## 🚀 Features

### Core Functionality
- **Multi-Provider Support**: Seamlessly switch between Google Cloud Storage and AWS S3
- **Image Upload**: Drag-and-drop interface with support for multiple file formats (JPG, PNG, GIF)
- **Gallery Views**: Grid and list view modes for optimal image browsing
- **Real-time Analytics**: Live storage usage, cost monitoring, and performance metrics
- **Image Preview**: Full-screen modal with zoom controls and detailed metadata
- **Batch Operations**: Multiple image selection and bulk operations
- **Search & Filter**: Advanced search capabilities with sorting options
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Technical Features
- **Real Image Storage**: Uploads and displays actual image files (not placeholders)
- **Base64 Data URLs**: Efficient client-side image processing and storage
- **Smart URL Display**: Truncated CDN URLs with copy-to-clipboard functionality
- **Notification System**: Real-time notifications with read/unread states
- **Session Management**: Persistent user sessions with PostgreSQL storage
- **Type Safety**: Full TypeScript implementation across frontend and backend


## 🛠️ Technology Stack

### Frontend 
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom cloud-native color scheme
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend 
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
### Development Tools
- **ESBuild** - Fast JavaScript bundler
- **Drizzle Kit** - Database migration management
- **Hot Module Replacement** - Real-time development updates

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or Neon account)
- Modern web browser with JavaScript enabled

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cloudvault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/cloudvault
   SESSION_SECRET=your-session-secret-key
   NODE_ENV=development
   ```

4. **Run database migrations**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000

### Project Structure
- **Monorepo Design**: Shared code between client and server
- **`client/`**: React frontend application
- **`server/`**: Express.js backend API
- **`shared/`**: Common schemas and types used by both frontend and backend


```
cloudvault/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and API client
│   │   ├── pages/          # Route components
│   │   └── App.tsx         # Main application component
│   └── index.html          # HTML entry point
├── server/                 # Express.js backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route handlers
│   ├── storage.ts         # Database interface and implementation
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and types
├── cloudvault-standalone.html # Standalone HTML version
└── README.md              # This file
```

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

![AWS S3](https://github.com/Reaishma/cloud-image-vault-/blob/main/Screenshot_20250904-201153_1.jpg)

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - User email address
- `password_hash` - Encrypted password
- `created_at` - Account creation timestamp

### Images Table
- `id` - Primary key
- `filename` - Stored filename
- `original_name` - Original upload filename
- `size` - File size in bytes
- `mime_type` - File MIME type
- `width` - Image width in pixels
- `height` - Image height in pixels
- `upload_date` - Upload timestamp
- `provider` - Storage provider (google/aws)
- `cdn_url` - CDN/storage URL
- `metadata` - Additional JSON metadata
- `user_id` - Foreign key to users table

### Storage Analytics Table
- `id` - Primary key
- `total_storage` - Total storage usage
- `total_images` - Total image count
- `cdn_bandwidth` - CDN bandwidth usage
- `monthly_cost` - Monthly cost estimation
- `last_updated` - Last update timestamp



### Backend components 

## 🔧 API Endpoints

### Image Management
- `GET /api/images` - Retrieve all images
- `POST /api/upload` - Upload new images
- `PUT /api/images/:id` - Update image metadata
- `DELETE /api/images/:id` - Delete single image
- `DELETE /api/images` - Delete multiple images

### Analytics
- `GET /api/analytics` - Get storage analytics
- `PUT /api/analytics` - Update analytics data

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user


## 🎨 UI Components

### Core Components
- **AppHeader** - Navigation and provider selection
- **ImageGallery** - Grid/list view with image display
- **UploadDropzone** - Drag-and-drop file upload
- **ImagePreviewModal** - Full-screen image viewer
- **StorageAnalytics** - Real-time dashboard
- **GalleryControls** - Search, sort, and view options

### UI System
- **Buttons** - Various button styles and states
- **Forms** - Form controls with validation
- **Modals** - Dialog and overlay components
- **Cards** - Content containers and layouts
- **Badges** - Status indicators and labels

## 🔐 Security Features

- **Session Management** - Secure user sessions
- **Input Validation** - Zod schema validation
- **SQL Injection Prevention** - Parameterized queries
- **CSRF Protection** - Cross-site request forgery protection
- **File Type Validation** - Restricted file upload types
- **Size Limitations** - File size restrictions

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


## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```bash
docker build -t cloudvault .
docker run -p 5000:5000 cloudvault
```
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



## 🧪 Testing

### Run Tests
```bash
npm test
```

### Coverage Report
```bash
npm run test:coverage
```

## 🔄 Data Migration

### Generate Migration
```bash
npm run db:generate
```

### Run Migrations
```bash
npm run db:migrate
```

### Reset Database
```bash
npm run db:reset
```
## 📈 Performance Optimizations

- **Image Optimization** - Automatic image compression
- **Lazy Loading** - Progressive image loading
- **CDN Integration** - Content delivery network support
- **Caching** - Browser and server-side caching
- **Bundle Splitting** - Code splitting for faster loads

## 🛡️ Error Handling

- **Global Error Boundary** - React error boundaries
- **API Error Handling** - Comprehensive error responses
- **Validation Errors** - User-friendly form validation
- **Network Errors** - Retry mechanisms and fallbacks
- **File Upload Errors** - Detailed upload error messages

## 📋 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `SESSION_SECRET` | Session encryption key | Required |
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 5000 |
| `VITE_API_BASE_URL` | API base URL for frontend | /api |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## Developer 🧑‍💻 

**Reaishma N**


## 📊 Analytics & Monitoring

The application includes comprehensive analytics tracking:
- Storage usage monitoring
- Upload/download statistics
- Performance metrics
- User activity tracking
- Cost analysis and optimization

## 🎯 Use Cases

- **Personal Photo Management** - Organize and manage personal image collections
- **Business Asset Management** - Store and organize company images and media
- **Web Development** - Content management for websites and applications
- **Cloud Storage Simulation** - Test and demonstrate cloud storage solutions
- **Portfolio Management** - Showcase work and creative projects

---

## 🔧 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
Error: connection to server failed
```
Solution: Ensure PostgreSQL is running and DATABASE_URL is correct

**Build Fails**
```bash
Error: TypeScript compilation failed
```
Solution: Check TypeScript configuration and fix type errors

**Upload Not Working**
```bash
Error: Failed to upload images
```
Solution: Check file permissions and storage configuration

### Debug Mode
Enable debug logging by setting:
```env
DEBUG=cloudvault:*
```

---



The architecture prioritizes developer experience with TypeScript throughout, modern build tools, and a shared codebase approach that reduces duplication and ensures type safety across the full stack.