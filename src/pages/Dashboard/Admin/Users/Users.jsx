import React from 'react'
import useGetUsers from '../../../../hooks/useGetUsers'
import AdminManageUsersTableRow from '../../../../Components/AdminDashBoard/AdminManageUsersTableRow'
import useAxiosInterceptor from '../../../../hooks/useAxiosInterceptor'
import useAuthentication from '../../../../hooks/useAuthentication'
import Swal from 'sweetalert2'

const Users = () => {
  const [allUsers, refetch] = useGetUsers()
  const [axiosBase] = useAxiosInterceptor();
  const { user } = useAuthentication();
  const makeAdmin = (name, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${name} is going to be a new Admin!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I am sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosBase.patch(`/users/make-admin/${id}`).then((response) => {
          if (response.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${name} is now an Admin`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <>
    <div className="overflow-x-auto">
  <table className="table">
   
    <thead>
      <tr className='text-xl text-gray-900'>
        <th className='bg-indigo-200 rounded-s-lg text-center'>#</th>
        <th className='bg-indigo-200 text-center'>Name</th>
        <th className='bg-indigo-200 text-center'>Email</th>
        <th className='bg-indigo-200 text-center'>Role</th>
        <th className='bg-indigo-200 text-center rounded-e-lg'>Make Admin</th>
      </tr>
    </thead>
    <tbody>
    {allUsers.map((eachUser, index) => (
              <AdminManageUsersTableRow
                key={eachUser._id}
                serial={index + 1}
                name={eachUser.name}
                email={eachUser.email}
                id={eachUser._id}
                makeAdmin={makeAdmin}
                role={eachUser.role}
              ></AdminManageUsersTableRow>
            ))}
      
    </tbody>
  </table>
</div>
    </>
  )
}

export default Users