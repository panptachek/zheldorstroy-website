export function isTestMode() {
  if (typeof window === 'undefined') return false;
  const byQuery = new URLSearchParams(window.location.search).get('test-mode') === '1';
  const byEnv = String(import.meta.env.E2E || import.meta.env.VITE_E2E || '').toLowerCase() === '1' ||
    String(import.meta.env.E2E || import.meta.env.VITE_E2E || '').toLowerCase() === 'true';
  return byQuery || byEnv;
}
