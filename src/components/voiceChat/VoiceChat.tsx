import Peer from 'peerjs';
import React, { useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid'; // Importa la función uuid

const VoiceChat = () => {
  const currentAudioRef = useRef<HTMLAudioElement>(null);
  const peerInstance = useRef<any>(null);
  const localStreamRef = useRef<MediaStream | null>(null); // Ref to store local stream

  function onRemoteStream(remoteStream: MediaStream) {
    if (currentAudioRef.current) {
      currentAudioRef.current.srcObject = remoteStream;
      currentAudioRef.current.play();
    }
  }

  useEffect(() => {
    const peer = new Peer();
    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then((stream) => {
          call.answer(stream);
          call.on("stream", onRemoteStream);
        })
        .catch((error) => {
          console.error('Error answering call:', error);
        });
    });

    peerInstance.current = peer;

    return () => {
      // Cleanup code if necessary
      peer.disconnect();
    };
  }, []);


  const call = () => {
    const roomId = uuid();
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((stream) => {
        localStreamRef.current = stream;
        const call = peerInstance.current.call(roomId, stream);
        call.on("stream", onRemoteStream);
      })
      .catch((error) => {
        console.error('Error starting local stream:', error);
      });
  };

  return (
    <div>
      <button onClick={call}>VoiceChat</button>
      <audio ref={currentAudioRef} controls></audio>
    </div>
  );
};

export default VoiceChat;