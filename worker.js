/**
 * Cloudflare Worker Entry Point
 * Serves static assets generated in ./dist with SPA fallback handling
 */
export default {
  async fetch(request, env) {
    // If the binding ASSETS exists, serve static assets from ./dist
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Assets binding not configured.', { status: 500 });
  },
};
