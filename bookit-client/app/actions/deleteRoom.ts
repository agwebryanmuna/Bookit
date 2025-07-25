"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import getUser from "./getUser";
import Room from "@/models/Room.model";
import Booking from "@/models/Booking.model";

async function deleteRoom(roomId: string) {
  const { user } = await getUser();
  if (!user) {
    redirect("/login");
  }

  try {
    // Delete the room
    await Room.findOneAndDelete({ _id: roomId });

    // Delete all booking for this room
    await Booking.deleteMany({ roomId });

    // Revalidate my rooms and all rooms
    revalidatePath("/rooms/my-rooms", "layout");
    revalidatePath("/", "layout");

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.log("Failed to delete room", error);
    return {
      error: "Failed to delete room",
      success: false,
    };
  }
}

export default deleteRoom;
