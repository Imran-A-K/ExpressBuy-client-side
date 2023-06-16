import React from 'react'
import bestSellers from './data'
import { Item } from '../../../Components/BestSellers/Item'

const BestSellers = () => {
    
  return (
    <>
      <div className='max-sm:pt-[20px] mt-14'>
      <div className='flex justify-center items-center'>
        <h1 className='text-5xl lg:text-4xl md:text-3xl font-bold text-slate-900 filter
         drop-shadow-lg'>Best Sellers</h1>
      </div>
        <div className='mx-auto'>
        <div className={`grid items-center justify-items-center gap-7 lg:gap-8 mt-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
          {bestSellers.items?.map((item, i) => (
            <Item item={item} key={i} />
          ))}
        </div>
        </div>
      </div>
   </>
  )
}

export default BestSellers