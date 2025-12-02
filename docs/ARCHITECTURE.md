# System Architecture

## 📐 Architecture Overview

The Internal Tools Management Dashboard follows a **modern, component-based architecture** with a clear separation of concerns. The application is designed to be maintainable, scalable, and consistent across multiple implementations.

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Dashboard  │  │    Tools    │  │  Analytics  │        │
│  │    Page     │  │    Page     │  │    Page     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Component Library                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   UI     │  │ Features │  │ Layouts  │  │  Charts  │  │
│  │Components│  │Components│  │Components│  │Components│  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Business Logic                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Hooks   │  │ Services │  │  State   │  │ Utilities│  │
│  │  (React) │  │          │  │Management│  │          │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   API    │  │  Cache   │  │  Models  │  │Transform │  │
│  │  Client  │  │          │  │          │  │          │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│               Mock JSON Server / Real APIs                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Layer Breakdown

### 1. Presentation Layer

**Responsibility**: User interface and user interactions

#### Pages Structure
```
pages/
├── Dashboard/
│   ├── Dashboard.tsx
│   ├── components/
│   │   ├── KPICards.tsx
│   │   ├── RecentToolsTable.tsx
│   │   └── BudgetProgress.tsx
│   └── hooks/
│       └── useDashboardData.ts
│
├── Tools/
│   ├── Tools.tsx
│   ├── components/
│   │   ├── ToolsCatalog.tsx
│   │   ├── ToolsFilters.tsx
│   │   ├── ToolCard.tsx
│   │   └── AddToolModal.tsx
│   └── hooks/
│       ├── useTools.ts
│       └── useToolsFilters.ts
│
└── Analytics/
    ├── Analytics.tsx
    ├── components/
    │   ├── CostAnalytics.tsx
    │   ├── UsageAnalytics.tsx
    │   └── InsightsDashboard.tsx
    └── hooks/
        └── useAnalytics.ts
```

**Key Principles**:
- Each page is self-contained with its own components and hooks
- Pages consume components from the shared component library
- Page-specific state is managed locally
- Global state (theme, user) is consumed from context/store

---

### 2. Component Library

**Responsibility**: Reusable, composable UI components

#### Component Categories

```
components/
├── ui/                     # Base UI components (Design System)
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Card/
│   ├── Badge/
│   ├── Input/
│   ├── Select/
│   ├── Modal/
│   └── Table/
│
├── features/               # Feature-specific components
│   ├── StatusBadge/
│   ├── ToolIcon/
│   ├── DepartmentFilter/
│   └── SearchBar/
│
├── layouts/                # Layout components
│   ├── Header/
│   ├── Sidebar/
│   └── MainLayout/
│
└── charts/                 # Data visualization components
    ├── LineChart/
    ├── PieChart/
    ├── BarChart/
    └── SparkLine/
```

**Component Design Principles**:
- **Atomic Design**: Base components → Feature components → Pages
- **Single Responsibility**: Each component does one thing well
- **Composability**: Components can be combined to create complex UIs
- **Consistency**: All components follow the design system
- **Accessibility**: WCAG 2.1 AA compliant

#### Example: Button Component

```typescript
// components/ui/Button/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-primary text-white hover:opacity-90',
        secondary: 'bg-surface text-foreground hover:bg-surface-hover',
        danger: 'bg-gradient-danger text-white hover:opacity-90',
        ghost: 'hover:bg-surface text-foreground',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-11 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  isLoading,
  children,
  ...props
}) => {
  return (
    <button
      className={buttonVariants({ variant, size })}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
```

---

### 3. Business Logic Layer

**Responsibility**: Application logic, state management, and data fetching

#### State Management Strategy

```typescript
// stores/
├── useThemeStore.ts        # Theme (dark/light) state
├── useUserStore.ts         # User session state
├── useToolsStore.ts        # Tools management state
└── useFiltersStore.ts      # Filter state across pages
```

**State Management Approach**:
- **Zustand** for global UI state (theme, filters, user preferences)
- **TanStack Query** for server state (data fetching, caching, synchronization)
- **Local state** (useState) for component-specific state

#### Example: Tools Store

