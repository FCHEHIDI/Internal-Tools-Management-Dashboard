# 🎯 Internal Tools Management Dashboard

> A modern, enterprise-grade SaaS tools management platform built with React, TypeScript, and Vite

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://fchehidi.github.io/Internal-Tools-Management-Dashboard)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)](https://tailwindcss.com/)

## ✨ Features

### 📊 Dashboard
- **Real-time KPI Cards** with metallic platinum borders and hover color effects (Gold, Platinum, Sapphire, Ruby)
- **Interactive Tools Table** with sortable columns (Tool name, Users, Monthly cost)
- **Search Functionality** with instant filtering
- **Smart Add Tool Widget** with contextual engagement and campaign banners
- **3D Spectral UFO Animation** - Sci-fi flying saucer that travels across all pages with disintegration effect (45s)

### 🛠️ Tools Management
- **Advanced Filtering System** (Category, Department, Status, Cost range)
- **Sortable & Searchable Catalog** with logo integration
- **Multi-format Export** (PDF, Excel, CSV) with customizable columns
- **Full CRUD Operations** with modals (Add, Edit, Delete, View details)
- **Tool Logos Support** for 50+ popular SaaS tools

### 📈 Analytics
- **Cost Trends Visualization** with interactive charts
- **Department-wise Analysis** 
- **Usage Statistics**
- **Budget Forecasting**

### ⚙️ Settings
- **User Profile Management**
- **Notification Preferences** (Coming Soon)
- **Security Settings**
- **Theme Customization** (Blue+Silver gradient theme)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/FCHEHIDI/Internal-Tools-Management-Dashboard.git
cd Internal-Tools-Management-Dashboard

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## 📦 Available Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
npm test            # Run Playwright tests
npm run test:ui     # Open Playwright UI
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # Base UI components (Button, Card, Input, etc.)
│   ├── features/        # Feature-specific components
│   │   ├── AddToolModal.tsx
│   │   ├── AddToolWidget.tsx
│   │   ├── ExportDialog.tsx
│   │   ├── RecentToolsTable.tsx
│   │   ├── ToolsCatalog.tsx
│   │   └── ToolsFilters.tsx
│   ├── layouts/         # Layout components (Header, MainLayout)
│   └── three/           # 3D components (UFO, DataCube, RobotScene)
├── pages/               # Page components
│   ├── Dashboard.tsx    # Main dashboard with KPIs
│   ├── Tools.tsx        # Tools catalog page
│   ├── Analytics.tsx    # Analytics & reports
│   ├── Settings.tsx     # User settings
│   └── NotFound.tsx     # 404 page
├── services/            # API services
│   └── api/
│       ├── tools.ts     # Tools API endpoints
│       └── client.ts    # Axios client configuration
├── hooks/               # Custom React hooks
│   ├── useTools.ts      # Tools data fetching
│   └── index.ts
├── stores/              # Zustand state management
│   ├── modalStore.ts    # Modal state
│   ├── filtersStore.ts  # Filters state
│   └── index.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── lib/                 # Utility functions
│   ├── utils.ts         # General utilities
│   ├── exportUtils.ts   # Export functionality (PDF, Excel, CSV)
│   └── toolLogos.ts     # Tool logos mapping
├── contexts/            # React contexts
│   └── UserContext.tsx  # User data context
├── assets/              # Static assets (images, icons)
├── App.tsx              # Main app component with routing
└── main.tsx             # Application entry point
```

## 🎨 Tech Stack

### Core
- **React 18.3** - Modern React with Hooks and Suspense
- **TypeScript 5.6** - Type-safe development
- **Vite 5.4** - Lightning-fast build tool with HMR

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11** - Smooth animations
- **Lucide React** - Beautiful icon set
- **Three.js + React Three Fiber** - 3D graphics for UFO animation

### State Management & Data Fetching
- **Zustand 5** - Lightweight state management
- **TanStack Query (React Query) 5** - Powerful data synchronization
- **Axios 1.7** - HTTP client

### Forms & Validation
- **React Hook Form 7** - Performant form handling
- **Zod 3** - TypeScript-first schema validation

### Export & Reports
- **jsPDF 3** - PDF generation
- **jsPDF-AutoTable 5** - PDF table formatting
- **XLSX (SheetJS)** - Excel file generation

### Routing
- **React Router DOM 7** - Declarative routing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Playwright** - E2E testing

## 🌐 API Configuration

The app uses JSON Server as a mock backend. Configure the API URL in `.env`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

### Mock API Endpoints
- `GET /tools` - Fetch all tools
- `GET /tools/:id` - Fetch single tool
- `POST /tools` - Create new tool
- `PUT /tools/:id` - Update tool
- `DELETE /tools/:id` - Delete tool

## 🎯 Key Features Explained

### 3D Spectral UFO
A sci-fi flying saucer with neon blue/yellow design that:
- Travels across all pages in a figure-8 pattern
- Features 9 hexagonal panels, rotating dome, plasma tendrils
- Disintegrates after 45 seconds with blur effect
- Non-interactive (pointer-events-none) - doesn't block UI

### Export System
Multi-format export with column selection:
- **PDF**: Formatted tables with color theme
- **Excel**: Full spreadsheet with styling
- **CSV**: Raw data export

### Smart Filtering
Real-time filtering with:
- Multi-select categories & departments
- Status filters (Active, Expiring, Expired)
- Cost range slider
- Instant search

### Tool Logos
Automatic logo detection for 50+ SaaS tools including:
Slack, Figma, Notion, GitHub, Jira, Zoom, Microsoft 365, Adobe Creative Cloud, and more.

## 📱 Responsive Design

Fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Best Practices

- Environment variables for sensitive data
- Input validation with Zod schemas
- XSS protection with React's built-in escaping
- CORS configuration
- Secure HTTP-only cookies (production ready)

## 🚢 Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment:

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

Or use the automated workflow (`.github/workflows/deploy.yml`)

### Vite Configuration

Update `vite.config.ts` for custom base URL:

```typescript
export default defineConfig({
  base: '/Internal-Tools-Management-Dashboard/',
  // ... other config
})
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run specific test file
npx playwright test tests/dashboard.spec.ts
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Fares Chehidi**
- GitHub: [@FCHEHIDI](https://github.com/FCHEHIDI)
- Email: fares@techcorp.com

## 🙏 Acknowledgments

- Tool logos from official brand resources
- Design inspiration from modern SaaS dashboards
- GitHub Universe holographic effects inspiration
- Community feedback and contributions

## 📊 Project Status

**Current Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: December 2025

## 🗺️ Roadmap

- [ ] Dark mode toggle
- [ ] Advanced analytics charts
- [ ] Tool usage tracking
- [ ] Budget alerts & notifications
- [ ] Team collaboration features
- [ ] API integration with real SaaS providers
- [ ] Mobile app (React Native)
- [ ] AI-powered cost optimization suggestions

---

Made with ❤️ and ☕ by Fares Chehidi
