import { useGetProductListQuery } from '@/lib/api'
import ProductCard from './product-card.component'

const ProductList = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetProductListQuery(
    {}
  )

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {isLoading && <p>Loading...</p>}
      {isError && (
        <p>
          Error:
          {(() => {
            if ('status' in error) return error.status
            if ('message' in error) return error.message
            return ''
          })()}
        </p>
      )}
      {isSuccess &&
        data &&
        data.products.length > 0 &&
        data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  )
}

export default ProductList
