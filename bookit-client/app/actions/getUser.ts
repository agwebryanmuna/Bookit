"use server";

import User from "@/models/User.model";
import checkAuth from "./checkAuth";
import connectDb from "@/lib/mongoose";

async function getUser() {
  const { isAuthenticated, userId } = await checkAuth();

  if (!isAuthenticated || !userId) {
    return { isAuthenticated: false, user: null };
  }

  await connectDb();

  try {
    const user = await User.findById(userId).select("-password -__v");
    return {
      isAuthenticated: true,
      user: { _id: user._id.toString(), name: user.name, email: user.email },
    };
  } catch (error) {
    console.log(error);
    return {
      isAuthenticated: true,
      user: null,
    };
  }
}

export default getUser;
