"use server";
import connectDb from "@/lib/mongoose";
import User from "@/models/User.model";
import { SessionResponse } from "@/utils/definitions";
import bcrypt from "bcrypt";

async function createUser(previousState: SessionResponse, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  if (!email || !name || !password || !confirmPassword) {
    return {
      error: "Please fill in all fields",
      success: false,
    };
  }

  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters long",
      success: false,
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
      success: false,
    };
  }

  await connectDb();

  try {
    const user = await User.findOne({ email });
    if (user) {
      return { error: "User already exists.", success: false };
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    await User.create({ email, password: hashedPassword, name });

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.log("Registration Error: ", error);
    return {
      error: "Could not register user",
      success: false,
    };
  }
}

export default createUser;
