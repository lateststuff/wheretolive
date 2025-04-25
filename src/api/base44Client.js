import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "680830456c4859f29c5ee3a1", 
  requiresAuth: true // Ensure authentication is required for all operations
});
