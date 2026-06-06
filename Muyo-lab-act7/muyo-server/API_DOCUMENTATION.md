# Muyo API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Auth Endpoints

### Sign Up
**POST** `/auth/signup`

Creates a new user account.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "contact": "string (optional)",
  "age": "number (optional)",
  "gender": "Male | Female (optional)",
  "role": "Admin | Editor | Viewer (optional, default: Viewer)",
  "status": "Active | Inactive (optional, default: Active)"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "username": "string",
    "email": "string",
    "role": "string"
  },
  "token": "string"
}
```

---

### Sign In
**POST** `/auth/signin`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": "string"
  },
  "token": "string"
}
```

---

## 👥 User Endpoints

### Get All Users
**GET** `/users` (Admin only)

Retrieves all users.

**Response:**
```json
[
  {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "username": "string",
    "email": "string",
    "contact": "string",
    "age": "number",
    "gender": "string",
    "role": "string",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

---

### Get User by ID
**GET** `/users/:id`

Retrieves a specific user.

**Response:**
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "role": "string"
}
```

---

### Create User
**POST** `/users` (Admin only)

Creates a new user.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "contact": "string",
  "age": "number",
  "gender": "string",
  "role": "string",
  "status": "string"
}
```

---

### Update User
**PUT** `/users/:id`

Updates user profile (users can update their own, admins can update anyone).

**Request Body:**
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "contact": "string (optional)",
  "age": "number (optional)",
  "gender": "string (optional)",
  "status": "string (optional)"
}
```

---

### Delete User
**DELETE** `/users/:id` (Admin only)

Deletes a user.

---

## 📰 Article Endpoints

### Get All Public Articles
**GET** `/articles`

Retrieves all active articles (no authentication required).

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "title": "string",
    "content": ["string"],
    "image": "string",
    "status": "string",
    "author": {
      "firstName": "string",
      "lastName": "string",
      "username": "string"
    },
    "views": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

---

### Get Dashboard Articles
**GET** `/articles/dashboard/all`

Retrieves all articles (admin sees all).

**Response:** Same as above

---

### Get Article by ID
**GET** `/articles/:id`

Retrieves a specific article and increments view count.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "title": "string",
  "content": ["string"],
  "image": "string",
  "status": "string",
  "author": { ... },
  "views": "number",
  "createdAt": "date"
}
```

---

### Get Article by Name/Slug
**GET** `/articles/name/:name`

Retrieves article by its URL-friendly name.

---

### Create Article
**POST** `/articles`

Creates a new article.

**Request Body:**
```json
{
  "name": "string (unique, URL-friendly)",
  "title": "string",
  "content": ["string"] or "string",
  "image": "string (optional)",
  "status": "Active | Inactive (optional)"
}
```

---

### Update Article
**PUT** `/articles/:id`

Updates an article (author or admin only).

**Request Body:**
```json
{
  "name": "string (optional)",
  "title": "string (optional)",
  "content": ["string"] or "string (optional)",
  "image": "string (optional)",
  "status": "string (optional)"
}
```

---

### Delete Article
**DELETE** `/articles/:id`

Deletes an article (author or admin only).

---

## 📊 Dashboard Endpoints (Admin only)

### Get Overview Stats
**GET** `/dashboard/stats/overview`

Retrieves dashboard overview statistics.

**Response:**
```json
{
  "totalUsers": "number",
  "totalArticles": "number",
  "activeUsers": "number",
  "activeArticles": "number",
  "totalViews": "number"
}
```

---

### Get User Statistics
**GET** `/dashboard/stats/users`

Retrieves user breakdown statistics.

**Response:**
```json
{
  "byRole": [{ "_id": "string", "count": "number" }],
  "byStatus": [{ "_id": "string", "count": "number" }],
  "byGender": [{ "_id": "string", "count": "number" }]
}
```

---

### Get Article Statistics
**GET** `/dashboard/stats/articles`

Retrieves article statistics.

**Response:**
```json
{
  "byStatus": [{ "_id": "string", "count": "number" }],
  "topArticles": [{...}],
  "recentArticles": [{...}]
}
```

---

### Get Activity Reports
**GET** `/dashboard/reports/activity`

Retrieves activity reports.

**Response:**
```json
{
  "newUsers": "number",
  "newArticles": "number",
  "totalArticleViews": "number",
  "lastUpdated": "date"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "message": "Error description"
}
```

Common error codes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Example Usage

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Article
```bash
curl -X POST http://localhost:5000/api/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "my-first-article",
    "title": "My First Article",
    "content": ["This is the content"],
    "status": "Active"
  }'
```

### Get Dashboard Stats
```bash
curl -X GET http://localhost:5000/api/dashboard/stats/overview \
  -H "Authorization: Bearer <admin-token>"
```
