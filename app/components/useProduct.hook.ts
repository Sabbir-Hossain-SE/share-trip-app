/* eslint-disable no-alert */
import { Product } from '@/common/interfaces/api.interface'
import { useGetCheckoutItems } from '@/lib/features/ProductState/ProductCartSelectors'
import {
  addToCartProduct,
  removeFromCartProduct,
} from '@/lib/features/ProductState/ProductCartSlice'
import { useDispatch } from 'react-redux'

const useProduct = (product: Product) => {
  const dispatch = useDispatch()
  const checkoutItems = useGetCheckoutItems()

  const getDiscounted = (): number => {
    if (product.discountPercentage)
      return parseFloat(
        ((product.discountPercentage / 100) * product.price).toFixed(1)
      )

    return 0
  }
  const getDiscountedPrice = (): number => {
    if (getDiscounted())
      return parseFloat((product.price - getDiscounted()).toFixed(1))
    return product.price
  }
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(addToCartProduct(product))
  }
  const handleRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(removeFromCartProduct(product))
  }

  const handleQuickView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    alert('Quick view in not implemented yet')
  }
  const handleViewDetails = () => {
    alert('View details in not implemented yet')
  }

  const getItemQuantity = () => {
    if (checkoutItems[product.id])
      return checkoutItems[product.id.toString()].quantity
    return 0
  }
  return {
    handleAddToCart,
    handleQuickView,
    handleRemoveFromCart,
    handleViewDetails,
    getDiscountedPrice,
    getDiscounted,
    getItemQuantity,
  }
}

export default useProduct
