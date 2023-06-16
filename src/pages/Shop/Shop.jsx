import React from 'react'
import useGetProducts from '../../hooks/useGetProducts'

const Shop = () => {
  const [allProducts, refetch] = useGetProducts()
  console.log(allProducts)
  return (
    <div>Shop</div>
  )
}

export default Shop