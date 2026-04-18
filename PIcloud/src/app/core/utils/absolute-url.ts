import { environment } from '../../../environments/environment';

/** Resolves API-relative paths (e.g. /api/community/...) to the gateway origin so links work from the Angular dev server. */
export function absoluteGatewayUrl(path: string | null | undefined): string {
  if (!path) {
    return '';
  }
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const base = environment.apiGatewayUrl.replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : `/${path}`);
}
