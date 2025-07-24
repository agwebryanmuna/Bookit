"use server";

import { cookies } from "next/headers";

async function destroySession(): Promise<{
  success?: boolean;
  error?: string;
}> {
  // retrieve the session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bookit-session");

  if (!sessionCookie) {
    return { error: "No session found.", success: false };
  }

  try {
    // clear session cookie
    cookieStore.delete("bookit-session");

    return { success: true, error: "" };
  } catch (e) {
    console.log("Error deleting session: ", e);
    return { error: "Error deleting session.", success: false };
  }
}

export default destroySession;
