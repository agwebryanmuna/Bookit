"use server";

import { redirect } from "next/navigation";
import getUser from "./getUser";
import Booking from "@/models/Booking.model";
import Room from "@/models/Room.model";

async function getMyBookings() {
  try {
    // Get user
    const { user } = await getUser();
    if (!user) redirect("/login");

    const bookings = await Booking.find({ userId: user._id });
  
    const  myBookings = await Promise.all(bookings.reverse().map(async (booking) => {
      const room = await Room.findById(booking.roomId)
      return {
        _id: booking._id,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        room: room,
        userId: booking.userId,
        roomId: booking.roomId,
      };
    }));

    return myBookings;
  } catch (error) {
    console.log("Failed to get user bookings", error);
    return [];
  }
}

export default getMyBookings;
