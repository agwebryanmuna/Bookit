"use server";

import connectDb from "@/lib/mongoose";
import Room from "@/models/Room.model";

export async function getSingleRoom(id: string) {
  await connectDb();

  try {
    // fetch rooms
    const room = await Room.findById(id);
    if(!room) return null
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
  } catch (_) {
    return null
  }
}
