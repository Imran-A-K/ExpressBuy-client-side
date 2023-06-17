import { FaCalendarAlt, FaHome, FaShoppingCart, FaWallet,FaShopify } from "react-icons/fa"
import { NavLink, Outlet } from "react-router-dom"
import useCart from "../hooks/useCart";

const UserDashBoard = () => {
  const [cart] = useCart();
  return (
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    <Outlet />

  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu bg-blue-400 font-semibold text-xl p-4 w-80 h-full">
      
    
        <li className="pt-10 "><NavLink to="/user-dashboard/my-orders"><FaHome></FaHome> Orders</NavLink></li>
      
      <li>
        <NavLink to="/user-dashboard/my-cart"><FaShoppingCart></FaShoppingCart> My Cart
        <span className="badge badge-secondary">+{cart?.length || 0}</span>
        </NavLink>
        </li>
      
        <div className="divider">Or</div>
        <li><NavLink to='/'><FaHome /> Home</NavLink></li>
        <li className="">
        <NavLink to="/shop"><FaShopify></FaShopify>Shop</NavLink>
      </li>
      
    </ul>
  
  </div>
</div>
  )
}

export default UserDashBoard