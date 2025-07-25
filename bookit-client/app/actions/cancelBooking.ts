"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import getUser from "./getUser";
import Booking from "@/models/Booking.model";

async function cancelBooking({
  bookingUserId,
  bookingId,
}: {
  bookingUserId: string;
  bookingId: string;
}) {
  const { user } = await getUser();
  if (!user) {
    redirect("/login");
  }

  try {
    if (user._id !== bookingUserId)
      return {
        error: "You are not authorized to cancel this booking.",
        success: false,
      };

    const cancelBooking = await Booking.findOneAndDelete({ _id: bookingId });
    console.log(cancelBooking);

    revalidatePath("/bookings", "layout");

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.log("Failed to cancel booking", error);
    return {
      error: "Failed to cancel booking",
      success: false,
    };
  }
}

export default cancelBooking;
