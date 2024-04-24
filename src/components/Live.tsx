import LiveCursors from "./cursor/LiveCursors";
import CursorChat from "./cursor/CursorChat";
import VoiceChat from "./voiceChat/VoiceChat";
import React, { useCallback, useState, PointerEvent, useEffect } from "react";
import Comments from "./comments/Comments";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { shortcuts } from "@/constants";
import { CursorMode, CursorState } from "@/types/type";
import { useMyPresence, useOthers } from "../../liveblocks.config";

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement> | null;
  undo: () => void;
  redo: () => void;
};

const Live = ({ canvasRef, undo, redo}: Props) => {
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const others = useOthers()

  const handleContextMenuItemClick = useCallback((name: string) => {
    switch (name) {
      case "Chat":
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: "",
          message: "",
        });
        break;
      case 'Undo':
        undo()
        break
      case 'Redo':
        redo()
        break
      default:
        break;
    }
  }, []);


  const [{cursor}, updateMyPresence] = useMyPresence() as any

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

  const handlePointerMove = useCallback((event: PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { ...cursor, x, y } });
  }, [cursor, updateMyPresence]);


  const handlePointerDown = useCallback((event: PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { ...cursor, x, y } });
  }, [cursor, updateMyPresence]);

  const handlePointerLeave = useCallback((event: PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden })
    updateMyPresence({ cursor: null, message: null });
  }, [updateMyPresence]);


  return (
    <ContextMenu>
      <ContextMenuTrigger
        id="canvas"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        className="h-full relative w-full flex flex-1 justify-center items-center"
      >
        <canvas ref={canvasRef} />
        {cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />
        )}
        <LiveCursors/>
        <Comments />
      </ContextMenuTrigger>
      <ContextMenuContent className="right-menu-content">
        {shortcuts.map((ele) => (
          <ContextMenuItem
            key={ele.key}
            onClick={() => {handleContextMenuItemClick(ele.name)}}
          >
            <p>{ele.name}</p>
            <p className="text-sm text-primary-grey-300">{ele.shortcut}</p>
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Live;
