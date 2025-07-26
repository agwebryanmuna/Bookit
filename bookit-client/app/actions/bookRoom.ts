"use server";

import { redirect } from "next/navigation";
import getUser from "./getUser";
import { BookingType, SessionResponse } from "@/utils/definitions";
import Booking from "@/models/Booking.model";
import { revalidatePath } from "next/cache";
import checkRoomAvailability from "./checkRoomAvailability";
import { DateTime } from "luxon";

async function bookRoom(previousState: SessionResponse, formData: FormData) {
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

    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;

    const checkInLuxon = DateTime.fromISO(checkInDateTime);
    const checkOutLuxon = DateTime.fromISO(checkOutDateTime);

    if (checkInLuxon >= checkOutLuxon) {
      return { error: "Check-out must be after check-in.", success: false };
    }

    // check if room is available
    const isAvailable = await checkRoomAvailability(
      roomId,
      checkInDateTime,
      checkOutDateTime
    );

    if (!isAvailable) {
      return {
        success: false,
        error: "This room is already booked for the selected time",
      };
    }

    const bookingData: Omit<BookingType, "_id" | "room"> = {
      checkIn: checkInDateTime,
      checkOut: checkOutDateTime,
      userId: user._id,
      roomId,
    };

    // create booking
    await Booking.create(bookingData);

    revalidatePath("bookings", "layout");

    return { success: true, error: "" };
  } catch (error) {
    console.log("Failed to book room", error);
    return { error: "Something went wrong booking the room.", success: false };
  }
}

export default bookRoom;
