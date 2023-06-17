import React from 'react'
import Swal from "sweetalert2";
import { BiError } from "react-icons/bi";
import useAuthentication from '../../../../hooks/useAuthentication';
import useAxiosInterceptor from '../../../../hooks/useAxiosInterceptor';
import { useForm } from 'react-hook-form';
const img_hosting_token= import.meta.env.VITE_Image_Upload_Token
const AddProduct = () => {
  const { user } = useAuthentication();
  const [axiosBase] = useAxiosInterceptor();
  const image_hosting_api= `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = async(data) => {
  }
  return (
    <div className="mb-10">
      <section className="max-w-6xl px-6 pb-9 mx-auto bg-blue-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl pt-6 font-bold text-white capitalize dark:text-white">
          Fill the product details
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="username"
              >
                Instructor name
              </label>
              <input
                id="username"
                // name="instructorName"
                type="text"
                value={user?.displayName}
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                // {...register("instructorName", { required: true })}
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                // name="instructorEmail"
                type="email"
                value={user?.email}
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                // {...register("instructorEmail", { required: true })}
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="password"
              >
                Name of the Class
              </label>
              <input
                id="password"
                type="text"
                name="className"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                {...register("className", { required: true })}
              />
              {errors.className?.type === "required" && (
                <p
                  className="pl-1 pt-2 flex items-center bg-white rounded-lg mt-2 gap-2 text-base text-red-500"
                  role="alert"
                >
                  <BiError /> Please Enter the Class Name
                </p>
              )}
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Price($)
              </label>
              <input
                id="passwordConfirmation"
                type="text"
                name="price"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                {...register("price", {
                  required: "Price is required",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message:
                      "Do not include strings and not more than two decimals",
                  },
                })}
              />
              {errors.price && (
                <p
                  className="pl-1 pt-2 flex items-center gap-2 text-base bg-white rounded-lg mt-2 text-red-500"
                  role="alert"
                >
                  <BiError /> {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Total Seats
              </label>
              <input
                id="textarea"
                type="text"
                name="availableSeats"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                {...register("availableSeats", {
                  required: "Enter the available seats.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message:
                      "Seats field should contain numbers only and no decimal points or spaces.",
                  },
                  validate: (value) =>
                    !isNaN(value) ||
                    "Seats field should contain numbers only and no decimal points or spaces.",
                })}
              />
              {errors.availableSeats && (
                <p
                  className="pl-1 pt-2 flex items-center gap-2 bg-white rounded-lg mt-2 text-base text-red-500"
                  role="alert"
                >
                  <BiError /> {errors.availableSeats.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Class Image
              </label>
              <div className="form-control w-full">
  
  <input type="file" className="h-auto p-0 file-input file-input-primary file-input-bordered block w-full mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 "
  {...register('classImage', {
    required: 'Image is required',
    validate: {
      acceptedFormats: (file) => {
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
        return acceptedFormats.includes(file[0]?.type) || 'Invalid file format';
      },
    },
  })}
  />
  {errors.classImage && <p
                    className="pl-1 pt-2 flex items-center gap-2 bg-white rounded-lg mt-2 text-base text-red-500"
                    role="alert"
                  >
                    <BiError /> {errors.classImage.message}
                  </p>
                   }
  
</div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddProduct