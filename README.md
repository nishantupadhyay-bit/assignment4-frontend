# Assignment 4 Frontend

Svelte + Vite + TypeScript + Tailwind CSS frontend for the Assignment 4 microservices application.

The frontend communicates **only with the BFF REST API**. It does not call the User, Product, or Order gRPC services directly and does not connect to any database.

## Prerequisites

- Node.js 20.19+ or 22.12+
- npm
- Assignment 4 BFF running locally on port 8083

## Setup

```bash
npm install
cp .env.example .env
```

By default, `.env.example` configures the BFF at `http://localhost:8083`.

If the BFF runs at a different address, update `VITE_API_BASE_URL` in `.env`.

## Run locally

```bash
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run check` | Run Svelte and TypeScript checks |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |

## Current implementation

### PR1 — Frontend foundation

- Svelte single-page application with TypeScript
- Vite development and production build setup
- Tailwind CSS v4
- Configurable BFF base URL

### PR2 — Shared layout

- Responsive application shell with sidebar navigation
- Dashboard, Users, Products and Orders navigation entries
- Reusable header and page container components
- Dashboard landing page with workflow placeholders

### PR3 — User management

- Register users using the BFF `POST /api/users` endpoint
- Load the user directory using `GET /api/users`
- View individual user details using `GET /api/users/{userId}`
- Display loading, success, empty and API error states

### PR4 — Product management

- Create products using the BFF `POST /api/products` endpoint
- Browse products using the BFF `GET /api/products` endpoint
- Search the loaded catalogue by product name or description
- Refresh the product catalogue
- View individual product details using `GET /api/products/{productId}`
- Update stock quantity using the BFF `PATCH /api/products/{productId}/stock` endpoint
- Display price, currency, stock quantity and product description
- Display loading, empty, success and API error states

Product updates are limited to stock quantity because that is the update operation currently exposed by the BFF.
