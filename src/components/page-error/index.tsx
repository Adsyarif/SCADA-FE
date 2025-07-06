import React from 'react'
import { AxiosError } from 'axios'

interface FullPageErrorProps {
  error: unknown
}
export function FullPageError({ error }: FullPageErrorProps) {
  let message = 'An unexpected error occurred.'

  if (error instanceof AxiosError) {
    const data = error.response?.data as any
    if (data?.message && typeof data.message === 'string') {
      message = data.message
    } else if (error.message) {
      message = error.message
    }
  }
  else if (error instanceof Error) {
    message = error.message
  }
  else if (typeof error === 'string') {
    message = error
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="p-6 bg-white text-center max-w-xs">
        <h2 className="text-xl font-semibold mb-2">Oops!</h2>
        <p className="text-red-600">{message}</p>
      </div>
    </div>
  )
}
