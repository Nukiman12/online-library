import { handleApiRequest } from './api';
import type { Env } from './api';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // API routes
    if (url.pathname.startsWith('/api/')) {
      return await handleApiRequest(request, env);
    }

    // Serve static files (handled by Cloudflare Pages)
    return new Response('Library API', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
} satisfies ExportedHandler<Env>;
