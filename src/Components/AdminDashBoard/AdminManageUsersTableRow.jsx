import { FaUserShield } from "react-icons/fa";


const AdminManageUsersTableRow = ({ id, name, role, serial,email,makeAdmin }) => {

    
  return (
    <tr className="hover">
    <th>{serial}</th>
    <td className="text-center">{name}</td>
    <td className="text-center">{email}</td>
    <td className="text-center">{role}</td>
    <td className="text-center"><button 
    disabled={role === "admin" ? true : false} 
    onClick={() => makeAdmin(name,id)} 
    className="btn bg-cyan-600 text-yellow-200 hover:bg-red-600 hover:text-gray-800 text-lg"><FaUserShield /></button></td>
  </tr>
  )
}

export default AdminManageUsersTableRow