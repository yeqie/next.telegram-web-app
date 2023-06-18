'use client'
import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { TelegramWebApps } from 'telegram-webapps-types'

export const TelegramContext = createContext<TelegramWebApps.WebApp | any>({})
export const useTelegram = () => useContext(TelegramContext)

export const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
  const [webApp, setWebApp] = useState<TelegramWebApps.WebApp | any>({})

  useEffect(() => {
    const telegram = (window as any).Telegram.WebApp
    if (telegram) {
      telegram.ready()
      setWebApp(telegram)
    }
  }, [])

  const value = useMemo(() => {
    return webApp || {}
  }, [webApp])

  if (!webApp.platform)
    return null

  if (webApp.platform === 'unknown' && process.env.NODE_ENV !== 'development')
    return (
      <main className="wrapper">
        <h2 className="text-2xl font-bold">Not Allowed</h2>
        <p className="text-neutral-400">This application is only available through the Telegram Bot</p>
        <a className="inline-block bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-800/50 outline-none rounded-md text-sm font-semibold mt-2 px-4 py-2 transition-[background,box-shadow]" href="https://t.me/aucepam_bot" rel="noreferrer" target="_blank">
          @aucepam.bot
        </a>
      </main>
    )

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  )
}
