"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

async function checkAuth(): Promise<{
  isAuthenticated: boolean;
  userId?: string;
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get("bookit-session")?.value;

  if (!token) return { isAuthenticated: false };

  try {
    // JWT verification using jose. This works for next.js since The edge runtime does not support Node.js 'crypto' module.
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    const userId =payload['userId'] as string;
    
    if (!userId) {
      return { isAuthenticated: false };
    }

    return {
      isAuthenticated: true,
      userId
    };
  } catch (e) {
    return { isAuthenticated: false };
  }
}

export default checkAuth;
