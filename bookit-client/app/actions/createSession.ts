"use server";

import connectDb from "@/lib/mongoose";
import jwt from "jsonwebtoken";
import { SessionResponse } from "@/utils/definitions";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import User from "@/models/User.model";

async function createSession(state: SessionResponse, formData: FormData) {
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;

  if (!password || !email) {
    return {
      error: "Please fill out all fields.",
      success: false,
    };
  }

  await connectDb();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { error: "No user with this email found.", success: false };
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: "Password incorrect", success: false };
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "3d",
    });

    // Create cookie
    const cookieStore = await cookies()
    cookieStore.set("bookit-session", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        path: "/",
      });

    return { success: true, error: "" };
  } catch (_) {
    return { error: "Invalid email or password.", success: false };
  }
}

export default createSession;
