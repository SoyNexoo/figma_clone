import React from 'react';

const useCursorChatFunctions = ({ updateMyPresence, setCursorState, CursorMode, cursorState }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({ message: e.target.value });
    setCursorState({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: e.target.value
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e)
    if (e.key === 'Enter') {
      setCursorState({
        mode: CursorMode.Chat,
        previousMessage: cursorState.message,
        message: ''
      });
    } else if (e.key === 'Escape') { // Corregido aquí
      setCursorState({
        mode: CursorMode.Hidden
      });
    }
  };

  return { handleChange, handleKeyDown };
};

export default useCursorChatFunctions;