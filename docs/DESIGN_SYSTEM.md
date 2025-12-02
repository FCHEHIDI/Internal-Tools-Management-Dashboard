# Design System

## 🎨 Overview

The Internal Tools Management Dashboard design system provides a cohesive, modern aesthetic inspired by industry-leading products like Vercel, Linear, and Figma. This document defines all design tokens, components, and patterns to ensure consistency across all pages and implementations.

## 🌈 Color System

### Core Palette

#### Dark Theme (Primary)
```css
--background: 222 47% 11%;        /* #161820 - Main background */
--background-secondary: 222 47% 15%; /* #1E202E - Secondary bg */
--foreground: 210 40% 98%;        /* #F8FAFC - Primary text */
--foreground-secondary: 215 20% 65%; /* #94A3B8 - Secondary text */
--surface: 222 47% 15%;           /* #1E202E - Card surface */
--surface-hover: 222 47% 18%;     /* #252838 - Hover state */
--border: 217 19% 27%;            /* #3A3F5C - Borders */
```

#### Light Theme
```css
--background: 0 0% 100%;          /* #FFFFFF - Main background */
--background-secondary: 210 40% 98%; /* #F8FAFC - Secondary bg */
--foreground: 222 47% 11%;        /* #161820 - Primary text */
--foreground-secondary: 215 16% 47%; /* #64748B - Secondary text */
--surface: 0 0% 100%;             /* #FFFFFF - Card surface */
--surface-hover: 210 40% 96%;     /* #F1F5F9 - Hover state */
--border: 214 32% 91%;            /* #E2E8F0 - Borders */
```

### Status Colors

```css
/* Success / Active */
--status-active: 142 71% 45%;     /* #10B981 - Green */
--status-active-bg: 142 76% 36%;  /* #059669 - Darker green */

/* Warning / Expiring */
--status-expiring: 38 92% 50%;    /* #F59E0B - Amber */
--status-expiring-bg: 32 95% 44%; /* #D97706 - Darker amber */

/* Danger / Unused */
--status-unused: 0 72% 51%;       /* #EF4444 - Red */
--status-unused-bg: 0 74% 42%;    /* #DC2626 - Darker red */

/* Info */
--status-info: 217 91% 60%;       /* #3B82F6 - Blue */
--status-info-bg: 221 83% 53%;    /* #2563EB - Darker blue */
```

### Gradient System

```css
/* Primary - Purple to Blue */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Success - Green to Emerald */
background: linear-gradient(135deg, #10b981 0%, #059669 100%);

/* Warning - Orange to Amber */
background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);

/* Danger - Red to Pink */
background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);

/* Info - Blue to Indigo */
background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);

/* Neutral - Gray gradient */
background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
```

---

## 📝 Typography

### Font Family

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Why Inter?**
- Excellent readability at all sizes
- Designed for UI interfaces
- Complete character set with multiple weights

### Type Scale

```css
/* Display */
--text-display: 3.5rem;    /* 56px - Hero headings */
--line-height-display: 1.1;

/* H1 */
--text-h1: 2.25rem;        /* 36px - Page titles */
--line-height-h1: 1.2;

/* H2 */
--text-h2: 1.875rem;       /* 30px - Section headings */
--line-height-h2: 1.3;

/* H3 */
--text-h3: 1.5rem;         /* 24px - Subsection headings */
--line-height-h3: 1.4;

/* H4 */
--text-h4: 1.25rem;        /* 20px - Card titles */
--line-height-h4: 1.5;

/* Body Large */
--text-lg: 1.125rem;       /* 18px - Emphasized body */
--line-height-lg: 1.75;

/* Body */
--text-base: 1rem;         /* 16px - Default body */
--line-height-base: 1.5;

/* Body Small */
--text-sm: 0.875rem;       /* 14px - Secondary text */
--line-height-sm: 1.43;

/* Caption */
--text-xs: 0.75rem;        /* 12px - Captions, labels */
--line-height-xs: 1.33;
```

### Font Weights

```css
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Usage Guidelines

```tsx
// Page Title
<h1 className="text-h1 font-bold text-foreground">Dashboard</h1>

// Section Heading
<h2 className="text-h2 font-semibold text-foreground">Recent Tools</h2>

// Card Title
<h3 className="text-h4 font-medium text-foreground">Total Budget</h3>

// Body Text
<p className="text-base text-foreground-secondary">Description text...</p>

// Label
<span className="text-sm font-medium text-foreground-secondary">Status</span>
```

---

## 🧩 Component Library

### Button Component

#### Variants

```tsx
// Primary - Main actions
<Button variant="primary">Save Changes</Button>

// Secondary - Alternative actions
<Button variant="secondary">Cancel</Button>

