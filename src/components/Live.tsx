import LiveCursors from "./cursor/LiveCursors"
import { useLiveFunctions } from "@/utils/LiveFunctions";
import CursorChat from "./cursor/CursorChat";
import { CollaborativeApp } from './../utils/CollaborativeApp';
import VoiceChat from "./voiceChat/VoiceChat";

const Live = () => {
  const {functions, state, presence} = useLiveFunctions()
  return (
    <div
      onPointerMove={functions.handlePointerMove}
      onPointerLeave={functions.handlePointerLeave}
      onPointerDown={functions.handlePointerDown}
      className="h-screen w-full flex justify-center items-center text-center border-2 border-green-500"
    >
      <div className="absolute top-2"><CollaborativeApp /></div>
      <div className="flex flex-col">

      <h1 className="text-2xl">Liveblocks Figma Clone</h1>
      <span className="text-xl">by Julián Luque :)</span>
      <VoiceChat />
      </div>
      {presence.cursor && (
        <CursorChat cursor={presence.cursor} cursorState={state.cursorState} setCursorState={state.setCursorState} updateMyPresence={presence.updateMyPresence} />
      )}
      <LiveCursors others={presence.others} />
    </div>
  )
}

export default Live