import getMyRooms from "@/app/actions/getMyRooms";
import Heading from "@/component/Heading";
import MyRoomCard from "@/component/MyRoomCard";
import { RoomType } from "@/utils/definitions";
import React from "react";

const MyRoomsPage = async () => {
  const rooms: RoomType[] = await getMyRooms(); // Assuming you have a function to fetch user's rooms

  return (
    <>
      <Heading title="My Rooms" />
      {rooms.length > 0 ? (
        rooms.map((room, index) => <MyRoomCard room={room} key={index} />)
      ) : (
        <p>No rooms found</p>
      )}
    </>
  );
};

export default MyRoomsPage;
