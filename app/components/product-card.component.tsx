/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image'
import React from 'react'
import discountBadge from '@/public/assets/icons/discount-badge.svg'
import productImage from '@/public/assets/images/tshirt.png'
import cartIcon from '@/public/assets/icons/cart.svg'
import quickViewIcon from '@/public/assets/icons/preview.svg'
import plusIcon from '@/public/assets/icons/plus.svg'
import trashIcon from '@/public/assets/icons/trash.svg'
import { Product } from '@/common/interfaces/api.interface'
import useProduct from './useProduct.hook'

type ProductCardProps = {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props

  const {
    handleAddToCart,
    handleQuickView,
    handleRemoveFromCart,
    handleViewDetails,
    getDiscountedPrice,
    getDiscounted,
    getItemQuantity,
  } = useProduct(product)

  return (
    <div
      onClick={handleViewDetails}
      className={`group relative inset-0 h-[332px] w-[210px] rounded-lg transition-all duration-200 ease-in-out hover:bg-white hover:p-1 ${getItemQuantity() && 'p-1'} hover:shadow-card ${getItemQuantity() && 'shadow-card'}`}
    >
      {getDiscounted() ? (
        <button className="absolute left-[-4px] top-3 z-10">
          <Image src={discountBadge} alt="Discount Badge" />
          <p className="absolute left-2 top-1 text-center text-[12px] font-[525] leading-[14px] tracking-[-0.02em]">
            {`- ৳ ${getDiscounted()}`}
          </p>
        </button>
      ) : null}
      <div className="relative h-[210px] w-full rounded-lg bg-[#eae7e6]">
        <Image
          className="h-48 w-full object-center"
          src={product.thumbnail ?? productImage}
          width={210}
          height={210}
          alt="T-shirt"
        />

        <div
          className={`absolute bottom-0 flex h-full w-full flex-col items-center justify-end gap-2 rounded-lg p-3 opacity-0 backdrop-brightness-75 transition-opacity duration-300 ease-in-out group-hover:opacity-100 ${getItemQuantity() && 'opacity-100'}`}
        >
          {getItemQuantity() ? (
            <div className="flex h-[36px] w-[186px] items-center justify-between rounded-md bg-[rgb(3,166,41)] p-[6px] px-4 py-2 text-sm text-white">
              <button onClick={handleRemoveFromCart} className="cursor-pointer">
                <Image src={trashIcon} alt="Trash Icon" />
              </button>
              <p className="text-[14px] font-[475]">
                {getItemQuantity()} Added in Cart
              </p>

              <button onClick={handleAddToCart}>
                <Image src={plusIcon} alt="Plus Icon" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex h-[36px] w-[186px] items-center justify-center gap-1 rounded-md border-[1.5px] border-white border-opacity-30 bg-white !bg-opacity-30 text-sm text-white backdrop-blur-[8px]"
            >
              <Image src={cartIcon} alt="Quick View" />
              <p className="text-[14px] font-[475]">Add to Cart</p>
            </button>
          )}

          <button
            onClick={handleQuickView}
            className="flex h-[36px] w-[186px] items-center justify-center gap-1 rounded-md border-[1.5px] border-white border-opacity-30 bg-white !bg-opacity-30 text-sm text-white backdrop-blur-[8px]"
          >
            <Image src={quickViewIcon} alt="Quick View" />
            <p className="text-[14px] font-[475]">Quick View</p>
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100%-210px)] w-full flex-col justify-between p-2 !pb-[10px]">
        <div>
          <h2
            title={product?.brand ?? ''}
            className="max-w-full overflow-hidden text-ellipsis text-nowrap text-sm font-normal leading-[20px] text-[#5A6573]"
          >
            {product?.brand ?? 'No Brand'}
          </h2>
          <p
            title={product?.title ?? ''}
            className="text-md line-clamp-2 max-w-full overflow-hidden text-ellipsis text-wrap font-[525] text-[#1A2B3D]"
          >
            {product?.title ?? 'No Title'}
          </p>
        </div>

        <div className="mt-2 flex flex-row items-center">
          <span className="max-w-full text-[20px] text-xl font-[475] leading-[22px] tracking-[-0.01em] text-[#1882FF]">
            ৳{getDiscountedPrice().toFixed(1)}
          </span>
          {getDiscounted() ? (
            <span className="ml-2 text-sm font-normal leading-[16px] tracking-[-0.01em] text-[#77818C] line-through">
              ৳{product?.price?.toFixed(1) ?? '0'}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
