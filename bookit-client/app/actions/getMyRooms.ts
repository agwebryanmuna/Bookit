"use server";

import { redirect } from "next/navigation";
import getUser from "./getUser";
import Room from "@/models/Room.model";

async function getMyRooms() {
  try {
    // Get user's ID
    const { user} = await getUser()
    if(!user) redirect('/login')

    // Fetch users rooms
    const  myRooms  = await Room.find({userId: user._id})

    return myRooms.reverse().map((room) => {
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
    throw new Error("Failed to get your rooms!");
  }
}

export default getMyRooms;
