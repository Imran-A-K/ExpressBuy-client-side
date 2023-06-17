import React from 'react'
import useCart from '../../../../hooks/useCart';
import ReviewOrder from '../../../../Components/Cart/ReviewOrder/ReviewOrder';
import useTotalCartPrice from '../../../../hooks/useTotalCartPrice';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';

const Cart = () => {
  const [cart, refetch] =useCart()
  // console.log(cart)
  const [ cartDetails, reload] = useTotalCartPrice()
  console.log(cartDetails)
  const handleRemoveFromCart = (id) =>{
      // const remaining = cart.filter(product => product._id !== id);
      // setCart(remaining);
      // removeFromDb(id);

  }
  const handleClearCart = ()=>{
    // setCart([]);
    // deleteShoppingCart();
  }
  return (
    <div className="grid grid-cols-[3fr_1fr] gap-8">
      <div className="mx-auto my-50">
        {
            cart.map(product => <ReviewOrder
            key={product._id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
            ></ReviewOrder>)
      }
      </div>
      <div className="mt-1 relative rounded-lg">
        <div className='fixed pl-8 bg-slate-200 w-80'>
        <h2 className='font-semibold text-2xl pb-6 pt-8'>Order Summary</h2>
      <p className='text-lg font-medium pb-2'>Total Products: {cartDetails.totalProducts}</p>
      <p className='text-lg font-medium pb-2'>Total Price: ${cartDetails.totalPrice}</p>
      <p className='text-lg font-medium pb-2'>Shipping Charge: ${cartDetails.totalShipping}</p>
      <p className='text-lg font-medium pb-6'>Net pay: ${cartDetails.totalPrice + cartDetails.totalShipping}</p>
     <div className='flex items-center mb-3 gap-3'>
     <button className='btn bg-red-500 hover:bg-red-600 hover:text-white'><span className='flex gap-2 capitalize'>Clear Cart < FaTrashAlt /> </span></button>
      <button className='btn bg-blue-500 hover:bg-blue-600 hover:text-white'><span className='flex gap-2 capitalize'>Confirm < FaCheck /> </span></button>
     </div>
        </div>
      </div>
    </div>
  )
}

export default Cart