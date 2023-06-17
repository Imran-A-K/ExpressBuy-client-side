import React from 'react'
import useCart from '../../../../hooks/useCart';
import ReviewOrder from '../../../../Components/Cart/ReviewOrder/ReviewOrder';
import useTotalCartPrice from '../../../../hooks/useTotalCartPrice';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import useAxiosInterceptor from '../../../../hooks/useAxiosInterceptor';
import Swal from 'sweetalert2';
import useAuthentication from '../../../../hooks/useAuthentication';

const Cart = () => {
  const [cart, refetch] =useCart()
  console.log(cart)
  const {user} = useAuthentication();
  const [ cartDetails, reload] = useTotalCartPrice()
  const [axiosBase] = useAxiosInterceptor(); 
  // console.log(cartDetails)
  
  const handleRemoveFromCart = (id) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "This product will be deleted from your cart!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I am sure!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosBase.delete(`http://localhost:4000/customer-selected-product?id=${id}`)
        .then(async(response) => {
          if(response.data.deletedCount>0){
          await Swal.fire(
          'Deleted!',
          'The product has been deleted from your cart.',
          'success'
        )
        refetch();
        reload();
          }
          
        })
        
      }
    }) 

  }
  const handleClearCart = ()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "All the products will be deleted from your cart!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I am sure!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosBase.delete(`http://localhost:4000/customer-cart-products?customerEmail=${user?.email}`)
        .then(async(response) => {
          if(response.data.deletedCount>0){
          await Swal.fire(
          'Deleted!',
          'All products has been deleted from your cart.',
          'success'
        )
        refetch();
        reload();
          }
          
        })
        
      }
    }) 
  }
  const confirmOrder = () => {
    const customerOrder ={email: user?.email,
     name: user?.displayName,
      date: new Date(),
      totalPrice : cartDetails.totalPrice,
      totalShipping: cartDetails.totalShipping,
      totalItems: cartDetails.totalProducts,
      cartItems: cart.map(item => item.productId),
      itemNames: cart.map(item => item.productName),
      itemPrice: cart.map(item =>item.price),
      itemShipping: cart.map(item => item.shipping),
      status : "service pending"  

      }
    Swal.fire({
      title: 'Confirm Order?',
      text: "Your order will be confirmed!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I am sure!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosBase.post(`http://localhost:4000/confirm-order?customerEmail=${user?.email}`,customerOrder)
        .then(async(response) => {
          if(response.data.insertedCount>0){
          await Swal.fire(
          'Success!',
          'Your Order has been confirmed. Please go to Orders page for more details.',
          'success'
        )
        refetch();
        reload();
          }
          
        })
        
      }
    })
  }
  return (
    <div className='relative'>
     {
      cartDetails.totalProducts == 0 && (
        <h2 className='text-xl font-semibold pl-8'>You have no items at your cart </h2>
      )
     }
      <div className="grid grid-cols-[3fr_1fr] gap-8">
      <div className="mx-auto my-10">
        {
            cart.map(product => <ReviewOrder
            key={product._id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
            ></ReviewOrder>)
      }
      </div>
      <div className="mt-1 rounded-lg">
        <div className='sticky top-0 pl-8 pb-8 bg-slate-200 w-80'>
        <h2 className='font-semibold text-2xl pb-6 pt-8'>Order Summary</h2>
      <p className='text-lg font-medium pb-2'>Total Products: {cartDetails.totalProducts}</p>
      <p className='text-lg font-medium pb-2'>Total Price: ${cartDetails.totalPrice}</p>
      <p className='text-lg font-medium pb-2'>Shipping Charge: ${cartDetails.totalShipping}</p>
      <p className='text-lg font-medium pb-6'>Net pay: ${cartDetails.totalPrice + cartDetails.totalShipping}</p>
      {
      cartDetails.totalProducts != 0 && <div className='flex items-center gap-3'>
     
      <button onClick={handleClearCart} className='btn bg-red-500 hover:bg-red-600 hover:text-white'><span className='flex gap-2 capitalize'>Clear Cart < FaTrashAlt /> </span></button>
       <button onClick={confirmOrder} className='btn bg-blue-500 hover:bg-blue-600 hover:text-white'><span className='flex gap-2 capitalize'>Confirm < FaCheck /> </span></button>
      </div>
     }
     
        </div>
      </div>
    </div>
    </div>
  )
}

export default Cart