import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { APP_ENV } from '@/common/constants/app.constant'
import { persistStore, persistReducer } from 'redux-persist'
import { setupListeners } from '@reduxjs/toolkit/query'
import storage from 'redux-persist/lib/storage'
import { APP_SLICES } from '@/common/constants/rtk.constant'
import { productCartSlice } from './features/ProductState/ProductCartSlice'
import { appAPISlice } from './api'

export const rootReducers = combineReducers({
  [appAPISlice.reducerPath]: appAPISlice.reducer,
  productCart: productCartSlice.reducer,
})

// Redux Persist Config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [APP_SLICES.PRODUCT_CART], // Only persist specific reducers
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      appAPISlice.middleware,
    ]),
  devTools: APP_ENV.IS_DEV,
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)
