interface ValidationFieldError {
  field: string
  message: string
}

export interface ApiErrorResponse {
  success: boolean
  status: number
  message: string
  errors: ValidationFieldError[]
}

export interface ApiSuccessResponse<T = unknown> {
  success: boolean
  status: number
  message: string
  data?: T
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: {
    rating: number
    comment: string
    date: string // Date format (ISO string)
    reviewerName: string
    reviewerEmail: string
  }[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string // Date format (ISO string)
    updatedAt: string // Date format (ISO string)
    barcode: string
    qrCode: string
  }
  images: string[]
  thumbnail: string
}
