"use server";

import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";
import { SessionResponse } from "@/utils/definitions";
import User from "@/models/User.model";
import Room from "@/models/Room.model";
import { handleUpload } from "@/lib/cloudinary";
import connectDb from "@/lib/mongoose";

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;

async function createRoom(state: SessionResponse, formData: FormData) {
  
  await connectDb()

  try {
    const { userId } = await checkAuth();

    const user = await User.findById(userId);

    if (!user) {
      return {
        error: "You must be logged in to create a room",
        success: false,
      };
    }

    // Uploading image
    const image = formData.get("image") as File;
    let uploadedImage;

    if (image && image.size > 0 && image.name !== "undefined") {
      uploadedImage = await handleUpload(image) as Record<string, any>;
    } else {
      console.log("No image file provided or file is invalid");
    }

    // Create room
    await Room.create({
      userId: user._id,
      name: formData.get("name"),
      description: formData.get("description"),
      sqft: formData.get("sqft"),
      capacity: formData.get("capacity"),
      location: formData.get("location"),
      address: formData.get("address"),
      availability: formData.get("availability"),
      price_per_hour: formData.get("price_per_hour"),
      amenities: formData.get("amenities"),
      image:  uploadedImage?.url || "",
    });

    revalidatePath("/", "layout");

    return {
      success: true,
      error: "",
    };
  } catch (error: any) {
    console.log(error);
    const errorMessage = "An unexpected error has occured";
    return {
      error: errorMessage,
      success: false,
    };
  }
}

export default createRoom;