// Danger - Destructive actions
<Button variant="danger">Delete Tool</Button>

// Ghost - Subtle actions
<Button variant="ghost">View More</Button>

// Link - Text-based actions
<Button variant="link">Learn More</Button>
```

#### Sizes

```tsx
<Button size="sm">Small</Button>     // h-9 px-3
<Button size="md">Medium</Button>    // h-10 px-4 (default)
<Button size="lg">Large</Button>     // h-11 px-8
```

#### States

```tsx
// Loading
<Button isLoading>Processing...</Button>

// Disabled
<Button disabled>Unavailable</Button>

// With Icon
<Button>
  <Icon name="plus" />
  Add Tool
</Button>
```

#### CSS Classes

```css
/* Base */
.btn {
  @apply inline-flex items-center justify-center;
  @apply rounded-lg font-medium transition-colors;
  @apply focus-visible:outline-none focus-visible:ring-2;
  @apply disabled:opacity-50 disabled:pointer-events-none;
}

/* Primary */
.btn-primary {
  @apply bg-gradient-primary text-white;
  @apply hover:opacity-90;
}

/* Secondary */
.btn-secondary {
  @apply bg-surface text-foreground border border-border;
  @apply hover:bg-surface-hover;
}

/* Danger */
.btn-danger {
  @apply bg-gradient-danger text-white;
  @apply hover:opacity-90;
}
```

---

### Card Component

#### Base Card

```tsx
<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Optional description</Card.Description>
  </Card.Header>
  <Card.Content>
    Content goes here
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

#### Card Variants

```tsx
// Default - Standard card
<Card variant="default">Content</Card>

// Gradient - With gradient background
<Card variant="gradient" gradient="primary">
  <CardContent>KPI content</CardContent>
</Card>

// Outline - Bordered card
<Card variant="outline">Content</Card>

// Flat - No shadow
<Card variant="flat">Content</Card>
```

#### CSS Classes

```css
/* Base Card */
.card {
  @apply bg-surface border border-border rounded-lg;
  @apply shadow-md hover:shadow-lg transition-shadow;
}

/* Card with Gradient */
.card-gradient-primary {
  @apply bg-gradient-primary text-white border-0;
}

/* Card Header */
.card-header {
  @apply p-6 pb-4;
}

/* Card Content */
.card-content {
  @apply p-6 pt-0;
}

/* Card Footer */
.card-footer {
  @apply p-6 pt-4 flex items-center gap-4;
}
```

---

### Badge Component

#### Status Badges

```tsx
// Active
<Badge variant="active">Active</Badge>

// Expiring
<Badge variant="expiring">Expiring</Badge>

// Unused
<Badge variant="unused">Unused</Badge>

// Info
<Badge variant="info">New</Badge>
```

#### Sizes

```tsx
<Badge size="sm">Small</Badge>    // px-2 py-0.5 text-xs
<Badge size="md">Medium</Badge>   // px-2.5 py-1 text-sm
<Badge size="lg">Large</Badge>    // px-3 py-1.5 text-base
```

#### CSS Classes

```css
/* Base Badge */
.badge {
  @apply inline-flex items-center rounded-full font-medium;
  @apply transition-colors;
}

/* Status Variants */
.badge-active {
  @apply bg-status-active/10 text-status-active;
  @apply border border-status-active/20;
}

.badge-expiring {
  @apply bg-status-expiring/10 text-status-expiring;
  @apply border border-status-expiring/20;
}

.badge-unused {
  @apply bg-status-unused/10 text-status-unused;
  @apply border border-status-unused/20;
}
```

---

### Input Component

```tsx
// Text Input
<Input type="text" placeholder="Search tools..." />

// With Label
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />

// With Error
<Input error="This field is required" />

// Disabled
<Input disabled />

// With Icon
<InputGroup>
  <InputIcon><SearchIcon /></InputIcon>
  <Input placeholder="Search..." />
</InputGroup>
```

#### CSS Classes

```css
.input {
  @apply w-full px-3 py-2 rounded-lg;
  @apply bg-surface border border-border;
  @apply text-foreground placeholder:text-foreground-secondary;
  @apply focus:outline-none focus:ring-2 focus:ring-primary;
  @apply transition-colors;
}

.input-error {
  @apply border-status-unused focus:ring-status-unused;
}
```

---

