import dotenv from "dotenv";
dotenv.config();
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
const certificate: any = {
  project_id: process.env.GOOGLE_SA_PROJECT_ID,
  private_key: process?.env?.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.GOOGLE_SA_CLIENT_EMAIL,
};
initializeApp({
  credential: cert(certificate),
});

const Auth = getAuth();
const Storage = getStorage();

export { Auth, Storage };
