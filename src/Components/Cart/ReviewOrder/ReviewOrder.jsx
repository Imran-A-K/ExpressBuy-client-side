import { FaTrashAlt } from "react-icons/fa";

const ReviewOrder= ({product,handleRemoveFromCart}) => {
    const { _id, img, price, productName} = product;
    return (
      <div className='w-[571px] border border-solid border-gray-300 rounded-md mb-[25px] pr-[25px] pb-[8px] pl-[8px] pt-[8px] flex items-center'>
        <img src={img} alt="" className="w-[91px] h-[91px] rounded-[6px]" />
        <div className='flex-grow'>
          <p className='font-semibold text-xl mx-[15px] leading-25 tracking-tighter'>{productName}</p>
          <p className="font-semibold mx-[15px] leading-25 tracking-tighter">Price: <span className='text-indigo-500'>${price}</span></p>
          
        </div>
        <button onClick={() => handleRemoveFromCart(_id)} className='btn btn-md bg-red-500 hover:bg-red-300'>
          <FaTrashAlt />
        </button>
      </div>
    )
  }
  
  export default ReviewOrder