### Table Component

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Tool</TableHead>
      <TableHead>Department</TableHead>
      <TableHead>Users</TableHead>
      <TableHead>Cost</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {tools.map((tool) => (
      <TableRow key={tool.id}>
        <TableCell>{tool.name}</TableCell>
        <TableCell>{tool.department}</TableCell>
        <TableCell>{tool.users}</TableCell>
        <TableCell>${tool.cost}</TableCell>
        <TableCell>
          <Badge variant={tool.status}>{tool.status}</Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

#### CSS Classes

```css
.table {
  @apply w-full border-collapse;
}

.table-header {
  @apply border-b border-border;
}

.table-row {
  @apply border-b border-border;
  @apply hover:bg-surface-hover transition-colors;
}

.table-head {
  @apply px-4 py-3 text-left text-sm font-medium;
  @apply text-foreground-secondary;
}

.table-cell {
  @apply px-4 py-3 text-sm text-foreground;
}
```

---

## 🎭 Icons

### Icon System

**Library**: Lucide React

```bash
npm install lucide-react
```

### Icon Usage

```tsx
import { 
  LayoutDashboard, 
  Wrench, 
  BarChart3, 
  Settings 
} from 'lucide-react';

// Standard size (24px)
<LayoutDashboard className="w-6 h-6" />

// Small (16px)
<Settings className="w-4 h-4" />

// Large (32px)
<BarChart3 className="w-8 h-8" />

// With color
<Wrench className="w-6 h-6 text-primary" />
```

### Common Icons

```tsx
// Navigation
<LayoutDashboard />  // Dashboard
<Wrench />           // Tools
<BarChart3 />        // Analytics
<Settings />         // Settings

// Actions
<Plus />             // Add
<Edit />             // Edit
<Trash2 />           // Delete
<Search />           // Search
<Filter />           // Filter
<Download />         // Export

// Status
<CheckCircle />      // Success
<AlertCircle />      // Warning
<XCircle />          // Error
<Info />             // Info

// UI
<ChevronDown />      // Dropdown
<X />                // Close
<Menu />             // Hamburger
<MoreVertical />     // More options
```

---

## 📐 Spacing System

### Scale

```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
```

### Usage Guidelines

```tsx
// Component padding
<Card className="p-6">        // 24px padding
<Button className="px-4 py-2"> // 16px x 8px

// Layout gaps
<div className="space-y-6">   // 24px vertical gap
<div className="gap-4">        // 16px grid gap

// Margins
<h1 className="mb-8">          // 32px bottom margin
```

---

## 🎨 Shadows & Effects

### Shadow Scale

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### Blur Effects

```css
--blur-sm: blur(4px);
--blur-md: blur(8px);
--blur-lg: blur(16px);
--blur-xl: blur(24px);
```

### Usage

```tsx
// Cards
<Card className="shadow-md hover:shadow-lg">

// Modals
<Modal className="shadow-2xl backdrop-blur-sm">

// Dropdown
<Dropdown className="shadow-lg">
```

---

## 🔄 Animations

### Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Animations

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Scale In */
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

### Usage

```tsx
// Fade in page
<div className="animate-fadeIn">

// Slide up modal
<Modal className="animate-slideUp">

// Scale in tooltip
<Tooltip className="animate-scaleIn">
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First */
@media (min-width: 640px)  { /* sm - tablet */ }
@media (min-width: 768px)  { /* md - tablet landscape */ }
@media (min-width: 1024px) { /* lg - desktop */ }
@media (min-width: 1280px) { /* xl - wide desktop */ }
@media (min-width: 1536px) { /* 2xl - ultra-wide */ }
```

### Responsive Patterns

```tsx
// Grid responsive
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

// Hide/show
<div className="hidden lg:block">      // Show on desktop only
<div className="block lg:hidden">      // Show on mobile only

// Text size
<h1 className="text-2xl lg:text-4xl"> // Smaller on mobile

// Padding
<div className="p-4 lg:p-8">          // Less padding on mobile
```

---

## ✨ Best Practices

### Consistency Rules

1. **Use design tokens** - Never use arbitrary values
2. **Component reuse** - Extend existing components
3. **Mobile first** - Design for small screens first
4. **Accessibility** - WCAG 2.1 AA minimum
5. **Performance** - Optimize images and animations

### Do's

✅ Use semantic HTML
✅ Follow naming conventions
✅ Test in multiple browsers
✅ Support keyboard navigation
✅ Provide alt text for images

### Don'ts

❌ Don't use inline styles
❌ Don't create one-off components
❌ Don't ignore accessibility
❌ Don't use too many colors
❌ Don't break the grid system

---

## 🎯 Implementation Checklist

- [ ] Install Inter font
- [ ] Set up Tailwind with custom config
- [ ] Create base components (Button, Card, Badge, Input)
- [ ] Implement theme switcher (dark/light)
- [ ] Test responsive breakpoints
- [ ] Validate accessibility
- [ ] Document component variations
- [ ] Create Storybook stories (optional)

---

This design system ensures visual consistency across all implementations while maintaining flexibility for growth.
