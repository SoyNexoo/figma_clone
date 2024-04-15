'use client'
import LeftSidebar from "@/components/LeftSidebar";
import Live from "@/components/Live";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import { CollaborativeApp } from "@/utils/CollaborativeApp";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fabric } from 'fabric';
import { handleCanvasMouseDown, handleCanvaseMouseMove, handleResize, initializeFabric } from "@/lib/canvas";
import { ActiveElement } from "@/types/type";
import { useMutation, useStorage } from "../../liveblocks.config";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const isDrawing = useRef(false)
  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<string | null>('triangle')
  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: '',
    value: '',
    icon: '',
  })

  const canvasObjects = useStorage((state) => state.canvasObjects)
  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return;
    const { objectId } = object;
    const shapeData = object.toJSON();
    shapeData.objectId = objectId;
    const canvasObjects = storage.get('canvasObjects')
    canvasObjects.set(objectId, shapeData);
  }, [])

  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem);
    selectedShapeRef.current = elem?.value as string
  }

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef })
    canvas.on('mouse:down', (options: any) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef
      })
    })
    
    canvas.on('mouse:move', (options: any) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
        syncShapeInStorage
      })
    })

    window.addEventListener('resize', () => {
      handleResize({ fabricRef })
    })

  }, [])

  return (
    <main className="h-screen overflow-hidden">
      <Navbar activeElement={activeElement} handleActiveElement={handleActiveElement} />
      <section className="flex h-full flex-row">
        {/* <LeftSidebar /> */}
        <Live canvasRef={canvasRef} />
        {/* <RightSidebar /> */}
      </section>
    </main>
  );
}
