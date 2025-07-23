'use server';

import { createAdminClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";


export async function getAllRooms() {
try {
  
  const { databases } = await createAdminClient();
  
  // fetch rooms
  const {documents:rooms} = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!
  );

  
  return rooms.map((room) => {
    return {
      $id: room.$id,
      user_id: room.user_id,
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
    }
  })
  
}  catch (e) {
  console.log('Failed to get rooms', e)
  redirect('/error')
}
}
