'use client'
import Live from "@/components/Live";
import { CollaborativeApp } from "@/utils/CollaborativeApp";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl">Liveblocks Figma Clone</h1>
      <Live />
    </div>
  );
}