```typescript
// stores/useToolsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ToolsState {
  filters: {
    department: string | null;
    status: string | null;
    costRange: [number, number];
    category: string | null;
  };
  sortBy: 'name' | 'cost' | 'users' | 'updated_at';
  sortOrder: 'asc' | 'desc';
  setFilter: (key: string, value: any) => void;
  setSorting: (sortBy: string, sortOrder: string) => void;
  resetFilters: () => void;
}

export const useToolsStore = create<ToolsState>()(
  persist(
    (set) => ({
      filters: {
        department: null,
        status: null,
        costRange: [0, 10000],
        category: null,
      },
      sortBy: 'updated_at',
      sortOrder: 'desc',
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
      setSorting: (sortBy, sortOrder) =>
        set({ sortBy, sortOrder }),
      resetFilters: () =>
        set({
          filters: {
            department: null,
            status: null,
            costRange: [0, 10000],
            category: null,
          },
        }),
    }),
    { name: 'tools-filters' }
  )
);
```

#### Custom Hooks

```typescript
// hooks/
├── useTools.ts             # Fetch and manage tools
├── useDepartments.ts       # Fetch departments
├── useAnalytics.ts         # Fetch analytics data
├── useDebounce.ts          # Debounce utility
└── useMediaQuery.ts        # Responsive breakpoints
```

**Example: useTools Hook**

```typescript
// hooks/useTools.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toolsApi } from '@/services/api';
import { useToolsStore } from '@/stores/useToolsStore';

export const useTools = () => {
  const queryClient = useQueryClient();
  const { filters, sortBy, sortOrder } = useToolsStore();

  // Fetch tools with filters
  const { data, isLoading, error } = useQuery({
    queryKey: ['tools', filters, sortBy, sortOrder],
    queryFn: () => toolsApi.getTools({ filters, sortBy, sortOrder }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Add tool mutation
  const addToolMutation = useMutation({
    mutationFn: toolsApi.addTool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });

  // Delete tool mutation
  const deleteToolMutation = useMutation({
    mutationFn: toolsApi.deleteTool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });

  return {
    tools: data?.tools ?? [],
    totalCount: data?.totalCount ?? 0,
    isLoading,
    error,
    addTool: addToolMutation.mutate,
    deleteTool: deleteToolMutation.mutate,
  };
};
```

---

### 4. Data Layer

**Responsibility**: API communication, data transformation, and caching

#### API Client Structure

```typescript
// services/
├── api/
│   ├── client.ts           # Base API client configuration
│   ├── tools.ts            # Tools endpoints
│   ├── departments.ts      # Departments endpoints
│   ├── users.ts            # Users endpoints
│   └── analytics.ts        # Analytics endpoints
├── transformers/
│   ├── toolTransformer.ts  # Transform API data to app models
│   └── analyticsTransformer.ts
└── models/
    ├── Tool.ts             # Tool type definitions
    ├── Department.ts       # Department type definitions
    └── Analytics.ts        # Analytics type definitions
```

**Example: API Client**

```typescript
// services/api/client.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tt-jsonserver-01.alt-tools.tech';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**Example: Tools API Service**

```typescript
// services/api/tools.ts
import { apiClient } from './client';
import { Tool, ToolFilters } from '@/models/Tool';
import { transformTool } from '@/services/transformers/toolTransformer';

