"use server";

import Booking from "@/models/Booking.model";
import { DateTime } from "luxon";

async function checkRoomAvailability(
  roomId: string,
  checkIn: string,
  checkOut: string
) {
  try {
    const checkInDateTime = DateTime.fromISO(checkIn).toJSDate();
    const checkOutDateTime = DateTime.fromISO(checkOut).toJSDate();

    // Find any existing booking that overlaps
    const existingBooking = await Booking.findOne({
      roomId,
      $or: [
        {
          checkIn: { $lt: checkOutDateTime },
          checkOut: { $gt: checkInDateTime },
        },
      ],
    });
    console.log("this is the existing booking: ", existingBooking);

    // If there's an overlapping booking, return false
    return !existingBooking;
  } catch (error: any) {
    console.log("Failed to check availabiliity: ", error);
    return false;
  }
}

export default checkRoomAvailability;
