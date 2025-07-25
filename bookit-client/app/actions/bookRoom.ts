"use server";

import { redirect } from "next/navigation";
import getUser from "./getUser";
import { BookingType, SessionResponse } from "@/utils/definitions";
import Booking from "@/models/Booking.model";
import { revalidatePath } from "next/cache";
import connectDb from "@/lib/mongoose";

async function bookRoom(previousState: SessionResponse, formData: FormData) {

  await connectDb()

  try {
    // Get user's ID
    const { user } = await getUser();
    if (!user) redirect("/login");

    // extract the date and time from formData
    const roomId = formData.get("room_id") as string;
    const checkInDate = formData.get("check_in_date");
    const checkInTime = formData.get("check_in_time");
    const checkOutDate = formData.get("check_out_date");
    const checkOutTime = formData.get("check_out_time");

    // combine data and time to ISO 8601 FORMAT => which has date and time
    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;

    const bookingData: Omit<BookingType, "_id"> = {
      checkIn: checkInDateTime,
      checkOut: checkOutDateTime,
      userId: user._id,
      roomId,
    };

    // create booking
    const newBooking = await Booking.create(bookingData);

    revalidatePath("bookings", "layout");

    return { success: true, error: "" };
  } catch (error) {
    console.log("Failed to book room", error);
    return { error: "Something went wrong booking the room.", success: false };
  }
}

export default bookRoom;
