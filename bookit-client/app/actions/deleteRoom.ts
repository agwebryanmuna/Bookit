"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import getUser from "./getUser";
import Room from "@/models/Room.model";

async function deleteRoom(roomId: string) {
  const { user } = await getUser();
  if (!user) {
    redirect("/login");
  }

  try {
    const deleteRoom = await Room.findOneAndDelete({ _id: roomId });
    console.log(deleteRoom);

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
