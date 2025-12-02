# Contributing to Internal Tools Management Dashboard

First off, thank you for considering contributing to this project! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)

---

## 📜 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before contributing.

---

## 🤔 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (browser, OS, implementation version)

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide detailed description** of the proposed feature
- **Explain why this enhancement would be useful**
- **Include mockups or examples** if applicable

### 🔧 Code Contributions

1. **Fork the repository**
2. **Create a feature branch** from the appropriate implementation branch
3. **Make your changes** following our coding standards
4. **Test thoroughly**
5. **Submit a pull request**

---

## 💻 Development Setup

### React + Vite Implementation

```bash
# Checkout the React branch
git checkout feature/react-vite

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

### Blazor Implementation

```bash
# Checkout the Blazor branch
git checkout feature/blazor

# Restore dependencies
dotnet restore

# Run development server
dotnet run

# Run tests
dotnet test

# Build for production
dotnet publish -c Release
```

---

## 📝 Coding Standards

### General Guidelines

- **Write clean, readable code** with meaningful variable names
- **Comment complex logic** but prefer self-documenting code
- **Follow DRY principles** (Don't Repeat Yourself)
- **Keep functions small** and focused on single responsibility
- **Write tests** for new features and bug fixes

### React + Vite Standards

#### File Structure
```typescript
// Component structure
components/
├── ui/                    // Base UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── Card/
├── features/              // Feature-specific components
└── layouts/               // Layout components
```

#### TypeScript
- Use **TypeScript** for all new code
- Define **interfaces** for all props and data structures
- Avoid `any` type; use `unknown` if type is truly unknown
- Use **const assertions** where appropriate

```typescript
// Good
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
  children: React.ReactNode;
}

// Bad
interface ButtonProps {
  variant: any;
  onClick: Function;
  children: any;
}
```

#### React Components
- Use **functional components** with hooks
- Use **custom hooks** for reusable logic
- Implement **proper error boundaries**
- Follow **React best practices** for performance

```typescript
// Good - Functional component with TypeScript
export const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  return (
    <button 
      className={cn('btn', `btn-${variant}`)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Bad - Class component
export class Button extends React.Component {
  render() {
    return <button>...</button>;
  }
}
```

#### Styling with Tailwind
- Use **Tailwind utility classes** primarily
- Create **custom utilities** in `tailwind.config.js` for repeated patterns
- Use **CSS modules** only for complex animations
- Follow **design system tokens**

```typescript
// Good - Using design system
<div className="bg-gradient-primary rounded-lg p-6 shadow-card">

// Bad - Arbitrary values everywhere
<div className="bg-[#ff0000] rounded-[12px] p-[24px]">
```

### Blazor Standards

#### File Structure
```csharp
// Component structure
Components/
├── UI/                    // Base UI components
│   ├── Button/
│   │   ├── Button.razor
│   │   ├── Button.razor.cs
│   │   └── Button.razor.css
│   └── Card/
├── Features/              // Feature-specific components
└── Layouts/               // Layout components
```

#### C# Conventions
- Follow **Microsoft C# coding conventions**
- Use **PascalCase** for public members
- Use **camelCase** for private fields with `_` prefix
- Implement **proper async/await** patterns

```csharp
// Good
public class ToolService
{
    private readonly HttpClient _httpClient;
    
    public async Task<List<Tool>> GetToolsAsync()
    {
        // Implementation
    }
}

// Bad
public class toolservice
{
    public HttpClient httpclient;
    
    public List<Tool> GetTools()
    {
        // Synchronous call
    }
}
```

#### Razor Components
- Use **code-behind files** for complex logic
- Keep **markup clean** and readable
- Implement **proper parameter validation**
- Use **@typeparam** for generic components

```razor
@* Good - Clean markup with code-behind *@
<div class="@CssClass">
    @ChildContent
</div>

@code {
    [Parameter] public string CssClass { get; set; } = "";
    [Parameter] public RenderFragment? ChildContent { get; set; }
}
```

---

## 📝 Commit Message Guidelines

We follow the **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
feat(dashboard): add budget progress bar component

- Implements visual budget tracking
- Adds percentage calculation logic
- Includes responsive design

Closes #123
```

```bash
fix(tools): resolve filter state persistence issue

The filter state was not persisting across page navigation.
This fix implements proper state management using Zustand.

Fixes #456
```

---

## 🔄 Pull Request Process

### Before Submitting

1. ✅ **Update documentation** if you changed APIs or features
2. ✅ **Add tests** for new functionality
3. ✅ **Ensure all tests pass** locally
4. ✅ **Run linting** and fix any issues
5. ✅ **Update CHANGELOG.md** with your changes
6. ✅ **Rebase on latest main/feature branch**

### PR Description Template

```markdown
## 📋 Description
Brief description of changes

## 🎯 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## 🧪 Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

## 📸 Screenshots (if applicable)
Before | After

## ✅ Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added and passing
```

### Review Process

1. **Automated checks** must pass (CI/CD, linting, tests)
2. **Code review** by at least one maintainer
3. **Design review** for UI/UX changes
4. **Approval** required before merging
5. **Squash and merge** to keep history clean

### Branch Naming

```bash
# Feature branches
feature/dashboard-kpi-cards
feature/tools-advanced-filters

# Bug fix branches
fix/navigation-routing-issue
fix/chart-data-rendering

# Documentation branches
docs/api-endpoints
docs/design-system
```

---

## 🎨 Design System Adherence

### Colors
Always use design tokens from the design system:

```typescript
// React/Tailwind
className="bg-gradient-primary text-foreground"

// Blazor
<div class="bg-gradient-primary text-foreground">
```

### Components
Reuse existing components before creating new ones:

1. Check `components/ui/` for base components
2. Check `components/features/` for feature-specific components
3. Only create new components if truly needed

### Consistency
- **Day 1 (Dashboard)**: Establish design patterns
- **Day 2 (Tools)**: Reuse 100% of Day 1 components
- **Day 3 (Analytics)**: Extend without creating new styles

---

## 🧪 Testing Requirements

### Unit Tests
- **Coverage**: Minimum 70% for new code
- **Component tests**: All UI components
- **Hook tests**: All custom hooks
- **Utility tests**: All helper functions

### Integration Tests
- **User flows**: Complete user journeys
- **API integration**: Mock server interactions
- **Navigation**: Cross-page flows

### E2E Tests
- **Critical paths**: Dashboard → Tools → Analytics
- **CRUD operations**: Add, edit, delete tools
- **Responsive**: Mobile and desktop views

---

## 📞 Questions?

If you have questions:
- 💬 Open a **GitHub Discussion**
- 📧 Email: fareschehidi7@gmail.com
- 🐛 Create an **Issue** for bugs

---

Thank you for contributing! 🙌
