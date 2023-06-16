import { Link } from "react-router-dom";

export const Item = ({
    item
  }) => {
    
  
    return (
      <>
        <div
          className={`relative bg-gradient-to-b ${item.color} ${item.shadow} grid items-center justify-center rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105`}
        >
          <div
            className='grid items-center relative justify-items-center' 
            
          >
            <h1 className="text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow">
              {item.title}
            </h1>
            <p className="text-slate-200 filter drop-shadow text-base md:text-sm font-normal">
              {item.text}
            </p>
            <Link to='/shop'>
            <button className="btn btn-sm absolute top-0 -right-[60px] hover:bg-black hover:text-white">Buy</button>
            </Link>
  
           
          </div>
          <div
            className={`flex items-center  "absolute top-5 right-1" "justify-center"`}
          >
            <img
              src={item.img}
              className={`transition-all duration-700 ease-in-out cursor-pointer hover:-rotate-12 h-auto w-64 lg:w-56 md:w-48 -rotate-[15deg]`}
            />
          </div>
        </div>
      </>
    );
  };