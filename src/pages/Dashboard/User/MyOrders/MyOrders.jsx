import React from 'react'
import useMyOrders from '../../../../hooks/useMyOrders'
import MyOrdersProductRow from '../../../../Components/Cart/MyOrders/MyOrdersProductRow'

const MyOrders = () => {
    const [ orders, reload] = useMyOrders()
    console.log(orders)
  return (
    <div className='flex flex-col pt-5'>
{
    orders?.length == 0 && 
    <h2 className='text-xl font-bold'>You didn't place a Order</h2>
}
{
    orders.map((product => <MyOrdersProductRow
        key={product._id}
        product={product} 
        ></MyOrdersProductRow>))
}

    </div>
  )
}

export default MyOrders