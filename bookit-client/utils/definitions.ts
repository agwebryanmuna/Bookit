export interface RoomType {
  _id: string;
  userId: string;
  name: string;
  description: string;
  sqft: number;
  capacity: number;
  location: string;
  address: string;
  amenities: string;
  availability: string;
  price_per_hour: number;
  image: string;
}

export interface BookingType {
  _id: string;
  checkIn: string;
  checkOut: string;
  userId: string;
  room: RoomType;
  roomId:string;
}

export interface SessionResponse {
  success: boolean;
  error: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
}
