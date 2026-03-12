# @philiprehberger/react-theme-provider

Dark/light/system theme provider for React with localStorage persistence and system preference detection.

## Installation

```bash
npm install @philiprehberger/react-theme-provider
```

## Usage

### ThemeProvider

Wrap your app with the provider:

```tsx
import { ThemeProvider } from '@philiprehberger/react-theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <YourApp />
    </ThemeProvider>
  );
}
```

### useTheme

Access theme state from any component:

```tsx
import { useTheme } from '@philiprehberger/react-theme-provider';

function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  // theme: 'light' | 'dark' | 'system'
  // resolvedTheme: 'light' | 'dark' (actual applied theme)
}
```

### ThemeToggle

Pre-built toggle component with sun/moon/system icons:

```tsx
import { ThemeToggle } from '@philiprehberger/react-theme-provider';

<ThemeToggle />
```

## How It Works

- Applies `light` or `dark` class to `document.documentElement`
- Persists user preference to `localStorage`
- Listens for system `prefers-color-scheme` changes when set to `system`
- Works with Tailwind CSS `dark:` variant out of the box

## License

MIT
