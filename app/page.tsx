'use client'

import { Provider } from 'react-redux'
import { persistor, store } from '@/lib/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useState } from 'react'
import cartIcon from '@/public/assets/icons/cart.svg'
import Image from 'next/image'
import ProductList from './components/product-list.component'
import Cart from './components/cart-component'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentCartItemCount, setCurrentCartItemCount] = useState(1)

  const closeDialog = () => {
    setIsOpen(false)
  }

  const handleOpenDialog = () => {
    setIsOpen(true)
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center bg-white p-8 pb-20">
          <main className="row-start-2 flex flex-col items-center sm:items-start">
            <ProductList setCurrentCartItemCount={setCurrentCartItemCount} />
            <Cart isOpen={isOpen} closeDialog={closeDialog} />
            {!isOpen && currentCartItemCount && (
              <button
                onClick={handleOpenDialog}
                className={`${currentCartItemCount && 'animate-bounce'} fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500 text-white`}
              >
                <span className="absolute right-[-2px] top-[-2px] flex h-5 min-w-5 items-center justify-center rounded-md bg-violet-600 text-[10px] text-sm font-normal text-white">
                  {currentCartItemCount}
                </span>
                <Image width={24} src={cartIcon} alt="Cart View" />
              </button>
            )}
          </main>
        </div>
      </PersistGate>
    </Provider>
  )
}
