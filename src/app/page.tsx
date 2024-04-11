import { CollaborativeApp } from "@/utils/CollaborativeApp";
import { Room } from "@/utils/Room";
import Image from "next/image";

export default function Home() {
  return (
   <Room>
    <CollaborativeApp></CollaborativeApp>
   </Room>
  );
}
