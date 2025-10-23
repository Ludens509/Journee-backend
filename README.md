# Journee — Backend (Node + Express)

This repository contains the backend API for the Journee application — a minimal journaling/digital diary service. The backend provides authentication, post CRUD operations, and persistence via MongoDB.

## Table of contents

- [About](#about)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [API endpoints (summary)](#api-endpoints-summary)
- [Authentication](#authentication)
- [Development notes & security](#development-notes--security)
- [Contact](#contact)

## About

This service is implemented with Node.js and Express and uses Mongoose to connect to a MongoDB database. It issues JWTs at registration/login and protects routes with a middleware that verifies the token.

The backend was authored alongside a React + Vite frontend (see `Journee_frontend`). The frontend uses the backend API to store and manage user posts.

## Tech stack

- Node.js
- Express
- MongoDB (Mongoose)
- jsonwebtoken (JWT)
- bcryptjs (password hashing)
- express-validator
- dotenv
- CORS

Dependencies are listed in `package.json` and were recorded as:

- bcryptjs
- cors
- dotenv
- express
- express-validator
- jsonwebtoken
- mongoose

## Prerequisites

- Node.js (v16+ recommended)
- npm
- A running MongoDB instance (local or hosted)

## Getting started

1. Install dependencies

```bash
cd Journee_backend
npm install
```

2. Create a `.env` file in the backend folder and set required environment variables (see below).

3. Start the server in development (uses `nodemon` if you prefer):

```bash
npm run dev   # uses nodemon -> server.mjs
# or run the built server
npm start
```

By default the project reads a port value from environment (`VITE_PORT` is used in this project). If not set, update your `.env` to include the port you want the server to listen on.

## Environment variables

Create a `.env` file with at least the following values:

```env
MONGO_URI=mongodb://localhost:27017/journee
jwtSecret=your_jwt_secret_here
VITE_PORT=3000
```

Notes:
- `MONGO_URI` — your MongoDB connection string
- `jwtSecret` — secret used to sign and verify JWTs (keep this secret)
- `VITE_PORT` — port used by the server in this repository (the code refers to `VITE_PORT`)

## Available scripts

The `package.json` (backend) contains the following scripts:

- `start` — `node server.mjs` (start the server with Node)
- `dev` — `nodemon server.mjs` (development mode)

Run them from the `Journee_backend` folder:

```bash
npm run dev
# or
npm start
```

## API endpoints (summary)

This is a concise summary of the main endpoints the frontend expects. Check the `controllers` and `routes` folders for full details.

- POST `/api/users` — Register new user (returns `{ token }`)
- POST `/api/auth` — Login (returns `{ token }`)
- GET `/api/auth` — Get current user (protected; pass `x-auth-token` header)

- GET `/api/posts` — List posts
- GET `/api/posts/:id` — Get a single post
- GET `/api/posts/user/:userId` — Get posts by user
- POST `/api/posts` — Create a post (protected)
- PUT `/api/posts/:id/edit` — Update a post (protected)
- DELETE `/api/posts/:id` — Delete a post by id (protected)
- DELETE `/api/posts/user/:userId` — Delete posts by user (protected)

Example curl (register):

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"secret"}'
```

## Authentication

- The project issues JWTs on register/login in the response body as `{ token }`.
- Protected endpoints read the token from the `x-auth-token` header when the frontend makes requests.

Security note: the frontend currently uses `react-cookie` to store tokens in a cookie. For production it's recommended to move to server-set `httpOnly` cookies and enable CORS `credentials: true` to reduce XSS risk.

## Development notes & security

- Ensure `jwtSecret` is strong and never checked into source control.
- If running locally, confirm your MongoDB instance is running and `MONGO_URI` points to the correct DB.
- Consider adding rate limiting and request sanitization for public endpoints when exposing this service.

## Contact

If you need help or want to collaborate, contact:

- Email: alexandreludens2@gmail.com
- GitHub: https://github.com/Ludens509

---

Backend repo: https://github.com/Ludens509/Journee-backend

Made with ❤️ for personal growth and reflection
