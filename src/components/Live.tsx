import LiveCursors from "./cursor/LiveCursors"
import { useLiveFunctions } from "@/utils/LiveFunctions";
import CursorChat from "./cursor/CursorChat";
import VoiceChat from "./voiceChat/VoiceChat";
import React from "react";
import Comments from "./comments/Comments";

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement> | null
}

const Live = ({canvasRef}: Props) => {
  const {functions, state, presence} = useLiveFunctions()
  return (
    <div
    id="canvas"
      onPointerMove={functions.handlePointerMove}
      onPointerLeave={functions.handlePointerLeave}
      onPointerDown={functions.handlePointerDown}
      className="h-screen w-full flex justify-center items-center text-center"
    >
      <canvas ref={canvasRef}/>
      {presence.cursor && (
        <CursorChat cursor={presence.cursor} cursorState={state.cursorState} setCursorState={state.setCursorState} updateMyPresence={presence.updateMyPresence} />
      )}
      <LiveCursors others={presence.others} />
      <Comments />
    </div>
  )
}

export default Live