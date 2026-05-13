/** Resolves API-relative paths against the current browser origin. */
export function absoluteGatewayUrl(path: string | null | undefined): string {
  if (!path) {
    return '';
  }
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const base = typeof window !== 'undefined' ? window.location.origin : '';
  return base + (path.startsWith('/') ? path : `/${path}`);
}
