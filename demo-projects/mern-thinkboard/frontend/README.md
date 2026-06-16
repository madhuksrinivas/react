# Think Board Frontend

Frontend application for Think Board, built with React + Vite.

## Tech Stack

- React 19
- Vite
- React Router
- TanStack Query
- Axios
- React Hot Toast
- Lucide React

## Prerequisites

- Node.js 18+
- npm
- Backend API running at `http://localhost:5000`

## Setup

```bash
npm install
```

## Run In Development

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Project Structure

```text
src/
	components/    # Reusable UI components (NavBar, Notes, NoteForm)
	hooks/         # Data and form hooks
	pages/         # Route-level pages (Home, Create, Edit)
	styles/        # CSS files
	assets/        # Static assets (icons, logos)
```

## Notes

- Create and edit pages share a reusable form component.
- API requests are managed with TanStack Query hooks.
