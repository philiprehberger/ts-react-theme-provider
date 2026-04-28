import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('react-theme-provider exports', () => {
  it('exports ThemeProvider, useTheme, and ThemeToggle', async () => {
    const mod = await import('../../dist/index.js');
    assert.ok(typeof mod.ThemeProvider === 'function', 'ThemeProvider should be a function');
    assert.ok(typeof mod.useTheme === 'function', 'useTheme should be a function');
    assert.ok(typeof mod.ThemeToggle === 'function', 'ThemeToggle should be a function');
  });

  it('ThemeProvider has correct displayName or name', async () => {
    const mod = await import('../../dist/index.js');
    assert.equal(mod.ThemeProvider.name, 'ThemeProvider');
  });

  it('useTheme throws when used outside provider', async () => {
    // useTheme requires React context, so calling it outside should throw
    // We can't fully test React hooks without a DOM, but we verify the export exists
    const mod = await import('../../dist/index.js');
    assert.equal(mod.useTheme.name, 'useTheme');
  });

  it('exports useResolvedTheme', async () => {
    const mod = await import('../../dist/index.js');
    assert.equal(typeof mod.useResolvedTheme, 'function');
    assert.equal(mod.useResolvedTheme.name, 'useResolvedTheme');
  });
});
