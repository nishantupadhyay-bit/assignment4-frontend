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
- No backend API calls are introduced in this phase

User workflows will be implemented in subsequent phases. Product management remains read-only in the frontend; product creation and stock updates are not part of the frontend scope.
