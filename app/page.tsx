'use client'

import { Provider } from 'react-redux'
import { persistor, store } from '@/lib/store'
import { PersistGate } from 'redux-persist/integration/react'
import ProductList from './components/product-list.component'

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center bg-white p-8 pb-20">
          <main className="row-start-2 flex flex-col items-center sm:items-start">
            <ProductList />
          </main>
        </div>
      </PersistGate>
    </Provider>
  )
}
