import { Link } from 'react-router-dom';
import Heromage from '../../assets/Images/hero.png';
const Hero = () => {
  return (
    <>
    <div className='relative h-auto w-auto flex flex-col'>
      <div className='bg-slate-500 clip-path h-[85vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10'></div>
      <div className='relative opacity-100 z-20 grid items-center justify-items-center w-11/12 m-auto'>
        <div className='grid items-center justify-items-center mt-28 md:mt-24'>
          <h1 className='text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-slate-200'>Welcome to Express Buy</h1>
          <h1 className='text-3xl lg:text-4xl md:text-4xl sm:text-3xl xsm:text-2xl font-semibold filter drop-shadow-sm text-slate-300 pt-3'>Your one stop solution for premium products</h1>
          <Link to="/shop">
          <button className='btn bg-slate-200  shadow-slate-200 rounded-xl my-5'>Shop</button>
          </Link>
          
        </div>
        <div className='flex items-center'>
          <img
            src={Heromage}
            
            className='w-auto h-[23vh] lg:h-[35vh] md:h-[31vh] sm:h-[21vh]  transition-all duration-700 ease-in-out -rotate-[15deg] hover:rotate-0 cursor-pointer object-fill'
          />
        </div>
      </div>
    </div>
 </>
  )
}

export default Hero