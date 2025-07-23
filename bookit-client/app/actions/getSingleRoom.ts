'use server';

import { createAdminClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";


export async function getSingleRoom(id:string) {
  try {
    const { databases } = await createAdminClient();
    
    // fetch rooms
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
      id
    );
    
    
   
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
    
  }  catch (e) {
    console.log('Failed to get room', e)
    redirect('/error')
  }
}
