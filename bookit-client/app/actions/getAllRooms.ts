"use server";

import connectDb from "@/lib/mongoose";
import Room from "@/models/Room.model";
import { RoomType } from "@/utils/definitions";

export async function getAllRooms(): Promise<RoomType[]> {
  await connectDb();

  try {
    // fetch rooms
    const rooms = await Room.find({});

    return rooms.reverse().map((room) => {
      return {
        _id: room._id,
        userId: room.userId,
        name: room.name,
        description: room.description,
        sqft: room.sqft,
        capacity: room.capacity,
        location: room.location,
        address: room.address,
        price_per_hour: room.price_per_hour,
        amenities: room.amenities,
        availability: room.availability,
        image: room.image,
      };
    });
  } catch (_) {
    throw new Error("Failed to get rooms!");
  }
}
