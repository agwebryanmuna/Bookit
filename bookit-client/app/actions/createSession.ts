"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";

interface SessionResponse {
  success: boolean;
  error: string;
}

async function createSession(state: SessionResponse, formData: FormData) {
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;

  if (!password || !email) {
    return {
      error: "Please fill out all fields.",
      success: false,
    };
  }

  // Get an account instance
  const { account } = await createAdminClient();

  try {
    // Generate a session
    const session = await account.createEmailPasswordSession(email, password);

    // create cookie
    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),
      path: "/",
    });

    return { success: true, error: "" };
  } catch (e) {
    console.log("Authentication error", e);
    return { error: "Invalid email or password.", success: false };
  }
}

export default createSession;
