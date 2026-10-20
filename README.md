# Task Manager REST API

A RESTful API for task management with JWT authentication, role-based authorization, and per-resource ownership checks. Built with Node.js, Express, Sequelize, and MySQL using a modular MVC + Service layer architecture.

## Features

- **Authentication**: JWT-based access & refresh tokens stored in httpOnly cookies
- **Authorization**: Role-based access control (user / admin) and per-resource ownership checks
- **Session validation**: Every protected request re-fetches the user from the database to ensure the account still exists
- **Users**: Register, login, refresh, logout, profile update, delete, promote to admin
- **Categories**: Full CRUD with user ownership enforcement
- **Tasks**: Full CRUD with creator/implementor ownership, status, priority, and due dates
- **Security**: Password hashing with bcrypt, JWT middleware on all protected routes
- **CORS**: Configurable allowed-origins list via a dedicated options module
- **Error Handling**: Centralized global error handler for validation, unique constraints, and foreign-key errors
- **Architecture**: Modular structure (modules/ + common/ + utils/) with async wrapper and service layer

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (ES Modules) |
| Framework | Express.js 5 |
| ORM | Sequelize |
| Database | MySQL |
| Auth | JSON Web Tokens (JWT), bcrypt |
| Middleware | cookie-parser, cors |
| Config | dotenv (for JWT secrets) |

## Project Structure

    ├── index.js
    ├── package.json
    └── src/
        ├── app.js
        ├── common/
        │   ├── config/
        │   │   ├── allowedOrigins.js
        │   │   ├── association.js
        │   │   ├── corsOptions.js
        │   │   └── database.js
        │   └── middleware/
        │       ├── asycHandler.js
        │       ├── globalErrorHandeller.js
        │       └── verifyJWT.js
        ├── modules/
        │   ├── users/
        │   │   ├── user.controller.js
        │   │   ├── user.model.js
        │   │   └── user.service.js
        │   ├── categories/
        │   │   ├── category.controller.js
        │   │   ├── category.model.js
        │   │   └── category.service.js
        │   └── tasks/
        │       ├── task.controller.js
        │       ├── task.model.js
        │       └── task.service.js
        └── utils/
            ├── allowedTo.js
            └── appError.js

## API Endpoints

### Users — /user

| Method | Endpoint | Auth | Access | Description |
|--------|----------|------|--------|-------------|
| POST | /register | No | Public | Register a new user |
| POST | /login | No | Public | Login and receive access token |
| POST | /refresh | Cookie | Public | Refresh access token |
| POST | /logout | Cookie | Public | Clear refresh token cookie |
| GET | /getuserbyid/:id | JWT | Any | Get user by ID |
| PATCH | /updateuser | JWT | Owner | Update own profile |
| DELETE | /delete | JWT | Owner | Delete own account |
| GET | /getallusers | JWT | Admin | List all users |
| POST | /makeadmin/:id | JWT | Admin | Promote user to admin |

### Categories — /category

| Method | Endpoint | Auth | Access | Description |
|--------|----------|------|--------|-------------|
| GET | /all | JWT | Owner/Admin | List categories |
| GET | /getbyid/:id | JWT | Owner/Admin | Get category by ID |
| POST | /create | JWT | Any | Create category |
| PATCH | /update/:id | JWT | Owner/Admin | Update category |
| DELETE | /delete/:id | JWT | Owner/Admin | Delete category |

### Tasks — /task

| Method | Endpoint | Auth | Access | Description |
|--------|----------|------|--------|-------------|
| GET | /getall | JWT | Owner/Admin | List tasks (creator or implementor) |
| GET | /getbyid/:id | JWT | Owner/Admin | Get task by ID |
| POST | /create | JWT | Any | Create task |
| PATCH | /update/:id | JWT | Creator/Admin | Update task |
| DELETE | /delete/:id | JWT | Creator/Admin | Delete task |

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8+

### Installation

    git clone https://github.com/HusseinMhamed/To-Do-List-Server.git
    cd To-Do-List-Server
    npm install

### Configuration

**JWT secrets** are read from a `.env` file in the project root (see `.env.example`):

    PORT=3000
    JWT_ACCESS_SECRET=your_access_secret
    JWT_REFRESH_SECRET=your_refresh_secret

**Database connection** is configured in `src/common/config/database.js`. Update the following fields to match your MySQL setup:

    host: 'localhost'
    username: 'root'
    password: ''
    port: 3307
    database: 'todo_list'

**Allowed CORS origins** are defined in `src/common/config/allowedOrigins.js`. By default, only `http://localhost:5173` is allowed — update this list to match your frontend URL.

### Database Setup

Create the database in MySQL:

    CREATE DATABASE todo_list;

Tables are auto-created by Sequelize on first run via sequelize.sync().

### Run

    node index.js

The server will start on http://localhost:3000.

## Usage Example

### 1. Register

    curl -X POST http://localhost:3000/user/register \
      -H "Content-Type: application/json" \
      -d '{"name":"Hussein","email":"hussein@test.com","password":"123456"}'

Response:

    {
      "accessToken": "eyJhbGciOi...",
      "email": "hussein@test.com",
      "name": "Hussein"
    }

### 2. Create a Task (authenticated)

    curl -X POST http://localhost:3000/task/create \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer <accessToken>" \
      -d '{"title":"Finish CV","status":"pending","priority":"high"}'

## Security Notes

- Passwords are hashed with bcrypt (salt rounds = 10)
- Refresh tokens stored in httpOnly cookies to mitigate XSS
- Access tokens expire in 15 minutes; refresh tokens in 7 days
- All protected routes require a valid Bearer token
- Every protected request re-verifies the user still exists in the database
- Ownership checks prevent users from accessing other users' resources
- CORS restricted to an explicit allow-list of origins

## Author

**Hussein Mohamed**
- GitHub: https://github.com/HusseinMhamed
- Email: husseinmohamed1999hm@gmail.com