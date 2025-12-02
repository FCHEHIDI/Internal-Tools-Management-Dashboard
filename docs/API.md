# API Documentation

## 🌐 API Overview

Base URL: `https://tt-jsonserver-01.alt-tools.tech`

The Internal Tools Management Dashboard uses a JSON Server mock API for development and testing. This document provides complete documentation of all available endpoints and data structures.

---

## 📋 Table of Contents

- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Departments](#departments)
  - [Users](#users)
  - [Tools](#tools)
  - [User-Tools Relationships](#user-tools-relationships)
  - [Analytics](#analytics)
- [Filtering & Searching](#filtering--searching)
- [Sorting](#sorting)
- [Pagination](#pagination)
- [Error Handling](#error-handling)
- [Data Models](#data-models)

---

## 🔐 Authentication

Currently, the API is **publicly accessible** for development purposes. In production, implement:

```typescript
// Authorization header
headers: {
  'Authorization': 'Bearer <token>'
}
```

---

## 📡 Endpoints

### Departments

#### Get All Departments
```http
GET /departments
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Engineering",
    "description": "Software development and infrastructure",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
]
```

#### Get Single Department
```http
GET /departments/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "Engineering",
  "description": "Software development and infrastructure",
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

---

### Users

#### Get All Users
```http
GET /users
```

**Query Parameters:**
- `active` (boolean): Filter by active status
- `department_id` (number): Filter by department
- `name_like` (string): Search by name
- `_page` (number): Page number (default: 1)
- `_limit` (number): Items per page (default: 10)

**Examples:**
```http
GET /users?active=true
GET /users?department_id=1
GET /users?name_like=John
GET /users?_page=1&_limit=10
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@techcorp.com",
    "department_id": 1,
    "role": "Senior Developer",
    "active": true,
    "joined_at": "2023-06-15"
  }
]
```

#### Get Single User
```http
GET /users/:id
```

#### Get User with Department
```http
GET /users/:id?_embed=department
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@techcorp.com",
  "department_id": 1,
  "department": {
    "id": 1,
    "name": "Engineering"
  },
  "role": "Senior Developer",
  "active": true,
  "joined_at": "2023-06-15"
}
```

---

### Tools

#### Get All Tools
```http
GET /tools
```

**Query Parameters:**
- `status` (string): Filter by status (active, unused, expiring)
- `owner_department` (string): Filter by department name
- `category` (string): Filter by category
- `name_like` (string): Search by tool name
- `_sort` (string): Sort field
- `_order` (string): Sort order (asc, desc)
- `_page` (number): Page number
- `_limit` (number): Items per page

**Examples:**
```http
# Get active tools
GET /tools?status=active

# Get tools by department
GET /tools?owner_department=Engineering

# Search tools
GET /tools?name_like=Slack

# Sort by cost (descending)
GET /tools?_sort=monthly_cost&_order=desc

# Get recent tools (last 8 updated)
GET /tools?_sort=updated_at&_order=desc&_limit=8

# Paginated results
GET /tools?_page=1&_limit=10
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Slack",
    "description": "Team communication and collaboration platform",
    "vendor": "Slack Technologies",
    "category": "Communication",
    "monthly_cost": 1250,
    "previous_month_cost": 1180,
    "owner_department": "Engineering",
    "status": "active",
    "website_url": "https://slack.com",
    "active_users_count": 42,
    "icon_url": "https://cdn.example.com/slack-icon.png",
    "created_at": "2023-01-10T08:00:00Z",
    "updated_at": "2024-11-30T15:30:00Z"
  }
]
```

#### Get Single Tool
```http
GET /tools/:id
```

#### Create Tool
```http
POST /tools
Content-Type: application/json

{
  "name": "New Tool",
  "description": "Tool description",
  "vendor": "Vendor Name",
  "category": "Development",
  "monthly_cost": 500,
  "previous_month_cost": 500,
  "owner_department": "Engineering",
  "status": "active",
  "website_url": "https://example.com",
  "active_users_count": 10,
  "icon_url": "https://cdn.example.com/icon.png"
}
```

#### Update Tool
```http
PATCH /tools/:id
Content-Type: application/json

{
  "monthly_cost": 600,
  "active_users_count": 12
}
```

#### Delete Tool
```http
DELETE /tools/:id
```

---

### User-Tools Relationships

#### Get All User-Tool Relationships
```http
GET /user_tools
```

**Response:**
```json
[
  {
    "user_id": 1,
    "tool_id": 1,
    "usage_frequency": "daily",
    "last_used": "2024-12-01T14:30:00Z",
    "proficiency_level": "expert"
  }
]
```

#### Get Tools for a User
```http
GET /users/:userId/user_tools
```

#### Get Users for a Tool
```http
GET /tools/:toolId/user_tools
```

#### Create User-Tool Relationship
```http
POST /user_tools
Content-Type: application/json

{
  "user_id": 1,
  "tool_id": 5,
  "usage_frequency": "weekly",
  "last_used": "2024-12-01T10:00:00Z",
  "proficiency_level": "intermediate"
}
```

---

### Analytics

#### Get Analytics Data
```http
GET /analytics
```

**Response:**
```json
{
  "budget_overview": {
    "monthly_limit": 30000,
    "current_month_total": 28750,
    "previous_month_total": 25670,
    "budget_utilization": "95.8%",
    "trend_percentage": "+12.0"
  },
  "kpi_trends": {
    "budget_change": "+12%",
    "tools_change": "+8",
    "departments_change": "+2",
    "cost_per_user_change": "+€10"
  },
  "cost_analytics": {
    "cost_per_user": 156,
    "previous_cost_per_user": 146,
    "active_users": 56,
    "total_users": 66
  },
  "department_breakdown": [
    {
      "department": "Engineering",
      "total_cost": 12500,
      "tool_count": 15,
      "user_count": 25
    }
  ],
  "tool_usage_stats": [
    {
      "tool_id": 1,
      "tool_name": "Slack",
      "total_users": 42,
      "daily_users": 38,
      "adoption_rate": 90.5
    }
  ]
}
```

---

## 🔍 Filtering & Searching

### Full-Text Search

Use `_like` suffix for partial matching:

```http
# Search tools by name
GET /tools?name_like=Slack

# Search users by name
GET /users?name_like=John

# Search by email
GET /users?email_like=@techcorp.com
```

### Exact Match Filtering

```http
# Filter by status
GET /tools?status=active

# Filter by department
GET /users?department_id=1

# Multiple filters
GET /tools?status=active&owner_department=Engineering
```

### Range Filtering

```http
# Tools with cost greater than 1000
GET /tools?monthly_cost_gte=1000

# Tools with cost less than 500
GET /tools?monthly_cost_lte=500

# Tools between 500 and 1000
GET /tools?monthly_cost_gte=500&monthly_cost_lte=1000
```

### Operators

- `_gte` - Greater than or equal
- `_lte` - Less than or equal
- `_ne` - Not equal
- `_like` - Partial match

---

## 📊 Sorting

### Single Field Sort

```http
# Sort by name (ascending)
GET /tools?_sort=name&_order=asc

# Sort by cost (descending)
GET /tools?_sort=monthly_cost&_order=desc

# Sort by date (newest first)
GET /tools?_sort=updated_at&_order=desc
```

### Multiple Field Sort

```http
# Sort by department, then by cost
GET /tools?_sort=owner_department,monthly_cost&_order=asc,desc
```

---

## 📄 Pagination

### Basic Pagination

```http
# Page 1, 10 items per page
GET /tools?_page=1&_limit=10

# Page 2, 20 items per page
GET /tools?_page=2&_limit=20
```

### Response Headers

The API returns pagination information in headers:

```http
X-Total-Count: 147
Link: <https://api.example.com/tools?_page=1&_limit=10>; rel="first",
      <https://api.example.com/tools?_page=2&_limit=10>; rel="next",
      <https://api.example.com/tools?_page=15&_limit=10>; rel="last"
```

### Calculate Total Pages

```typescript
const totalCount = parseInt(response.headers['x-total-count']);
const limit = 10;
const totalPages = Math.ceil(totalCount / limit);
```

---

## ⚠️ Error Handling

### Error Response Format

```json
{
  "error": "Resource not found",
  "message": "Tool with id 999 does not exist",
  "statusCode": 404
}
```

### HTTP Status Codes

- `200 OK` - Successful GET request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

### Error Handling Example

```typescript
try {
  const response = await fetch('https://tt-jsonserver-01.alt-tools.tech/tools/999');
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Tool not found');
    }
    throw new Error('Failed to fetch tool');
  }
  
  const tool = await response.json();
  return tool;
} catch (error) {
  console.error('Error fetching tool:', error);
  throw error;
}
```

---

## 📊 Data Models

### Department Model

```typescript
interface Department {
  id: number;
  name: string;
  description: string;
  created_at: string;  // ISO 8601 date
  updated_at: string;  // ISO 8601 date
}
```

### User Model

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  department_id: number;
  role: string;
  active: boolean;
  joined_at: string;   // YYYY-MM-DD
}
```

### Tool Model

```typescript
interface Tool {
  id: number;
  name: string;
  description: string;
  vendor: string;
  category: string;
  monthly_cost: number;
  previous_month_cost: number;
  owner_department: string;
  status: 'active' | 'unused' | 'expiring';
  website_url: string;
  active_users_count: number;
  icon_url: string;
  created_at: string;  // ISO 8601 date
  updated_at: string;  // ISO 8601 date
}
```

### UserTool Model

```typescript
interface UserTool {
  user_id: number;
  tool_id: number;
  usage_frequency: 'daily' | 'weekly' | 'monthly' | 'rarely';
  last_used: string;   // ISO 8601 date
  proficiency_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}
```

### Analytics Model

```typescript
interface Analytics {
  budget_overview: {
    monthly_limit: number;
    current_month_total: number;
    previous_month_total: number;
    budget_utilization: string;
    trend_percentage: string;
  };
  kpi_trends: {
    budget_change: string;
    tools_change: string;
    departments_change: string;
    cost_per_user_change: string;
  };
  cost_analytics: {
    cost_per_user: number;
    previous_cost_per_user: number;
    active_users: number;
    total_users: number;
  };
}
```

---

## 🚀 Usage Examples

### Fetch Recent Tools (Dashboard)

```typescript
async function getRecentTools() {
  const response = await fetch(
    'https://tt-jsonserver-01.alt-tools.tech/tools?_sort=updated_at&_order=desc&_limit=8'
  );
  return response.json();
}
```

### Filter Tools by Status (Tools Page)

```typescript
async function getToolsByStatus(status: string) {
  const response = await fetch(
    `https://tt-jsonserver-01.alt-tools.tech/tools?status=${status}`
  );
  return response.json();
}
```

### Search Tools (Tools Page)

```typescript
async function searchTools(query: string) {
  const response = await fetch(
    `https://tt-jsonserver-01.alt-tools.tech/tools?name_like=${encodeURIComponent(query)}`
  );
  return response.json();
}
```

### Get Dashboard KPIs

```typescript
async function getDashboardKPIs() {
  const [tools, analytics, users] = await Promise.all([
    fetch('https://tt-jsonserver-01.alt-tools.tech/tools').then(r => r.json()),
    fetch('https://tt-jsonserver-01.alt-tools.tech/analytics').then(r => r.json()),
    fetch('https://tt-jsonserver-01.alt-tools.tech/users').then(r => r.json()),
  ]);

  return {
    totalTools: tools.length,
    activeTools: tools.filter(t => t.status === 'active').length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.active).length,
    budgetData: analytics.budget_overview,
  };
}
```

### Add New Tool

```typescript
async function addTool(toolData: Partial<Tool>) {
  const response = await fetch(
    'https://tt-jsonserver-01.alt-tools.tech/tools',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...toolData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to add tool');
  }

  return response.json();
}
```

---

## 🔄 Advanced Queries

### Complex Filtering Example

```typescript
// Get active tools from Engineering department with cost > 1000
const params = new URLSearchParams({
  status: 'active',
  owner_department: 'Engineering',
  monthly_cost_gte: '1000',
  _sort: 'monthly_cost',
  _order: 'desc',
});

