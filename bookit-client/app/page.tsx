import { Room } from "@/utils/definitions";
import RoomCard from "@/component/RoomCard";
import Heading from "@/component/Heading";
import { getAllRooms } from "@/app/actions/getAllRooms";


export default async function Home() {
  
  const rooms:Room[] = await getAllRooms()
  
  return (
   <>
     <Heading title={'Available Rooms'}/>
     {
       rooms.length > 0 ? (
         rooms.map((room, index) => (
           <RoomCard key={index} room={room} />
       ))) : <p>No rooms available at the moment</p>
     }
   </>
  );
}
