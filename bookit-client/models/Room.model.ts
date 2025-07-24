import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sqft: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    amenities: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    price_per_hour: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Room = mongoose.models?.Room || mongoose.model("Room", RoomSchema);

export default Room;
