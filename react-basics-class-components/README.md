# React Basics - Class Components Learning Project

A comprehensive React learning project demonstrating all fundamental concepts using **Class Components**. This project covers everything from basic components to advanced patterns like Higher Order Components, Render Props, and Context API.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Component Categories](#component-categories)
- [Running the Application](#running-the-application)
- [Learning Path](#learning-path)
- [Technologies Used](#technologies-used)

## 🎯 Project Overview

This project is a complete guide to learning React class components, covering:

- Component fundamentals (functional and class-based)
- Props and state management
- Event handling and binding
- Conditional rendering and lists
- Component styling approaches
- Component lifecycle methods
- Advanced patterns (HOC, Render Props, Context API)
- HTTP requests with Axios

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone or navigate to the project directory
cd react-basics-class-components

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
react-basics-class-components/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── 01-Basics/           # Basic component concepts
│   │   ├── 02-Props/            # Props and destructuring
│   │   ├── 03-State/            # State management
│   │   ├── 04-Events/           # Event handling
│   │   ├── 05-Conditional-List/ # Conditional & list rendering
│   │   ├── 06-Styling/          # Various styling approaches
│   │   ├── 07-Lifecycle/        # Component lifecycle methods
│   │   ├── 08-Fragments/        # React Fragments
│   │   ├── 09-PureComponents/   # Pure components & optimization
│   │   ├── 10-Refs/             # Refs and DOM access
│   │   ├── 11-Portals/          # React Portals
│   │   ├── 12-ErrorBoundary/    # Error handling
│   │   ├── 13-HigherOrderComponents/ # HOC pattern
│   │   ├── 14-RenderProps/      # Render props pattern
│   │   ├── 15-Context/          # Context API
│   │   └── 16-HTTP/             # HTTP requests with Axios
│   ├── moduleCss/               # CSS modules examples
│   ├── App.js                   # Main application component
│   ├── App.css                  # App styles
│   ├── index.js                 # Application entry point
│   └── index.css                # Global styles
├── package.json
└── README.md
```

## 📚 Component Categories

### 1. **Basics** (`01-Basics/`)

Learn fundamental React concepts:

- **Greet.js** - Functional component basics
- **Hello.js** - JSX vs createElement
- **Welcome.js** - Class component basics
- **Form.js** - Form handling in React

**Usage in App.js:**

```javascript
<Greet name="Naruto" surname="Uzumaki">
  <p>This is children props</p>
</Greet>
```

### 2. **Props** (`02-Props/`)

Understanding props and destructuring:

- **DestructFunComp.js** - Destructuring props in functional components
- **DestructClassComp.js** - Destructuring props in class components

**Usage in App.js:**

```javascript
<DestructFunComp name="Minato" surname="Namikaze"/>
<DestructClassComp name="Kushina" surname="Uzumaki"/>
```

### 3. **State** (`03-State/`)

Managing component state:

- **Message.js** - Basic state management
- **Counter.js** - Counter with state
- **Count.js** - Alternative counter implementation

**Usage in App.js:**

```javascript
<Message/>
<Counter addValue="1"/>
```

### 4. **Events** (`04-Events/`)

Event handling in React:

- **FuncionClick.js** - Function component event handling
- **ClassClick.js** - Class component event handling
- **EventBind.js** - Different ways to bind event handlers
- **ParentComponet.js** - Parent-child communication
- **ChildComponent.js** - Child component receiving callbacks

**Usage in App.js:**

```javascript
<FuncionClick/>
<ClassClick/>
<EventBind/>
<ParentComponet/>
```

### 5. **Conditional & List Rendering** (`05-Conditional-List/`)

Rendering logic and lists:

- **ConditionalRendering.js** - If-else, ternary, short circuit operators
- **ListRendering.js** - Rendering lists with map()
- **Person.js** - Person list item component

**Usage in App.js:**

```javascript
<ConditionalRendering/>
<ListRendering/>
```

### 6. **Styling** (`06-Styling/`)

Different styling approaches:

- **StyleSheet.js** - External CSS stylesheets
- **InlineCss.js** - Inline styling
- **StyleSheetCss.css** - CSS file for StyleSheet component
- **../moduleCss/** - CSS Modules example

**Usage in App.js:**

```javascript
<StyleSheet secondary={true} />
<InlineCss/>
<h1 className={styles.success}>Success</h1>
```

### 7. **Lifecycle** (`07-Lifecycle/`)

Component lifecycle methods:

- **LifeCycleA.js** - Parent lifecycle methods
- **LifeCycleB.js** - Child lifecycle methods

**Lifecycle methods covered:**

- `constructor()`
- `getDerivedStateFromProps()`
- `render()`
- `componentDidMount()`
- `shouldComponentUpdate()`
- `getSnapshotBeforeUpdate()`
- `componentDidUpdate()`
- `componentWillUnmount()`

**Usage in App.js:**

```javascript
<LifeCycleA />
```

### 8. **Fragments** (`08-Fragments/`)

Using React Fragments to avoid extra DOM nodes:

- **FragmentDemo.js** - Fragment basics
- **Table.js** - Table example
- **Columns.js** - Table columns with fragments

**Usage in App.js:**

```javascript
<FragmentDemo />
<Table />
```

### 9. **Pure Components** (`09-PureComponents/`)

Component optimization:

- **ParentComp.js** - Parent component demonstrating optimization
- **PureComp.js** - Pure component (shallow comparison)
- **RegularComp.js** - Regular component (always re-renders)
- **MemoComp.js** - React.memo for functional components

**Usage in App.js:**

```javascript
<ParentComp />
```

### 10. **Refs** (`10-Refs/`)

Accessing DOM elements directly:

- **RefsDemo.js** - Basic refs usage
- **Input.js** - Input component with ref
- **FocusInput.js** - Parent component using child refs
- **ForwardRefInput.js** - Forwarding refs
- **ForwardRefParentInput.js** - Using forwarded refs

**Usage in App.js:**

```javascript
<RefsDemo />
<FocusInput />
<ForwardRefParentInput />
```

### 11. **Portals** (`11-Portals/`)

Rendering components outside root DOM hierarchy:

- **PortalDemo.js** - Portal implementation example

**Usage in App.js:**

```javascript
<PortalDemo />
```

### 12. **Error Boundary** (`12-ErrorBoundary/`)

Error handling in React:

- **ErrorBoundary.js** - Error boundary component
- **Hero.js** - Component that may throw errors

**Usage in App.js:**

```javascript
<ErrorBoundary>
  <Hero heroname="Batman" />
</ErrorBoundary>
<ErrorBoundary>
  <Hero heroname="Joker" />  {/* This will throw an error */}
</ErrorBoundary>
```

### 13. **Higher Order Components** (`13-HigherOrderComponents/`)

HOC pattern for code reuse:

- **ClickCounter.js** - Click counter using HOC
- **HoverCounter.js** - Hover counter using HOC
- **WithCounter.js** - HOC that adds counter functionality

**Usage in App.js:**

```javascript
<ClickCounter name="Mr.Click" />
<HoverCounter name="Mr.Hover" />
```

### 14. **Render Props** (`14-RenderProps/`)

Render props pattern for code reuse:

- **CounterRP.js** - Counter component with render prop
- **ClickCounterRP.js** - Click counter using render props
- **HoverCounterRP.js** - Hover counter using render props
- **User.js** - User component with render prop

**Usage in App.js:**

```javascript
<User render={(isLoggedIn) => isLoggedIn ? "PervySage" : "Guest"} />
<CounterRP
  render={(count, incrementCount) => (
    <ClickCounterRP count={count} incrementCount={incrementCount} />
  )}
/>
```

### 15. **Context API** (`15-Context/`)

Sharing data across component tree:

- **UserContext.js** - Context creation and provider
- **ComponentC.js** - Consumer component
- **ComponentE.js** - Nested consumer
- **ComponentF.js** - Deep nested consumer

**Usage in App.js:**

```javascript
<UserProvider value="Vishwas">
  <ComponentC />
</UserProvider>
```

### 16. **HTTP Requests** (`16-HTTP/`)

Making HTTP requests with Axios:

- **PostList.js** - GET request to fetch posts
- **PostForm.js** - POST request to create posts

**API Used:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

**Usage in App.js:**

```javascript
<PostList />
<PostForm />
```

## 🏃 Running the Application

### Development Mode

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) with hot reload enabled.

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build` folder.

### Run Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

## 📖 Learning Path

Recommended order for learning:

1. **Basics** → Understand components, JSX, and forms
2. **Props** → Learn data passing and destructuring
3. **State** → Master component state management
4. **Events** → Handle user interactions
5. **Conditional & Lists** → Dynamic rendering
6. **Styling** → Various styling approaches
7. **Lifecycle** → Component lifecycle understanding
8. **Fragments** → Clean DOM structure
9. **Pure Components** → Performance optimization
10. **Refs** → Direct DOM access
11. **Portals** → Advanced rendering
12. **Error Boundary** → Error handling
13. **HOC** → Advanced pattern for code reuse
14. **Render Props** → Alternative pattern for code reuse
15. **Context API** → Global state management
16. **HTTP** → Server communication

## 🛠 Technologies Used

- **React 18.2.0** - JavaScript library for building user interfaces
- **React DOM 18.2.0** - React package for DOM manipulation
- **Axios 1.4.0** - Promise-based HTTP client
- **React Scripts 5.0.1** - Scripts and configuration for Create React App
- **CSS Modules** - Scoped CSS styling

## 💡 Key Concepts Covered

- ✅ Functional vs Class Components
- ✅ JSX Syntax
- ✅ Props and Children Props
- ✅ State Management
- ✅ Event Handling and Binding
- ✅ Conditional Rendering (if-else, ternary, short circuit)
- ✅ List Rendering with Keys
- ✅ CSS Styling (Inline, Stylesheets, CSS Modules)
- ✅ Component Lifecycle Methods
- ✅ React Fragments
- ✅ Pure Components & React.memo
- ✅ Refs and Forward Refs
- ✅ Portals
- ✅ Error Boundaries
- ✅ Higher Order Components (HOC)
- ✅ Render Props Pattern
- ✅ Context API (Provider/Consumer)
- ✅ HTTP GET and POST Requests

## 📝 Notes

- All components in App.js are commented out by default. Uncomment the ones you want to test.
- Each component is self-contained and can be tested independently.
- The project uses Class Components primarily for learning purposes.
- For production apps, consider using Hooks and functional components (modern React approach).

## 🤝 Contributing

This is a learning project. Feel free to:

- Add more examples
- Improve documentation
- Fix bugs
- Suggest better patterns

## 📄 License

This project is open source and available for educational purposes.

---

**Happy Learning! 🚀**

For questions or feedback, feel free to explore each component and experiment with the code!

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
