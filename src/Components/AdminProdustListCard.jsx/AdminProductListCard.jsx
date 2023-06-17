import React from 'react'

const AdminProductListCard = ({product}) => {
    const {img, name, seller,quantity,ratings, price } = product
    return (
    <div className='w-[300px] h-[510px] relative border rounded-[8px] border-gray-300'>
    <img src={img} className=" w-[286px] h-[286px] rounded-[8px] m-[7px]" /> 
     <div className='ml-[14px]'>
    <h6 className='mt-0 mb-0 font-normal text-base leading-5 tracking-tighter text-gray-800'>{name}</h6>
     <p className="mt-[5px]">Price : ${price}</p>
    <p className="mt-[5px]">Manufacturer: {seller}</p>
    <p className="mt-[5px]">Rating: {ratings} Stars</p>
     </div>
     
 </div>
    )
}

export default AdminProductListCard