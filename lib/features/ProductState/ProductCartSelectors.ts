/* eslint-disable import/prefer-default-export */
import { RootState } from '@/common/types/redux'
import { useSelector } from 'react-redux'

export const useGetCheckoutItems = () => {
  return useSelector((state: RootState) => state.productCart.items)
}
