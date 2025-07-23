"use server";

import { Client, Account, Databases, Storage } from "node-appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
const appwriteKey = process.env.NEXT_APPWRITE_KEY;

export async function createSessionClient(session:string) {
    
    if(!endpoint || !project) throw new Error('Missing environment variables for Appwrite endpoint or project');
    
    const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project);
    
    if (!session) {
      throw new Error("No session");
    }
    
    client.setSession(session);
    
    return {
      get account() {
        return new Account(client);
      },
      get databases() {
        return new Databases(client);
      },
      get storage() {
        return new Storage(client);
      },
    };
}

export async function createAdminClient() {
  
  if(!endpoint || !project || !appwriteKey) throw new Error('Missing environment variables for Appwrite endpoint or project');
  
  const client = new Client()
  .setEndpoint(endpoint)
  .setProject(project)
  .setKey(appwriteKey);
  
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}
