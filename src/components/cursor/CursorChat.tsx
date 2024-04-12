import { CursorChatProps, CursorMode } from "@/types/type"
import CursorSVG from "../../../public/assets/CursorSVG"
import useCursorChatFunctions from "@/utils/CursorChatFunctions"

const CursorChat = ({ cursor, cursorState, setCursorState, updateMyPresence }: CursorChatProps) => {
  const { handleChange, handleKeyDown } = useCursorChatFunctions({ updateMyPresence, setCursorState, CursorMode, cursorState })
  return (
    <div className="absolute top-0 left-0" style={{ transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)` }}>
      {cursorState.mode == CursorMode.Chat && (

        <>
          <CursorSVG color='#000' />
          <div onKeyUp={(e) => e.stopPropagation()} className="absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]">
            {cursorState.previousMessage && (
              <div>{cursorState.previousMessage}</div>
            )}
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={cursorState.previousMessage ? '' : 'Type a message...'}
              autoFocus={true}
              className="z-10 w-60 border-none bg-transparent text-white placeholder-blue-500 outline-none"
              value={cursorState.message}
              maxLength={50}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default CursorChat