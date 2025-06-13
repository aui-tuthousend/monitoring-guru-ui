import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { AuthProvider, useAuth } from './auth.tsx'
import { SidebarProvider } from './components/ui/sidebar.tsx'
import { ThemeProvider } from 'next-themes'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // will be filled in dynamically
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Inner app with dynamic auth context and SidebarProvider
function InnerApp() {
  const auth = useAuth()
  return (
      <RouterProvider router={router} context={{ auth }} />
  )
}

// Main App with Theme and Auth
function App() {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <InnerApp />
      </ThemeProvider>
    </AuthProvider>
  )
}

// Mount the app to DOM
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

// Performance monitoring (optional)
reportWebVitals()
