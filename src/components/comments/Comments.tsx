import { ClientSideSuspense } from '@liveblocks/react'
import React from 'react'
import { CommentsOverlay } from './CommentsOverlay'

const Comments = () => {
  return (
    <ClientSideSuspense fallback={null}>{() => <CommentsOverlay />}</ClientSideSuspense>
  )
}

export default Comments