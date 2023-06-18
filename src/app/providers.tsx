'use client'
import { TelegramProvider } from './telegram.provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TelegramProvider>
      {children}
    </TelegramProvider>
  )
}
