import { BookingType } from "@/utils/definitions";
import React from "react";
import getMyBookings from "../actions/getMyBookings";
import BookedRoomCard from "@/component/BookedRoomCard";
import Link from "next/link";
import Heading from "@/component/Heading";

const BookingsPage = async () => {
  const bookings: BookingType[] = await getMyBookings();

  return (
    <>
      <Heading title="My Bookings" />
      {bookings.length === 0 && (
        <p>
          No Bookings added yet.{" "}
          <Link href="/" className="text-blue-500 underline">
            View rooms
          </Link>
        </p>
      )}
      {bookings.map((booking, index) => (
        <BookedRoomCard key={index} booking={booking} />
      ))}
    </>
  );
};
export default BookingsPage;
