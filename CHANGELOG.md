# Changelog

## 0.2.0

- Add `disableTransitionOnChange` prop to suppress CSS transitions during theme swap (avoids color flicker)
- Add `useResolvedTheme()` shorthand hook returning just `'light' | 'dark'`

## 0.1.8

- Fix README GitHub URLs to use correct repo name (ts-react-theme-provider)

## 0.1.7

- Standardize README to 3-badge format with emoji Support section
- Update CI actions to v5 for Node.js 24 compatibility
- Add GitHub issue templates, dependabot config, and PR template

## 0.1.6

- Fix CI and License badge URLs in README

## 0.1.5

- Add Development section to README
- Fix CI badge to reference publish.yml

## 0.1.2

- Update repository URLs to new ts-prefixed GitHub repo

## 0.1.1

- Add `author`, `homepage`, `bugs`, `engines` fields to package.json
- Add test suite
- Improve package metadata for supply chain security scoring

## 0.1.0

- Initial release
- ThemeProvider with dark/light/system support
- useTheme hook
- ThemeToggle component with sun/moon/system icons
- localStorage persistence
- System preference detection via matchMedia
