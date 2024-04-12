import { useCallback, PointerEvent, useState, useEffect, KeyboardEvent } from "react";
import { useMyPresence, useOthers } from "../../liveblocks.config";
import { CursorMode } from "@/types/type";

export const useLiveFunctions = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState({
    mode: CursorMode.Hidden,

  })
  const handlePointerMove = useCallback((event: PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { ...cursor, x, y } });
  }, [cursor, updateMyPresence]);

  const handlePointerLeave = useCallback((event: PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden })
    updateMyPresence({ cursor: null, message: null });
  }, [updateMyPresence]);

  const handlePointerDown = useCallback((event: PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { ...cursor, x, y } });
  }, [cursor, updateMyPresence]);

  useEffect(() => {
    const onKeyUp = (e: any) => {
      if (e.key === '/') {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: ''
        })
      } else if (e.key === 'Escape') {
        updateMyPresence({ message: '' })
        setCursorState({ mode: CursorMode.Hidden })
      }
    }

    const onKeyDown = (e: any) => {
      if (e.key === '/') {
        e.preventDefault()
      }
    }

    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('keydown', onKeyDown)
    }

  }, [updateMyPresence])
  return {
    functions: { handlePointerMove, handlePointerLeave, handlePointerDown },
    state: { cursorState, setCursorState },
    presence: { cursor, others, updateMyPresence },
  };
};