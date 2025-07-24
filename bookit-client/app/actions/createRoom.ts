"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { SessionResponse } from "@/utils/definitions";

async function createRoom(state: SessionResponse, formData: FormData) {
  // Get databases instance
  const { databases, storage } = await createAdminClient();

  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: "You must be logged in to create a room",
        success: false,
      };
    }

    // Uploading image
    let imageID;

    const image = formData.get("image") as File;

    if (image && image.size > 0 && image.name !== "undefined") {
      try {
        // Upload
        const response = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS!,
          ID.unique(),
          image
        );
        imageID = response.$id;
      } catch (error) {
        console.log("Error uploading image", error);
        return {
          error: "Error uploading image",
          success: false,
        };
      }
    } else {
      console.log("No image file provided or file is invalid");
    }

    // Create room
    const newRoom = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
      ID.unique(),
      {
        user_id: user.id,
        name: formData.get("name"),
        description: formData.get("description"),
        sqft: formData.get("sqft"),
        capacity: formData.get("capacity"),
        location: formData.get("location"),
        address: formData.get("address"),
        availability: formData.get("availability"),
        price_per_hour: formData.get("price_per_hour"),
        amenities: formData.get("amenities"),
        image: imageID,
      }
    );

    revalidatePath("/", "layout");

    return {
      success: true,
      error: "",
    };
  } catch (error: any) {
    console.log(error);
    const errorMessage =
      error.response.message || "An unexpected error has occured";
    return {
      error: errorMessage,
      success: false,
    };
  }
}

export default createRoom;
