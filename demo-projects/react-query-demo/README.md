# React Query Demo Application

A comprehensive demonstration project showcasing **TanStack Query (React Query)** for efficient server state management in React applications. This project is built with React 19, Vite, and includes a Node.js Express backend.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Key Concepts Covered](#key-concepts-covered)
- [React Query Features](#react-query-features)

## 🎯 About

This demo application demonstrates the power and flexibility of React Query (TanStack Query v5) for managing server state in modern React applications. It includes practical examples of data fetching, caching, mutations, and optimistic updates through an event management interface.

## ✨ Features

- **Data Fetching** with automatic caching and background updates
- **Mutations** for creating, updating, and deleting data
- **Optimistic Updates** for instant UI feedback
- **Error Handling** with automatic retries
- **Loading States** management
- **DevTools** integration for debugging
- **React Router** integration for navigation
- Full-stack application with REST API backend

## 🛠 Tech Stack

### Frontend

- **React** 19.0.0 - UI library
- **Vite** 4.4.5 - Build tool and dev server
- **@tanstack/react-query** 5.90.20 - Server state management
- **@tanstack/react-query-devtools** 5.91.2 - Development tools
- **React Router DOM** 6.15.0 - Client-side routing
- **ESLint** - Code linting

### Backend

- **Node.js** with Express 4.18.2
- **Body-parser** 1.20.2
- REST API for event management

## 📦 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**

## 🚀 Installation

1. **Clone the repository** (if not already cloned)

2. **Install Frontend Dependencies**

   ```bash
   cd react-complete-guide-course-resources-main/attachments/24\ React\ Query/react-query-demo
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

## ▶️ Running the Application

You need to run both the backend and frontend servers:

### 1. Start the Backend Server

```bash
cd backend
npm start
```

The backend server will start on **http://localhost:3000**

### 2. Start the Frontend Development Server

Open a new terminal window:

```bash
# From the root directory of react-query-demo
npm run dev
```

The frontend will start on **http://localhost:5173** (or another available port)

### Alternative: Run Both Servers

You can open two terminal windows/tabs and run both commands simultaneously.

## 📁 Project Structure

```
react-query-demo/
├── backend/                  # Express.js backend server
│   ├── app.js               # Main server file
│   ├── data/                # Data storage
│   ├── public/              # Static files
│   └── package.json         # Backend dependencies
├── src/
│   ├── components/          # React components
│   │   ├── Events/         # Event-related components
│   │   ├── Header.jsx      # Header component
│   │   ├── ImagePicker.jsx # Image selection component
│   │   └── UI/             # Reusable UI components
│   ├── util/               # Utility functions & API calls
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Entry point with QueryClientProvider
│   └── index.css           # Global styles
├── public/                  # Public assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Frontend dependencies
```

## 🎓 Key Concepts Covered

### React Query Fundamentals

1. **Query Setup**
   - QueryClient configuration
   - QueryClientProvider setup
   - Default options and caching strategies

2. **Data Fetching**
   - `useQuery` hook for fetching data
   - Query keys and dependencies
   - Automatic refetching and caching

3. **Mutations**
   - `useMutation` hook for data modifications
   - POST, PUT, DELETE operations
   - Success and error handling

4. **Advanced Features**
   - Optimistic updates
   - Query invalidation
   - Background refetching
   - Stale-while-revalidate pattern

5. **DevTools**
   - React Query DevTools integration
   - Query inspection and debugging

## 🔍 React Query Features

### useQuery

- Automatic caching
- Background refetching
- Stale data management
- Loading and error states
- Retry logic

### useMutation

- Create, update, delete operations
- Optimistic UI updates
- Query invalidation after mutations
- Error handling and rollback

### Query Invalidation

- Manual cache invalidation
- Automatic background refetch
- Selective query updates

## 📚 Learning Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Query Tutorial](https://tanstack.com/query/latest/docs/react/overview)
- [React Router Documentation](https://reactrouter.com/)

## 🐛 Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts

- `npm start` - Start the Express server (from backend directory)

## 🔧 Configuration

### Vite Configuration

The project uses [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) for Fast Refresh using Babel.

### ESLint

Configured with React-specific rules and plugins for code quality.

## 📝 Notes

- The backend runs on port 3000 by default
- The frontend runs on port 5173 by default
- Make sure both servers are running for the application to work properly
- React Query DevTools are available in development mode (bottom-left corner)

## 👨‍💻 Author

Maximilian Schwarzmüller (Academind GmbH)

## 📄 License

This project is part of the React Complete Guide course materials.

---

**Happy Learning! 🚀**
