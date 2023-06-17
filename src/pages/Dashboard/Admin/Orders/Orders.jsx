import useAllorders from "../../../../hooks/useAllorders"

const Orders = () => {
 const [ allOrders, reload] = useAllorders()
 console.log(allOrders)
  return (
    <div>
      <h2 className='text-center text-2xl font-bold text-gray-900 mb-4'>All Orders</h2>
      {
        allOrders.map(order => (
          <div key={order._id}
          className="bg-slate-100 mb-5 p-10"
          >
            <div className="flex items-center gap-10 text-xl font-semibold justify-between">
          <p>Customer: {order.name}</p> 
          <p>Email: {order.email}</p>
          <p>Order Status: {order.status}</p>
            </div>
            <div className="flex justify-between pt-5">
<div>
  <p className="text-xl font-bold ">Items</p>
  <ul className="text-md font-semibold">
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

export default Orders