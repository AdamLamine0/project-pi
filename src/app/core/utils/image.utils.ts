import { IMAGE_BASE_URL } from '../config/api.config';

export function normalizeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  // Replace any absolute localhost:PORT/uploads with relative /uploads
  // so the Angular proxy can handle it
  return url.replace(/^https?:\/\/localhost:\d+\/uploads/, '/uploads');
}
