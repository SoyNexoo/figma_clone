"use client";

import { Composer, Thread } from "@liveblocks/react-comments";
import { useThreads } from "../../../liveblocks.config";

export function CommentsOverlay() {
  const { threads } = useThreads();

  return (
    <div>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
      <Composer />
    </div>
  );
}