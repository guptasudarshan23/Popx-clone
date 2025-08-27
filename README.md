# PopX MERN Assignment

Pixel-focused clone of the PopX mobile UI (Landing, Login, Signup, Profile) with authentication.

## Folders
- `client/` React app (Vite)
- `server/` Express + MongoDB API

## Quick Start (local)
1. In `server/` copy `.env.example` to `.env` and set `MONGO_URI` + `JWT_SECRET`.
2. `npm i && npm run dev` in `server/`.
3. In `client/`, set `VITE_API_URL` in `.env` (optional), then `npm i && npm run dev`.
4. Visit `http://localhost:5173`.

## Deploy
- **Server**: Render, Railway, or Vercel Functions. Set the environment variables and expose the base URL.
- **Client**: Vercel or Netlify. Set `VITE_API_URL` env to your deployed API URL.

## Notes
- UI is constrained to a 375x667 "phone" and centered on the page.
- Navigation uses React Router to mirror the XD flow.
- Code is clean, modular, and easy to debug for the assignment.