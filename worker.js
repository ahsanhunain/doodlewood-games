/**
 * DoodleWood Games — doodlewoodgames.com
 *
 * Everything is static; this Worker exists only to normalise the URL before
 * handing off to the asset server:
 *   - www.doodlewoodgames.com  ->  doodlewoodgames.com   (301)
 *   - http://                  ->  https://              (301)
 *
 * 301 rather than 302 so search engines merge the ranking signals onto the
 * apex instead of treating the two hostnames as separate sites.
 */

const CANONICAL_HOST = 'doodlewoodgames.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Leave the workers.dev preview URLs alone, they are not the public site.
    const isPublicHost =
      url.hostname === CANONICAL_HOST || url.hostname === `www.${CANONICAL_HOST}`;

    if (isPublicHost) {
      const wrongHost = url.hostname !== CANONICAL_HOST;
      const wrongScheme = url.protocol !== 'https:';

      if (wrongHost || wrongScheme) {
        url.hostname = CANONICAL_HOST;
        url.protocol = 'https:';
        url.port = '';
        return Response.redirect(url.toString(), 301);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
