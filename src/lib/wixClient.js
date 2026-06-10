/**
 * Wix SDK Client — shared instance
 * Client ID: 5b3b46bd-5bd9-4cea-b2b3-ee7aa5fab57e
 */
import { createClient, OAuthStrategy } from '@wix/sdk';
import { posts, categories, tags } from '@wix/blog';
import { items } from '@wix/data';

export const wixClient = createClient({
  modules: { posts, categories, tags, items },
  auth: OAuthStrategy({
    clientId: '5b3b46bd-5bd9-4cea-b2b3-ee7aa5fab57e',
  }),
});
