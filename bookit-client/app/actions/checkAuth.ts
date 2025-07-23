'use server'

import {createSessionClient} from "@/lib/server/appwrite";
import {cookies} from "next/headers";

async function checkAuth():Promise< {isAuthenticated: boolean; user?: {id: string; name: string; email: string}}> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('appwrite-session')
    
    if(!sessionCookie) return {isAuthenticated: false};
    
    try {
      const { account } = await createSessionClient(sessionCookie.value)
      const user = await account.get();
      return {
          isAuthenticated: true,
          user: {
              id: user.$id,
              name: user.name,
              email: user.email,
          }
      }
    } catch (e) {
        console.log('Error checking auth: ', e)
        return {isAuthenticated: false};
    }
}


export default checkAuth;
