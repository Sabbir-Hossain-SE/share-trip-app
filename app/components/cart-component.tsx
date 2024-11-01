/* eslint-disable no-alert */
import { useGetCheckoutItems } from '@/lib/features/ProductState/ProductCartSelectors'
import Image from 'next/image'
import React, { useMemo } from 'react'
import circularPlusIcon from '@/public/assets/icons/circular-plus.svg'
import circularMinusIcon from '@/public/assets/icons/circular-minus.svg'
import {
  addToCartProduct,
  removeFromCartProduct,
  removeProductById,
} from '@/lib/features/ProductState/ProductCartSlice'
import { Product } from '@/common/interfaces/api.interface'
import { useAppDispatch } from '@/lib/hooks'

type CartProps = {
  isOpen: boolean
  closeDialog: () => void
}

const Cart: React.FC<CartProps> = ({ isOpen, closeDialog }) => {
  const catItems = useGetCheckoutItems()
  const dispatch = useAppDispatch()

  const totalPrice = useMemo(() => {
    return (
      Object.values(catItems)
        .reduce(
          (acc, curr) => acc + Number(curr.product.price) * curr.quantity,
          0
        )
        .toFixed(2) || 0
    )
  }, [catItems])

  const totalDiscount = useMemo(() => {
    return (
      Object.values(catItems)
        .reduce(
          (acc, curr) =>
            acc +
            ((Number(curr.product.price) * curr.product.discountPercentage) /
              100) *
              curr.quantity,
          0
        )
        .toFixed(2) || 0
    )
  }, [catItems])

  const handleAddToCart = (product: Product) => {
    dispatch(addToCartProduct(product))
  }
  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCartProduct(product))
  }

  return (
    <div
      className={`fixed inset-0 z-20 transform transition-opacity duration-300 ease-in-out ${
        isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Shopping cart
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={closeDialog}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                        >
                          <path
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {Object.values(catItems).length === 0 && (
                          <li className="py-6">
                            <p className="text-center text-gray-500">
                              No items in cart
                            </p>
                          </li>
                        )}
                        {Object.values(catItems).map((item) => (
                          <li
                            key={`item- ${item.product.id}`}
                            className="flex py-6"
                          >
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <Image
                                src={item.product.thumbnail}
                                width={94}
                                height={94}
                                alt={item.product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <button className="line-clamp-2 max-w-[132px] overflow-hidden text-ellipsis text-wrap text-left text-indigo-600 hover:text-indigo-500">
                                      {item.product.title}
                                    </button>
                                  </h3>
                                  <div className="flex flex-col items-end">
                                    <p className="text-nowrap text-end text-sm font-normal leading-[20px] text-[#5A6573]">
                                      {item.quantity} x ৳{item.product.price}
                                    </p>
                                    <p className="ml-2">
                                      ৳
                                      {(
                                        item.quantity * item.product.price
                                      ).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex w-full justify-between">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      dispatch(
                                        removeProductById(item.product.id)
                                      )
                                    }
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                  <div className="flex w-[calc(100%-72px)] justify-end gap-6">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAddToCart(item.product)
                                      }
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      <Image
                                        src={circularPlusIcon}
                                        width={20}
                                        height={20}
                                        alt="add to cart"
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRemoveFromCart(item.product)
                                      }
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      <Image
                                        src={circularMinusIcon}
                                        width={20}
                                        height={20}
                                        alt="remove from cart"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p className="font-normal">Subtotal</p>
                    <p className="text-gray-500">৳{totalPrice}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p className="font-normal">Applicable Discount</p>
                    <p className="font-normal text-gray-500">
                      -৳
                      {totalDiscount}
                    </p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Payable Amount</p>
                    <p className="">
                      ৳{(Number(totalPrice) - Number(totalDiscount)).toFixed(2)}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <button
                      disabled={Object.values(catItems).length === 0}
                      onClick={() =>
                        alert('This feature is not implemented yet')
                      }
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={closeDialog}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
