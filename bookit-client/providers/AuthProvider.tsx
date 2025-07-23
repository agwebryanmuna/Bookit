'use client'

import { AuthContextProvider } from '@/context/authContext'
import React, { ReactNode } from 'react'

export const AuthProvider = ({children}:{children:ReactNode}) => {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  )
}
