# Social Media Content Scheduler — Frontend

A modern, responsive React frontend for scheduling and managing social media content across multiple platforms. This repository contains the client-side application built with Vite and designed to work with a RESTful backend for authentication, content management, and post scheduling.

---

## Table of contents

- [Key features](#key-features)
- [Tech stack](#tech-stack)
- [Demo / Screenshots](#demo--screenshots)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [API integration](#api-integration)
- [Environment & build notes](#environment--build-notes)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Key features

- JWT-based user authentication (login & registration)
- Create, edit, delete, and schedule posts for supported social platforms
- Responsive UI that adapts to desktop and mobile
- Real-time updates (WebSocket / SSE support optional)
- Component-driven architecture for maintainability and extensibility

---

## Tech stack

- React (functional components + hooks)
- Vite (dev server and build tool)
- Axios (HTTP client)
- CSS3 (project-specific conventions)

---

## Demo / Screenshots

Add links or images here when available.

- Live demo: https://socail-media-content-schedular.vercel.app/

---

## Prerequisites

- Node.js v18+ (or current LTS)
- npm v8+

---

## Getting started

1. Clone the repository

```bash
git clone https://github.com/Faizan-Aziz/socail-media-content-schedular-frontend.git
cd socail-media-content-schedular-frontend
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Create a `.env` file in the project root (see below for variables)

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

---

## Environment variables

Create a `.env` file in the project root. Example:

```env
VITE_API_BASE_URL=http://localhost:5000
```

For production, point `VITE_API_BASE_URL` to your backend API:

```env
VITE_API_BASE_URL=https://api.your-domain.com
```

Note: Vite exposes environment variables prefixed with `VITE_` to the client. Do not store secrets or private API keys directly in client-side environment variables.

---

## Available scripts

- `npm run dev` — Start the Vite development server
- `npm run build` — Build optimized production assets
- `npm run preview` — Preview the production build locally

---

## API integration

This frontend expects a backend API that provides:

- Authentication endpoints for login/register returning JWT tokens
- CRUD endpoints for posts (create, read, update, delete)
- Scheduling endpoints for queuing posts for future publication


Best practices:

- Backend should use `Authorization: Bearer <token>` for protected routes.
- API should accept and return JSON.
- Configure CORS on the backend to allow requests from the frontend origin.

Axios is used for HTTP requests. Store the API base URL in `VITE_API_BASE_URL`.

---

## Environment & build notes

- Remember that client-side code is visible to end users — do not embed private credentials.
- Ensure the backend supports CORS and authentication flows expected by the client.
- Use the `npm run build` output for production deployment; static assets can be served by platforms like Vercel or Netlify.

---

## Deployment

Recommended platforms:

- Vercel — Connect the GitHub repository, set environment variables in the project settings, and deploy
- Netlify — Connect the repository or use the CLI, set environment variables, and deploy

Deployment checklist:

- Set `VITE_API_BASE_URL` to the production API endpoint in the hosting provider’s environment settings
- Use `npm run build` as the build step
- Verify CORS and authentication behavior between frontend and backend after deployment

---

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/<short-description>`
3. Commit changes with descriptive messages
4. Push to your fork and open a pull request with a clear description of your changes

Guidelines:

- Follow existing code style and conventions
- Add tests for new or changed behavior when applicable
- Include descriptive PR titles and link related issues

---

## License

This project is available under the MIT License. Replace or update with a different license if required.

---

## Contact

Maintained by Faizan Aziz — https://github.com/Faizan-Aziz

---

