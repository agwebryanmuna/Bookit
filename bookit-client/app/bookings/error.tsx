'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({error, reset,}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  
  return (
    <div className='h-[calc(100vh-80px)] flex flex-col gap-3 items-center justify-center'>
      <h2>{error.message}</h2>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
      >
        Try again
      </button>
    </div>
  )
}
