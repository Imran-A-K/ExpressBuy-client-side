import React, { useEffect, useState } from 'react'
import useGetTotalProducts from '../../hooks/useGetProducts';
import ProductCard from '../../Components/Shop/ProductCard';
import useAuthentication from '../../hooks/useAuthentication';
import Swal from 'sweetalert2';
import useAxiosInterceptor from '../../hooks/useAxiosInterceptor';
import useCart from '../../hooks/useCart';

const Shop = () => {
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
// console.log(products)
 

  //  useEffect for loading data for per page with query
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:4000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleAddToCart = async(product) => {
    if(!user){
      Swal.fire("Please login or register to for adding the product to Cart")
      return
    }
    const selectedProduct ={
      customer: user?.displayName,
      customerEmail: user?.email,
      productId:product._id,
      category: product.category,
      img: product.img,
      productName: product.name,
      seller: product.seller,
      shipping: product.shipping,
      price:product.price
    }
    await axiosBase.post('/add-to-cart',selectedProduct)
    .then(response => {
  
        if(response.data.insertedId){
          refetch()
            Swal.fire({
                title: 'Your product has been added to cart successfully please go to Cart to review order',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            
        }
    })
    .catch(error => console.log(error.message))
  }
  const handleClearCart = (phone) => {
    
  };
  return (
    <>
 <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-10 mx-10 my-10">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
        
      </div>
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
    </>
  )
}

export default Shop