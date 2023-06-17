import { FaCalendarAlt, FaHome, FaShoppingCart, FaWallet,FaShopify, FaOpencart, FaUserCircle, FaListAlt, FaThLarge } from "react-icons/fa"
import { NavLink, Outlet } from "react-router-dom"
import useGetUsers from "../hooks/useGetUsers";

const AdminDashBoard = () => {
  const [allUsers, refetch] = useGetUsers()

  return (
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-start pt-10">
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    <Outlet />

  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu bg-blue-400 font-semibold text-xl p-4 w-80 h-full">
      
    
        <li className="pt-10 "><NavLink to="/admin-dashboard/overview"><FaThLarge></FaThLarge> Overview</NavLink></li>
        <li className=""><NavLink to="/admin-dashboard/orders"><FaOpencart></FaOpencart> Orders</NavLink></li>
        <li className=""><NavLink to="/admin-dashboard/product-list"><FaListAlt></FaListAlt> Product List</NavLink></li>
        <li className=""><NavLink to="/admin-dashboard/add-a-product"><FaListAlt></FaListAlt> Add Product</NavLink></li>
      
      <li>
        <NavLink to="/admin-dashboard/users"><FaUserCircle></FaUserCircle> Users
        <span className="badge badge-secondary">+{allUsers?.length || 0}</span>
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

export default AdminDashBoard