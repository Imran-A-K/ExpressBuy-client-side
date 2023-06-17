import React from 'react'
import useMyOrders from '../../../../hooks/useMyOrders'
import MyOrdersProductRow from '../../../../Components/Cart/MyOrders/MyOrdersProductRow'
import useAllorders from '../../../../hooks/useAllorders'

const MyOrders = () => {
    const [ orders, reload] = useMyOrders()
    console.log(orders)
    const [ allOrders] = useAllorders()
  return (
    <div className='flex flex-col pt-5'>
{
    orders?.length == 0 && 
    <h2 className='text-xl font-bold'>You didn't place a Order</h2>
}

{
        allOrders.map((order,index) => (
          <div key={order._id}
          className="bg-slate-100 mb-5 p-10"
          >
            <div className="flex items-center text-2xl font-semibold justify-between">
          
          <p>Order no. {index + 1}</p>
            </div>
            <div className="flex justify-between pt-5">
<div>
  <p className="text-xl font-bold ">Items</p>
  <ul className="text-md font-semibold mr-8">
    {
      order.itemNames.map((item,i) => (
        <li className="" key={i}>{i+1}. {item}</li>
      ))
    }
  </ul>
</div>
<div className="text-lg font-semibold">
  <p className="text-xl font-bold">Summary</p>
  <p>total items: {order.totalItems
}</p>
<p>Total price: {order.totalPrice}</p>
<p>Shipping: {order.totalShipping}</p>
<div className="divider"></div> 
<p className="text-xl font-bold">Net Amount: ${order.totalPrice + order.totalShipping}</p>
</div>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default MyOrders