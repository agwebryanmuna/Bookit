'use server';

import { createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";

async function destroySession():Promise< { success?: boolean; error?: string }> {
  
  // retrieve the session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session')
  
  if(!sessionCookie) {
    return { error: 'No session found.' }
  }
  
  try {
  
    const { account } = await createSessionClient(sessionCookie.value)
    
    // delete session
    await account.deleteSession('current')
    
    // clear session cookie
    cookieStore.delete('appwrite-session')
    
    return { success: true }
  } catch (e) {
    console.log('Error deleting session: ', e)
    return { error: 'Error deleting session.' }
  }
  
}

export default destroySession;
