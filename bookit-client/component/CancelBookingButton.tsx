"use client";

import cancelBooking from "@/app/actions/cancelBooking";
import { BookingType } from "@/utils/definitions";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CancelBookingButton = ({ bookingId, bookingUserId }: { bookingId: string, bookingUserId:string }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancelBooking = async () => {
    setLoading(true);
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking"
    );
    if (confirmed) {
      try {
        await cancelBooking({bookingId, bookingUserId});
        toast.success("Booking canceled successfully!");
      } catch (error) {
        console.log("Failed to cancel booking");
        toast.error("Failed to cancel booking");
      }
    }
    setLoading(false);
  };

  return (
    <button
      disabled={loading}
      onClick={handleCancelBooking}
      className={`bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      } `}
    >
      Cancel Booking
    </button>
  );
};

export default CancelBookingButton;
