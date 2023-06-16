
const Contact = () => {
  return (
<div className='max-[600px]:pt-5'>
    <div className=" flex justify-center items-center md:h-screen bg-white">
        <div className="container mx-auto mt-4 px-4 lg:px-20">
    
            <div className="w-full p-8 my-4 md:px-12  mx-auto  rounded-2xl shadow-2xl">
                <div className="flex">
                    <h1 className="font-bold uppercase text-5xl">Contact Us</h1>
                </div>
                <div className="flex mt-5">
                    <h1 className="font-medium text-xl">If you have any query please fill out the form. Our representative will contact you shortly</h1>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                    <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text" placeholder="First Name*" />
                    <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text" placeholder="Last Name*" />
                    <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="email" placeholder="Email*" />
                    <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="number" placeholder="Phone*" />
            </div>
                    <div className="my-4">
                        <textarea placeholder="Message*" className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div className="mt-2 w-1/2 lg:w-1/4">
                        <button className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                          focus:outline-none focus:shadow-outline">
                Send Message
              </button>
                    </div>
                </div>
    
                
        </div>
    </div>
    
   
    </div>



  )
}

export default Contact