import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: ResolvedTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  /** localStorage key for persisting theme (default: "theme") */
  storageKey?: string;
  /** Default theme when no stored preference exists (default: "system") */
  defaultTheme?: Theme;
  /**
   * When true, suppresses CSS transitions for one frame during theme change to
   * avoid color-flicker on slow paint paths. Default: false.
   */
  disableTransitionOnChange?: boolean;
}

function suppressTransitions(): void {
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  );
  document.head.appendChild(css);
  // Force reflow then remove on next frame
  void window.getComputedStyle(document.body).opacity;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.head.removeChild(css);
    });
  });
}

/**
 * Theme provider with dark/light/system support.
 * Persists preference to localStorage and syncs with system preference changes.
 * Applies theme by toggling "light"/"dark" classes on the document element.
 */
export function ThemeProvider({
  children,
  storageKey = 'theme',
  defaultTheme = 'system',
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      setTheme(stored);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    let resolved: ResolvedTheme;

    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      resolved = systemDark ? 'dark' : 'light';
    } else {
      resolved = theme;
    }

    if (disableTransitionOnChange) {
      suppressTransitions();
    }

    setResolvedTheme(resolved);
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    localStorage.setItem(storageKey, theme);
  }, [theme, mounted, storageKey, disableTransitionOnChange]);

  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? 'dark' : 'light');
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Access the current theme context.
 * Must be used within a ThemeProvider.
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Shorthand hook returning just the resolved theme ('light' or 'dark').
 */
export function useResolvedTheme(): ResolvedTheme {
  return useTheme().resolvedTheme;
}
