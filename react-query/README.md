# React Query Demo Project

A comprehensive React application demonstrating the power of **TanStack Query (React Query)** for efficient server state management. This project showcases various query patterns, mutations, pagination, infinite scrolling, and advanced data fetching techniques.

## 📚 About This Project

This project is a learning resource and demonstration of React Query capabilities, including:

- **Basic Queries**: Fetching and caching data
- **Parallel Queries**: Fetching multiple independent datasets simultaneously
- **Dependent Queries**: Sequential queries where one depends on another
- **Dynamic Parallel Queries**: Fetching variable numbers of queries
- **Pagination**: Implementing paginated data fetching
- **Infinite Queries**: Implementing infinite scroll/load more functionality
- **Mutations**: Creating, updating, and deleting data with optimistic updates
- **Custom Hooks**: Reusable query patterns
- **Polling**: Automatic refetching at intervals
- **Query Invalidation**: Smart cache management

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Data Fetching**: TanStack Query (React Query) v5
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Backend**: JSON Server (mock REST API)

## 📁 Project Structure

```
react-query-demo/
├── src/
│   ├── components/          # React components for each demo
│   ├── hooks/              # Custom React Query hooks
│   ├── guides/             # Comprehensive documentation
│   └── utils/              # Utility functions (axios config)
├── db.json                 # JSON Server database
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

This project requires **two servers** to run simultaneously:

#### 1️⃣ Start the Backend (JSON Server)

The backend is a mock REST API powered by JSON Server that serves data from `db.json`.

```bash
npm run serve-json
```

This will start the JSON Server on **http://localhost:4000** with the following endpoints:

- `http://localhost:4000/superheroes` - Superheroes data
- `http://localhost:4000/friends` - Friends data
- `http://localhost:4000/users` - Users data
- `http://localhost:4000/channels` - Channels data
- `http://localhost:4000/colors` - Colors data

**Note**: JSON Server automatically watches `db.json` for changes and updates in real-time.

#### 2️⃣ Start the Frontend (Vite Dev Server)

In a **new terminal window**, start the React development server:

```bash
npm run dev
```

This will start the Vite dev server on **http://localhost:5173** (or the next available port).

#### 🎯 Quick Start (All-in-One)

You can run both servers simultaneously using:

```bash
# Terminal 1: Backend
npm run serve-json

# Terminal 2: Frontend (in a new terminal)
npm run dev
```

Then open your browser and navigate to **http://localhost:5173**

## 📖 Available Scripts

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start Vite development server (frontend) |
| `npm run serve-json` | Start JSON Server (backend mock API)     |
| `npm run build`      | Build the project for production         |
| `npm run preview`    | Preview the production build locally     |
| `npm run lint`       | Run ESLint to check code quality         |

## 🎓 Learning Resources

This project includes extensive documentation in the `src/guides/` directory:

- **Getting Started.md** - Introduction to React Query
- **REACT_QUERY_GUIDE.md** - Comprehensive React Query guide
- **REACT_QUERY_FLOWCHART.md** - Visual flowcharts and diagrams
- **Query Patterns** - Detailed guides for each query pattern
- **Custom Hooks Pattern** - Creating reusable query hooks

### Component Demos

Navigate through the app to explore different React Query features:

1. **Home** - Introduction and overview
2. **Traditional Super Heroes** - Vanilla React approach (without React Query)
3. **RQ Super Heroes** - Basic React Query implementation
4. **RQ Super Hero Details** - Dynamic route parameters with queries
5. **Parallel Queries** - Fetching multiple datasets concurrently
6. **Dynamic Parallel** - Variable number of parallel queries
7. **Dependent Queries** - Sequential dependent data fetching
8. **Pagination** - Paginated data with React Query
9. **Infinite Queries** - Infinite scroll implementation
10. **Mutations** - Add/update/delete operations

## 🔧 Configuration

### JSON Server Port

The backend runs on port **4000** by default. To change this, update the `serve-json` script in `package.json`:

```json
"serve-json": "json-server --watch db.json --port YOUR_PORT"
```

### Vite Dev Server Port

The frontend runs on port **5173** by default. To change this, update `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: YOUR_PORT,
  },
});
```

## 📊 Database Structure

The `db.json` file contains sample data for:

- **superheroes**: Hero name and alter ego
- **friends**: Friend names
- **users**: User and channel associations
- **channels**: Channel courses
- **colors**: Color labels for pagination demo

You can modify this file to add, update, or delete data. JSON Server will automatically reflect changes.

## 🎯 Key Features Demonstrated

### Caching & Performance

- Automatic background refetching
- Stale-while-revalidate pattern
- Smart cache invalidation
- Optimistic updates

### Developer Experience

- React Query DevTools integration
- Loading and error states
- Success/error callbacks
- Query key management

### Advanced Patterns

- Polling/Auto-refetch
- Dependent queries
- Query transformation
- Pagination strategies
- Infinite scroll

## 🐛 Troubleshooting

### Port Already in Use

If you get a "port already in use" error:

```bash
# For JSON Server (port 4000)
lsof -ti:4000 | xargs kill -9

# For Vite (port 5173)
lsof -ti:5173 | xargs kill -9
```

### Data Not Loading

1. Ensure JSON Server is running on port 4000
2. Check that `db.json` exists and is valid JSON
3. Verify axios base URL in `src/utils/axios-utils.js`

### React Query DevTools Not Showing

Make sure you have the DevTools component in your app:

```jsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
```

## 🤝 Contributing

This is a learning project. Feel free to:

- Add new query patterns
- Improve documentation
- Add more examples
- Fix bugs or issues

## 📝 License

This project is open source and available for learning purposes.

## 🌟 Acknowledgments

- [TanStack Query Documentation](https://tanstack.com/query)
- [Vite Documentation](https://vitejs.dev)
- [JSON Server](https://github.com/typicode/json-server)

---

**Happy Learning! 🚀**

For detailed guides on each feature, check the `src/guides/` directory.
