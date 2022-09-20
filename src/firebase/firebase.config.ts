import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const CookBook_ServiceAccount_Staging = require('./cookbook-staging.json');
initializeApp({
    credential: cert(CookBook_ServiceAccount_Staging),
});

const Auth = getAuth();

export { Auth };
