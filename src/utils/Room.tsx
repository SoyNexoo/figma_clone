'use client'

import { ReactNode } from "react"
import { RoomProvider } from "../../liveblocks.config"
import { ClientSideSuspense } from "@liveblocks/react"
import { LiveMap } from "@liveblocks/client";
import Loader from "@/components/Loader";

export function Room({ children }: { children: ReactNode }) {
  return (
    <RoomProvider id="my-room"
    initialStorage={{
      canvasObjects: new LiveMap()
    }}
    initialPresence={{
      cursor: null, cursorColor: null, editingText: null
    }}
    >
      <ClientSideSuspense fallback={<Loader/>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}