export const toolsApi = {
  getTools: async (params: {
    filters: ToolFilters;
    sortBy: string;
    sortOrder: string;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (params.filters.status) {
      queryParams.append('status', params.filters.status);
    }
    if (params.filters.department) {
      queryParams.append('owner_department', params.filters.department);
    }
    queryParams.append('_sort', params.sortBy);
    queryParams.append('_order', params.sortOrder);

    const response = await apiClient.get(`/tools?${queryParams.toString()}`);
    return {
      tools: response.data.map(transformTool),
      totalCount: response.headers['x-total-count'],
    };
  },

  getTool: async (id: number) => {
    const response = await apiClient.get(`/tools/${id}`);
    return transformTool(response.data);
  },

  addTool: async (tool: Partial<Tool>) => {
    const response = await apiClient.post('/tools', tool);
    return transformTool(response.data);
  },

  updateTool: async (id: number, tool: Partial<Tool>) => {
    const response = await apiClient.patch(`/tools/${id}`, tool);
    return transformTool(response.data);
  },

  deleteTool: async (id: number) => {
    await apiClient.delete(`/tools/${id}`);
  },
};
```

---

## 🎨 Design System Architecture

### Design Tokens

```typescript
// config/tokens.ts
export const tokens = {
  colors: {
    // Gradients
    'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    
    // Status colors
    'status-active': '#10b981',
    'status-expiring': '#f59e0b',
    'status-unused': '#ef4444',
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
  },
  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
};
```

### Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom color system
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: 'hsl(var(--surface))',
        'surface-hover': 'hsl(var(--surface-hover))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      },
    },
  },
};
```

---

## 📱 Responsive Architecture

### Breakpoint Strategy

```typescript
// config/breakpoints.ts
export const breakpoints = {
  mobile: '640px',   // < 640px
  tablet: '768px',   // 640px - 1024px
  desktop: '1024px', // > 1024px
  wide: '1280px',    // > 1280px
};

// Usage with Tailwind
// sm:   640px
// md:   768px
// lg:   1024px
// xl:   1280px
// 2xl:  1536px
```

### Responsive Patterns

```typescript
// Mobile-first approach
<div className="
  grid grid-cols-1        // Mobile: 1 column
  sm:grid-cols-2          // Tablet: 2 columns
  lg:grid-cols-4          // Desktop: 4 columns
  gap-4                   // Consistent gap
">
  {kpis.map((kpi) => <KPICard key={kpi.id} {...kpi} />)}
</div>
```

---

## 🔄 Navigation Architecture

### Routing Structure

```typescript
// router/index.tsx
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'tools',
        element: <Tools />,
      },
      {
        path: 'tools/:id',
        element: <ToolDetails />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
```

### Layout Hierarchy

```
MainLayout (Header, Container)
  ├── Dashboard Page
  ├── Tools Page
  │   └── ToolDetails (Modal or Route)
  ├── Analytics Page
  └── Settings Page
```

---

## 🧪 Testing Architecture

### Testing Pyramid

```
         ┌─────────────┐
         │   E2E Tests │  (10%)
         │  Playwright │
         └─────────────┘
       ┌─────────────────┐
       │Integration Tests│  (20%)
       │  React Testing  │
       │     Library     │
       └─────────────────┘
    ┌────────────────────────┐
    │     Unit Tests         │  (70%)
    │  Vitest + Testing Lib  │
    └────────────────────────┘
```

### Test Structure

```
src/
├── components/
│   └── ui/
│       └── Button/
│           ├── Button.tsx
│           └── Button.test.tsx     # Co-located tests
├── hooks/
│   └── useTools/
│       ├── useTools.ts
│       └── useTools.test.ts
└── __tests__/
    ├── integration/
    │   └── dashboard.test.tsx
    └── e2e/
        └── user-flow.spec.ts
```

---

## 🚀 Performance Architecture

### Optimization Strategies

1. **Code Splitting**: Dynamic imports for routes
2. **Lazy Loading**: Components loaded on demand
3. **Memoization**: React.memo, useMemo, useCallback
4. **Virtual Scrolling**: For large lists
5. **Image Optimization**: WebP format, lazy loading
6. **Bundle Optimization**: Tree shaking, minification

### Build Configuration

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@/components/ui'],
          charts: ['recharts'],
        },
      },
    },
  },
});
```

---

## 📊 Data Flow Diagram

```
User Action (Click, Input)
        ↓
Component Event Handler
        ↓
Custom Hook / Service
        ↓
API Request (TanStack Query)
        ↓
Backend (Mock JSON Server)
        ↓
Response Transformation
        ↓
Cache Update (TanStack Query)
        ↓
Component Re-render
        ↓
UI Update
```

---

## 🔒 Security Considerations

- **Input Validation**: All user inputs are validated
- **XSS Prevention**: React's built-in protection + DOMPurify for HTML
- **CSRF Protection**: Token-based authentication
- **Secure API Communication**: HTTPS only in production
- **Environment Variables**: Sensitive data in .env files

---

## 🔮 Future Architecture Enhancements

1. **Micro-frontends**: Separate apps per feature
2. **GraphQL**: Replace REST API for better data fetching
3. **WebSockets**: Real-time updates
4. **Service Workers**: Offline support
5. **SSR/SSG**: Next.js for better SEO and performance
6. **Monorepo**: Nx or Turborepo for multi-app management

---

## 📚 References

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.pmnd.rs/)
