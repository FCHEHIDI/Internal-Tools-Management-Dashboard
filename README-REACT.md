# React + Vite Implementation

This is the React + Vite implementation of the Internal Tools Management Dashboard.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # Base UI components
│   ├── features/       # Feature-specific components
│   └── layouts/        # Layout components
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── Tools.tsx
│   └── Analytics.tsx
├── services/           # API services
│   └── api/
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores
├── types/              # TypeScript types
├── lib/                # Utilities
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **TanStack Query** - Data fetching
- **Zustand** - State management
- **Lucide React** - Icons
- **Recharts** - Data visualization
- **Vitest** - Unit testing
- **Playwright** - E2E testing

## 🎨 Design System

The application uses a custom design system built with Tailwind CSS. See [DESIGN_SYSTEM.md](../docs/DESIGN_SYSTEM.md) for details.

### Key Features

- Dark/Light theme support
- Consistent color palette with gradients
- Inter font family
- Responsive breakpoints
- Reusable component library

## 📊 API Integration

The app connects to a mock JSON Server API:

- **Base URL**: `https://tt-jsonserver-01.alt-tools.tech`
- **Endpoints**: See [API.md](../docs/API.md)

Configure via `.env` file:

```env
VITE_API_URL=https://tt-jsonserver-01.alt-tools.tech
```

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e

# Type checking
npm run typecheck
```

## 📝 Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

## 🚀 Deployment

The app can be deployed to any static hosting provider:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Azure Static Web Apps**

Build command: `npm run build`  
Output directory: `dist/`

## 📖 Development Guide

### Adding a New Page

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/layouts/Header.tsx`

### Creating a Component

1. Create component in appropriate directory
2. Export from index file
3. Add TypeScript types
4. Write unit tests

### API Integration

1. Define types in `src/types/`
2. Create API service in `src/services/api/`
3. Create custom hook in `src/hooks/`
4. Use hook in component

## 🔧 Configuration

### VS Code Settings

Recommended extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=https://tt-jsonserver-01.alt-tools.tech
```

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/latest)

---

For questions or issues, see the main [README.md](../README.md)