const response = await fetch(
  `https://tt-jsonserver-01.alt-tools.tech/tools?${params.toString()}`
);
```

### Relational Data

```typescript
// Get user with their department and tools
async function getUserComplete(userId: number) {
  const [user, userTools] = await Promise.all([
    fetch(`https://tt-jsonserver-01.alt-tools.tech/users/${userId}?_embed=department`)
      .then(r => r.json()),
    fetch(`https://tt-jsonserver-01.alt-tools.tech/user_tools?user_id=${userId}`)
      .then(r => r.json()),
  ]);

  // Get tool details for each user_tool
  const tools = await Promise.all(
    userTools.map(ut =>
      fetch(`https://tt-jsonserver-01.alt-tools.tech/tools/${ut.tool_id}`)
        .then(r => r.json())
    )
  );

  return {
    ...user,
    tools: tools.map((tool, i) => ({
      ...tool,
      usage: userTools[i],
    })),
  };
}
```

---

## 🧪 Testing the API

### Using cURL

```bash
# Get all tools
curl https://tt-jsonserver-01.alt-tools.tech/tools

# Get active tools
curl "https://tt-jsonserver-01.alt-tools.tech/tools?status=active"

# Add new tool
curl -X POST https://tt-jsonserver-01.alt-tools.tech/tools \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Tool","status":"active"}'
```

### Using Postman

Import this collection URL:
```
https://tt-jsonserver-01.alt-tools.tech/
```

---

## 📝 Notes

- All dates are in ISO 8601 format
- Pagination headers are always included in responses
- The API supports CORS for browser-based requests
- Rate limiting: Not implemented in mock server
- Mock data is reset daily

---

## 🔗 Resources

- [JSON Server Documentation](https://github.com/typicode/json-server)
- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
