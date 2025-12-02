# Mock API Infrastructure

This directory contains the configuration and setup for the mock JSON Server API used during development.

## 📋 Overview

The mock API simulates a real backend server for the Internal Tools Management Dashboard. It provides:
- RESTful endpoints for all data entities
- Filtering, sorting, and pagination
- CRUD operations
- Relational data queries

## 🚀 Quick Start

### Using the Hosted Mock Server

The application is pre-configured to use the hosted mock server:

```
https://tt-jsonserver-01.alt-tools.tech
```

No additional setup required!

### Running Locally (Optional)

If you want to run the mock server locally:

```bash
# Install JSON Server globally
npm install -g json-server

# Start the server
json-server --watch db.json --port 3001
```

Then update your `.env` file:

```env
VITE_API_URL=http://localhost:3001
```

## 📊 Data Structure

### Database Schema

The `db.json` file contains the following collections:

- **departments** (5 entries) - Department information
- **users** (66 entries) - User accounts
- **tools** (24 entries) - SaaS tools catalog
- **user_tools** (150+ entries) - User-tool relationships
- **analytics** (1 entry) - Aggregated analytics data

### Sample Data

```json
{
  "departments": [...],
  "users": [...],
  "tools": [...],
  "user_tools": [...],
  "analytics": {...}
}
```

## 🔧 Configuration

### CORS Settings

The hosted server allows all origins for development:

```javascript
// json-server --watch db.json --host 0.0.0.0 --port 3000
```

### Custom Routes (Optional)

Create a `routes.json` file for custom URL mappings:

```json
{
  "/api/*": "/$1",
  "/dashboard/kpis": "/analytics",
  "/dashboard/recent-tools": "/tools?_sort=updated_at&_order=desc&_limit=8"
}
```

Run with custom routes:

```bash
json-server --watch db.json --routes routes.json
```

## 📚 API Documentation

For complete API documentation, see [API.md](../docs/API.md)

### Common Endpoints

```bash
# Get all tools
GET /tools

# Filter tools by status
GET /tools?status=active

# Search tools
GET /tools?name_like=Slack

# Sort and paginate
GET /tools?_sort=monthly_cost&_order=desc&_page=1&_limit=10

# Get analytics
GET /analytics
```

## 🧪 Testing Data

### Resetting Data

If you're running locally and want to reset the database:

```bash
# Backup current data
cp db.json db.backup.json

# Restore original data
cp db.original.json db.json

# Restart server
json-server --watch db.json --port 3001
```

### Seeding Additional Data

Add new entries directly to `db.json`:

```json
{
  "tools": [
    {
      "id": 25,
      "name": "New Tool",
      "status": "active",
      ...
    }
  ]
}
```

## 🔐 Authentication (Future)

The current mock server doesn't require authentication. For production:

1. Implement JWT authentication
2. Add middleware for token validation
3. Update API client with auth headers

Example middleware:

```javascript
// auth-middleware.js
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Validate token
  next();
};
```

## 📈 Performance Considerations

- The hosted server handles ~100 req/s
- Response time: < 100ms for simple queries
- Data is cached in-memory
- Pagination recommended for large datasets

## 🐛 Troubleshooting

### Server Not Responding

```bash
# Check if server is running
curl https://tt-jsonserver-01.alt-tools.tech/tools

# Expected: JSON array of tools
```

### CORS Errors

Ensure your API client allows the server origin:

```typescript
// api/client.ts
const apiClient = axios.create({
  baseURL: 'https://tt-jsonserver-01.alt-tools.tech',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Data Not Updating

The hosted server data resets daily. For persistent data:
1. Run a local JSON Server
2. Or use a real backend (Firebase, Supabase, etc.)

## 🔗 Alternatives to JSON Server

For more advanced features, consider:

- **MSW (Mock Service Worker)** - Browser-level mocking
- **Mirage JS** - In-memory API mocking
- **Firebase** - Real backend with free tier
- **Supabase** - PostgreSQL backend
- **Strapi** - Headless CMS

## 📝 Notes

- The mock server is for **development only**
- Don't use in production
- Data is **not persistent** on the hosted server
- Rate limiting: Not implemented

---

For questions or issues, see the main [README.md](../README.md)
