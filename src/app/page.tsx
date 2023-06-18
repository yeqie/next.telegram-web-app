'use client'
import { useState, useEffect, useCallback } from 'react'
import { useTelegram } from './telegram.provider'

export default function Home() {
  const [counter, setCounter] = useState<number>(0)
  const telegram = useTelegram()

  const handleMainButtonClick = useCallback(() => {
    telegram.showAlert(`You clicked ${counter} times!`)
  }, [counter])

  useEffect(() => {
    telegram.MainButton.setParams({
      text: 'CLICK ON ME',
      is_active: true,
      is_visible: true
    })
  }, [])

  useEffect(() => {
    telegram.onEvent('mainButtonClicked', handleMainButtonClick)
    return () => telegram.offEvent('mainButtonClicked', handleMainButtonClick)
  }, [handleMainButtonClick])

  return (
    <>
      <h2 className="text-2xl font-bold">Hello, {telegram.initDataUnsafe?.user?.first_name || 'user'}</h2>
      <p className="text-neutral-400">Let&apos;s create a Telegram Web App!</p>
      <div className="flex gap-2 mt-2">
        <div className="bg-neutral-800 rounded-lg text-2xl px-4 py-2 grow">
          <span className="block text-xs text-neutral-400 font-semibold tracking-wider uppercase">Counter</span>
          {counter}
        </div>
        <button className="bg-neutral-800 hover:bg-neutral-800/50 focus:ring-4 focus:ring-neutral-800/50 outline-none rounded-lg text-2xl px-6 transition-[background,box-shadow]" onClick={() => setCounter(counter + 1)}>
          +
        </button>
      </div>
    </>
  )
}
