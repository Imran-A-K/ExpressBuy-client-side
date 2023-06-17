import React, { useEffect, useState } from 'react'
import useGetTotalProducts from '../../../../hooks/useGetProducts';
import useAuthentication from '../../../../hooks/useAuthentication';
import useAxiosInterceptor from '../../../../hooks/useAxiosInterceptor';
import useCart from '../../../../hooks/useCart';
import AdminProductListCard from '../../../../Components/AdminProdustListCard.jsx/AdminProductListCard';

const ProductList = () => {
  const [totalProducts] = useGetTotalProducts();
  const { user} = useAuthentication()
  const [axiosBase] = useAxiosInterceptor()
  const [ cart,refetch] = useCart() 
  // console.log(user)
  // console.log(totalProducts)
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()]; 
  const options = [5, 10, 15, 20]; // dropdown options

  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  const [products, setProducts] = useState([]);
    //  useEffect for loading data for per page with query
    useEffect(() => {
      async function fetchData() {
        const response = await fetch(
          `http://localhost:4000/newest-products?page=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await response.json();
        setProducts(data);
      }
      fetchData();
    }, [currentPage, itemsPerPage]);
  return (
    <>
    <div className="text-center mb-8">
        <p>
          Current Page: {currentPage +1} and items per page: {itemsPerPage}
        </p>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? "bg-blue-400 btn btn-sm mx-2" : "btn btn-sm mx-2"}
            onClick={() => setCurrentPage(number)}
          >
            {number + 1} 
          </button>
        ))}
        <select className='select select-bordered' value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    <h2 className='text-center text-2xl text-gray-900 font-bold'>All Products</h2>
    <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-10 mx-10 my-10">
          {products.map((product) => (
            <AdminProductListCard
              key={product._id}
              product={product}
              
            />
          ))}
        </div>
        
      </div>

    
    </>
  )
}

export default ProductList