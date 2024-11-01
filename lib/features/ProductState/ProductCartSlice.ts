/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */

'use client'

import { APP_SLICES } from '@/common/constants/rtk.constant'
import { Product } from '@/common/interfaces/api.interface'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ItemTypes = {
  product: Product
  quantity: number
}

export interface ProductCartState {
  items: { [key: string]: ItemTypes }
}
const initialState: ProductCartState = {
  items: {},
}

export const productCartSlice = createSlice({
  name: APP_SLICES.PRODUCT_CART,
  initialState,
  reducers: {
    addToCartProduct: (state, action: PayloadAction<Product>) => {
      let tempItems = { ...state.items }
      if (!tempItems[String(action.payload.id)])
        tempItems = {
          ...tempItems,
          [action.payload.id]: { product: action.payload, quantity: 1 },
        }
      else if (
        tempItems[String(action.payload.id)] &&
        tempItems[String(action.payload.id)].product.stock >
          tempItems[String(action.payload.id)].quantity
      )
        tempItems[action.payload.id].quantity += 1
      else {
        alert('Out of stock')
        return
      }
      state.items = tempItems
    },
    removeFromCartProduct: (state, action) => {
      const tempItems = { ...state.items }
      if (!tempItems[action.payload.id]) return
      if (tempItems[action.payload.id].quantity === 1) {
        delete tempItems[action.payload.id]
        state.items = tempItems
        return
      }
      tempItems[action.payload.id].quantity -= 1
      state.items = tempItems
    },

    removeProductById: (state, action) => {
      const tempItems = { ...state.items }
      if (!tempItems[action.payload]) return
      if (tempItems[action.payload].quantity >= 1) {
        delete tempItems[action.payload]
        state.items = tempItems
      }
    },
  },
})

export const { addToCartProduct, removeFromCartProduct, removeProductById } =
  productCartSlice.actions
