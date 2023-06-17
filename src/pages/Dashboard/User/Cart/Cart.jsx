import React from 'react'
import useCart from '../../../../hooks/useCart';
import ReviewOrder from '../../../../Components/Cart/ReviewOrder/ReviewOrder';

const Cart = () => {
  const [cart, refetch] =useCart()
  console.log(cart)
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
    <div className="grid grid-cols-[3fr_1fr] ">
      <div className="mx-auto my-50">
        {
            cart.map(product => <ReviewOrder
            key={product._id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
            ></ReviewOrder>)
      }
      </div>
      <div className="">
        {/* <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link className="proceed-link" to={'/checkout'} > <button className="button-proceed">Proceed Checkout</button></Link>
        </Cart> */}
      </div>
    </div>
  )
}

export default Cart