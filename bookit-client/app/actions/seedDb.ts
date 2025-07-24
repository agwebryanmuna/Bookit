"use server";

import connectDb from "@/lib/mongoose";
import Room from "@/models/Room.model";

const seedDb = async () => {
  try {
    console.log("Seeding database...");
    await connectDb();

    await Room.insertMany(dummyData);
    console.log("Finished seeding database...");
  } catch (error) {
    console.log("Error came from here: ", error);
  }
};

export default seedDb;

const dummyData = [
  {
    userId: "_",
    name: "Grand Conference Hall",
    description:
      "A spacious room with modern amenities, suitable for large conferences and events.",
    sqft: 3000,
    capacity: 100,
    location: "Building A, 3rd Floor",
    address: "555 California St, San Francisco, CA 94104",
    amenities: "Projector, Whiteboard, Video Conferencing, Wi-Fi, Sound System",
    availability: "9 AM - 5 PM",
    price_per_hour: 150,
    image:
      "https://res.cloudinary.com/dx4rloqv5/image/upload/v1753369333/room-1_mdajuf.jpg",
  },
  {
    userId: "_",
    name: "Executive Meeting Room",
    description: "Ideal for executive meetings and small group discussions.",
    sqft: 500,
    capacity: 8,
    location: "Building B, 2nd Floor",
    address: "100 Park Ave, New York, NY 10017",
    amenities: "Conference Phone, Whiteboard, Wi-Fi",
    availability: "8 AM - 6 PM",
    price_per_hour: 100,
    image:
      "https://res.cloudinary.com/dx4rloqv5/image/upload/v1753363483/bookit-rooms/h94cfd4ngscpgdokff7x.jpg",
  },
  {
    userId: "_",
    name: "Creative Hub",
    description:
      "A vibrant space designed for brainstorming sessions and creative workshops.",
    sqft: 800,
    capacity: 15,
    location: "Building C, 1st Floor",
    address: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
    amenities: "Whiteboard, Television, Wi-Fi",
    availability: "10 AM - 4 PM",
    price_per_hour: 80,
    image:
      "https://res.cloudinary.com/dx4rloqv5/image/upload/v1753365316/bookit-rooms/ebcsx4ee3erwiuv1eofs.jpg",
  },
  {
    userId: "_",
    name: "Training Room",
    description:
      "Equipped with the latest technology, perfect for training sessions and workshops.",
    sqft: 1500,
    capacity: 50,
    location: "Building D, Ground Floor",
    address: "1 Microsoft Way, Redmond, WA 98052",
    amenities: "Projector, Computers, Wi-Fi",
    availability: "9 AM - 6 PM",
    price_per_hour: 120,
    image:
      "https://res.cloudinary.com/dx4rloqv5/image/upload/v1753369333/room-4_k2fffh.jpg",
  },
  {
    userId: "_",
    name: "Quiet Meeting Room",
    description:
      "A small, quiet space ideal for private meetings and interviews.",
    sqft: 200,
    capacity: 10,
    location: "Building E, 4th Floor",
    address: "10 Downing St, Westminster, London SW1A 2AA, United Kingdom",
    amenities: "Conference Phone, Television, Wi-Fi",
    availability: "7 AM - 7 PM",
    price_per_hour: 60,
    image:
      "https://res.cloudinary.com/dx4rloqv5/image/upload/v1753363483/bookit-rooms/h94cfd4ngscpgdokff7x.jpg",
  },
];
