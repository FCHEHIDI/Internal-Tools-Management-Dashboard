# 🚀 Internal Tools Management Dashboard

> A comprehensive SaaS tools monitoring and management platform for IT administrators

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev/)
[![Blazor](https://img.shields.io/badge/Blazor-.NET_8-512BD4)](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor)

## 📋 Overview

**Internal Tools Management Dashboard** is a modern web application designed to help IT administrators monitor, manage, and analyze SaaS tools usage across their organization. Built with a focus on design consistency, responsive excellence, and data-driven insights.

### ✨ Key Features

- 📊 **Real-time Dashboard** - KPIs, budget tracking, and recent activity monitoring
- 🔧 **Tools Catalog** - Comprehensive management of all SaaS tools with advanced filtering
- 📈 **Analytics & Insights** - Cost analysis, usage metrics, and ROI calculations
- 🎨 **Modern Design System** - Dark/Light themes with gradient accents
- 📱 **Fully Responsive** - Optimized experience from mobile to desktop
- 🔄 **Cross-Platform** - Available in React and Blazor implementations

---

## 🏗️ Project Structure

This repository contains multiple implementations of the same application:

```
Internal-Tools-Management-Dashboard/
├── docs/                      # 📚 Documentation
│   ├── ARCHITECTURE.md        # System architecture
│   ├── DESIGN_SYSTEM.md       # Design guidelines
│   └── API.md                 # API documentation
├── infra/                     # 🏗️ Infrastructure
│   └── mock-api/              # Mock JSON server setup
├── .github/                   # 🔄 CI/CD workflows
│   └── workflows/
│       ├── react-ci.yml
│       └── blazor-ci.yml
├── README.md                  # This file
├── CONTRIBUTING.md            # Contribution guidelines
├── CODE_OF_CONDUCT.md         # Code of conduct
└── LICENSE                    # MIT License
```

### 🌿 Branch Strategy

- **`main`** - Documentation, architecture, and infrastructure only
- **`feature/react-vite`** - React + Vite implementation
- **`feature/blazor`** - C# Blazor (cross-device) implementation

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (for React implementation)
- **.NET 8 SDK** (for Blazor implementation)
- **Git** 2.30+

### Clone the Repository

```bash
git clone https://github.com/fareschehidi/internal-tools-management-dashboard.git
cd internal-tools-management-dashboard
```

### Choose Your Implementation

#### React + Vite
```bash
git checkout feature/react-vite
npm install
npm run dev
```

#### Blazor
```bash
git checkout feature/blazor
dotnet restore
dotnet run
```

---

## 🎨 Design Philosophy

### Modern, Professional Aesthetic
- **Inspiration**: Vercel, Linear, Figma dashboards
- **Color Palette**: Dark backgrounds with purple/blue/pink gradients
- **Typography**: Inter font family
- **Icons**: Lucide React / Heroicons

### Design System Principles
1. **Consistency First** - Reusable component library across all pages
2. **Responsive by Default** - Mobile-first approach
3. **Accessibility** - WCAG 2.1 AA compliant
4. **Performance** - Optimized loading and interactions

---

## 📊 Features Breakdown

### 🏠 Dashboard (Day 1)
- **KPI Cards** - Budget, Active Tools, Departments, Cost per User
- **Recent Tools Table** - Latest 8 updated tools with sorting/pagination
- **Status Badges** - Active, Expiring, Unused indicators
- **Budget Progress** - Visual budget utilization tracking

### 🔧 Tools Page (Day 2)
- **Complete Catalog** - All SaaS tools with detailed information
- **Advanced Filtering** - By department, status, cost range, category
- **CRUD Operations** - Add, edit, delete tools with validation
- **Bulk Actions** - Multi-select management
- **Search** - Multi-criteria tool search

### 📈 Analytics Page (Day 3)
- **Cost Analytics** - Monthly spend evolution, department breakdown
- **Usage Metrics** - Adoption rates, most/least used tools
- **Insights Dashboard** - Cost optimization alerts, ROI calculations
- **Interactive Charts** - Drill-down capabilities and export options
- **Cross-page Navigation** - Deep links between tools and analytics

---

## 🛠️ Tech Stack Comparison

| Feature | React + Vite | Blazor |
|---------|--------------|--------|
| **Language** | TypeScript | C# |
| **Styling** | Tailwind CSS | Tailwind CSS |
| **Routing** | React Router v6 | Blazor Router |
| **State Management** | Zustand + TanStack Query | Fluxor |
| **Charts** | Recharts | Blazor Charts |
| **Build Tool** | Vite | .NET CLI |
| **Deployment** | Vercel/Netlify | Azure Static Web Apps |

---

## 📚 Documentation

- [**Architecture Guide**](./docs/ARCHITECTURE.md) - System design and component structure
- [**Design System**](./docs/DESIGN_SYSTEM.md) - UI components and style guidelines
- [**API Documentation**](./docs/API.md) - Mock server endpoints and data structures
- [**Contributing Guide**](./CONTRIBUTING.md) - How to contribute to this project

---

## 🧪 Testing Strategy

### React Implementation
- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright
- **Coverage Target**: 80%+

### Blazor Implementation
- **Unit Tests**: xUnit + bUnit
- **Integration Tests**: Playwright for .NET
- **Coverage Target**: 80%+

---

## 🚀 Deployment

### React + Vite
```bash
npm run build
# Deploy to Vercel, Netlify, or any static host
```

### Blazor
```bash
dotnet publish -c Release
# Deploy to Azure Static Web Apps or IIS
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Fares Chehidi**
- Email: fareschehidi7@gmail.com
- GitHub: [@fareschehidi](https://github.com/fareschehidi)

---

## 🙏 Acknowledgments

- Design inspiration from Vercel, Linear, and Figma
- Mock API data structure based on real-world SaaS management needs
- Built as part of a 3-day frontend technical challenge

---

## 🔮 Roadmap

- [ ] User authentication and authorization
- [ ] Real-time collaboration features
- [ ] Advanced analytics with ML predictions
- [ ] Integration with actual SaaS APIs (Slack, GitHub, etc.)
- [ ] Multi-tenant support
- [ ] Mobile native apps (React Native / .NET MAUI)

---

## 📞 Support

For questions or support, please:
- Open an issue on GitHub
- Contact via email: fareschehidi7@gmail.com

---

<p align="center">Made with ❤️ by Fares Chehidi</p>
