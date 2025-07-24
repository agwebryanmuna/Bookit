"use server";

import { redirect } from "next/navigation";
import getUser from "./getUser";

async function getMyBookings() {
  try {
    // Get user's ID
    const { isAuthenticated, user } = await getUser();
    if (!user) redirect("/login");
  } catch (error) {
    console.log("Failed to get user bookings", error);
    return {
      error: "Failed to get bookings",
    };
  }
}

export default getMyBookings;
