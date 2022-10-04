import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import { createRequire } from "module";
const requireFile = createRequire(import.meta.url);
const CookBook_ServiceAccount_Staging = requireFile("./cookbook-staging.json");
initializeApp({
  credential: cert(CookBook_ServiceAccount_Staging),
});

const Auth = getAuth();
const Storage = getStorage();

export { Auth, Storage };
