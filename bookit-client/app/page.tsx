import { RoomType } from "@/utils/definitions";
import RoomCard from "@/component/RoomCard";
import Heading from "@/component/Heading";
import { getAllRooms } from "@/app/actions/getAllRooms";
import { Suspense } from "react";
import { RoomsLoadingSkeleton } from "@/component/Skeletons";

export default async function Home() {
  const rooms: RoomType[] = await getAllRooms();

  return (
    <>
      <Heading title={"Available Rooms"} />
      <Suspense fallback={<RoomsLoadingSkeleton />}>
        {rooms.length > 0 ? (
          rooms.map((room, index) => <RoomCard key={index} room={room} />)
        ) : (
          <p>No rooms available at the moment</p>
        )}
      </Suspense>
    </>
  );
}
