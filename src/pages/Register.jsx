import { Link, useLocation, useNavigate } from "react-router-dom";
import RegisterImg from "../assets/Login/enter-login-password-registration-page-screen-sign-your-account-creative-metaphor_566886-2871.jpg";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import { useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import Swal from "sweetalert2";
import useAuthentication from "../hooks/useAuthentication";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier } from "firebase/auth";
import { toast } from "react-hot-toast";

const Register = () => {
  const [firebaseError, setFirebaseError] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  
  const [info, setInfo] = useState({})

  const [landing, setLanding] = useState(true)
  const [phoneVerify, setPhoneVerify] = useState(false)

  const { registerUser, googleSignIn, logOut,phoneSignIn,updateUserProfile,auth } =
    useAuthentication();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    criteriaMode: "all",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const password = watch("password");
  const to = location.state?.from?.from?.pathname || "/";

 

  const onCaptchVerify =()=> {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  const onSignup = ()=> {
    
    setLoadingOtp(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;


    phoneSignIn(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setLoadingOtp(false);
      setShowOTPInput(true);
      setPhoneVerify(false)
      
      toast.success("OTP sended successfully!");
      
    })
    .catch((error) => {
      console.log(error);
      setLoadingOtp(false);
      setShowOTPInput(false);
      if(error.message.includes('captcha')){
        return
      }
      setLanding(true)
      
      if(
        error.message.includes('too-many-requests')
      ){
        return
      }
setFirebaseError(error.message)
      
    });

  }

  const onOTPVerify =() => {
    setLanding(false)
    setLoadingOtp(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        // setUser(res.user);
        setShowOTPInput(false)
        setLoadingOtp(false);
        
        
        toast.success("OTP verified successfully!");
        await axios
            .post(`https://express-buy-server.vercel.app/register-new-user`, {
              name: info.name,
              email: info.email,
              role: info.role,
              phone: info.phone,
              password: info.password
            })
            .then((response) => {
              console.log(response);
            });

          await Swal.fire({
            position: "top",
            icon: "success",
            title:
              "Your account has been created successfully please login with your credentials to continue",
            showConfirmButton: false,
            timer: 1500,
          });
         logOut()
      .then()
      .catch((error) => {
        console.log(error.message);
      });

    navigate("/login");

      })
      .catch((error) => {
        console.log(error);
        setLoadingOtp(false);
        setLanding(true);
        setShowOTPInput(false)
        
     
      if(error.message.includes('captcha')){
        return
      }
      if(
        error.message.includes('too-many-requests')
      ){
        return
      }
setFirebaseError(error.message)
        
      });
  }
 
  const onSubmit = async(data) => {
    if(!phoneNumber){
      setFirebaseError("Please Enter yor Number")
      return
    }
    setFirebaseError("");
    setLoadingOtp(true);
    
    const info = { name: data.name, email: data.email, phone: ("+" + phoneNumber), role: "customer", password: data.password }
   setInfo(info)

    registerUser(info.email, info.password)
      .then((result) => {
        // const registeredUser = result.user;
        setLanding(false)
        setPhoneVerify(true)
        setLoadingOtp(false);
        updateUserProfile(info.name).then(async () => {
          toast.success("Please verify your number");
        });
        
        })
      .catch((error) => {
        // console.log(error.message)
        if (error.message.includes("auth/email-already-in-use")) {
          setFirebaseError(
            "Your account was previously registered. Please login to continue"
          );
        }
        setLoadingOtp(false);
        setFirebaseError(error.message)
      });

 

  };
  const signUpWithGoogle = () => {
    googleSignIn()
      .then(async (result) => {
        const registeredUser = result.user;
      
        await axios
          .post(`https://express-buy-server.vercel.app/register-new-user`, {
            name: registeredUser.displayName,
            email: registeredUser.email,
            role: "customer",
            phone: registerUser.phoneNumber ? registerUser.phoneNumber : ""

          })
          .then((response) => {
            console.log(response);
            navigate(to, { replace: true });
          });
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
  

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div id="recaptcha-container"></div>
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex flex-row-reverse justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-bold mb-3">Welcome!</h1>
            <h1 className="text-2xl xl:text-2xl text-center font-semibold">
              Please enter your details to sign Up
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  onClick={signUpWithGoogle}
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-7 bg-indigo-100 text-gray-800 flex items-center justify-center active:scale-[.98] ease-in-out transform active:duration-100 transition-all hover:scale-[1.01] focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                >
                  <div className="bg-white p-2 rounded-full active:scale-[.98] ease-in-out transform active:duration-100 transition-all hover:scale-[1.01]">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4 active:scale-[.98] ease-in-out transform active:duration-100 transition-all hover:scale-[1.01]">
                    Sign Up with Google
                  </span>
                </button>
              </div>

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or Register manually
                </div>
              </div>
              <div className="text-center mb-4">
                <span className="text-red-500 font-semibold">
                  {firebaseError}
                </span>
              </div>
             
             { phoneVerify &&
                <>
                <div className="mt-4 my-4">
                  <p className="font-semibold mb-4"> please verify your number</p>
                  <PhoneInput country={"bd"}
                 required
                  value={phoneNumber} onChange={setPhoneNumber} />
                  </div>
                  <button  onClick={onSignup} className="mt-5 tracking-wide font-semibold bg-violet-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 active:scale-[.98] ease-in-out transform active:duration-100 transition-all hover:scale-[1.01] flex items-center justify-center focus:shadow-outline focus:outline-none">
                  {loadingOtp && (
      <CgSpinner size={20} className="mt-1 animate-spin" />)}
  <span className="ml-3">Verify Phone</span>
                  </button>
                </>
             }
              
           {
            showOTPInput && <>
            <div className="bg-white text-indigo-500 w-fit mb-4 mx-auto p-4 rounded-full">
              <BsFillShieldLockFill size={30} />
            </div>
            <label
              htmlFor="otp"
              className="font-bold text-xl text-slate-900 text-center"
            >
              Enter your OTP
            </label>
           <div className="mt-2">
           <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container "
            ></OtpInput>
           </div>
            <button
              onClick={onOTPVerify}
              className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 active:scale-[.98] ease-in-out transform active:duration-100 transition-all hover:scale-[1.01] flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              {loadingOtp && (
                <CgSpinner size={20} className="mt-1 animate-spin" />
              )}
              <span>Verify OTP</span>
            </button>
          </>
           } 
              
              
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto max-w-xs"
              >
                {
                  landing &&
                   <>
                  <input
                  className="w-full px-8 py-4 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  name="name"
                  placeholder="Name"
                  {...register("name", { required: true })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name?.type === "required" && (
                  <p
                    className="pl-1 pt-2 flex items-center gap-2 text-base text-red-500"
                    role="alert"
                  >
                    <BiError /> Please Enter your Name
                  </p>
                )}
                   <input
                     className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                     type="text"
                     name="email"
                     placeholder="Email"
                     {...register("email", {
                       required: "Email is required.",
                       pattern: {
                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                         message: "Invalid email address.",
                       },
                     })}
                     aria-invalid={errors.email ? "true" : "false"}
                   />
                   {errors?.email && (
                     <p
                       className="pl-1 pt-2 flex items-center gap-2 text-base text-red-500"
                       role="alert"
                     >
                       <BiError /> {errors.email.message}
                     </p>
                   )}
   
                   <div className="relative">
                     <input
                       className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                       type={showPassword === false ? "password" : "text"}
                       name="password"
                       placeholder="Password"
                       {...register("password", {
                         required: "Password is required.",
                        
                         validate: (value) => {
                           const hasSpecialCharacter =
                             /^(?=.*[!@#$%^&*()_\-+=|\\[\]{};:'",.<>\/?]).*$/.test(
                               value
                             );
                           const hasCapitalLetter = /^(?=.*[A-Z]).*$/.test(value);
                           if (!hasCapitalLetter) {
                             return "Password must have a capital letter.";
                           }
                           if (!hasSpecialCharacter) {
                             return "Password must have a special character.";
                           }
                           return true;
                         },
                         minLength: {
                           value: 6,
                           message: "Password must be at least 6 characters",
                         },
                       })}
                     />
   
                     <div className="cursor-pointer text-2xl absolute right-3 top-9 z-10">
                       {showPassword === false ? (
                         <AiFillEye
                           onClick={() => setShowPassword(!showPassword)}
                         />
                       ) : (
                         <AiFillEyeInvisible
                           onClick={() => setShowPassword(!showPassword)}
                         />
                       )}
                     </div>
                     {errors?.password?.type === "required" ||
                     errors?.password?.type === "validate" ||
                     errors?.password?.type === "minLength" ? (
                       <p
                         className="pl-1 pt-2 flex items-center gap-2 text-base text-red-500"
                         role="alert"
                       >
                         <BiError /> {errors?.password?.message}
                       </p>
                     ) : null}
   
                     
                   </div>
   
                   <div className="relative">
                     <input
                       className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                       type={showPassConfirm === false ? "password" : "text"}
                       name="confirmPassword"
                       placeholder="Confirm Password"
                       {...register("confirmPassword", {
                         required: "Please Confirm your password",
                         validate: (value) =>
                           value === password || "Passwords do not match.",
                       })}
                     />
                     <div className="cursor-pointer text-2xl absolute right-3 top-9 z-10">
                       {showPassConfirm === false ? (
                         <AiFillEye
                           onClick={() => setShowPassConfirm(!showPassConfirm)}
                         />
                       ) : (
                         <AiFillEyeInvisible
                           onClick={() => setShowPassConfirm(!showPassConfirm)}
                         />
                       )}
                     </div>
                     {errors?.confirmPassword?.type === "required" ||
                     errors?.confirmPassword?.type === "validate" ? (
                       <p
                         className="pl-1 pt-2 flex items-center gap-2 text-base text-red-500"
                         role="alert"
                       >
                         <BiError /> {errors?.confirmPassword?.message}
                       </p>
                     ) : null}
                   </div>
                   <>
                <div className="mt-4 my-4">
                  <PhoneInput country={"bd"}
                 required
                  value={phoneNumber} onChange={setPhoneNumber} />
                  </div>
                  {/* <button  onClick={onSignup} className="mt-5 tracking-wide font-semibold bg-violet-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 active:scale-[.98] ease-in-out transform active:duration-100 transition-all hover:scale-[1.01] flex items-center justify-center focus:shadow-outline focus:outline-none">
                  {loadingOtp && (
      <CgSpinner size={20} className="mt-1 animate-spin" />)}
  <span className="ml-3">Verify Phone</span>
                  </button> */}
                </>
                   <button className="mt-5 tracking-wide font-semibold bg-violet-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 active:scale-[.98] ease-in-out transform active:duration-100 transition-all hover:scale-[1.01] flex items-center justify-center focus:shadow-outline focus:outline-none">
                  
{loadingOtp ? (
    <CgSpinner size={20} className="mt-1 animate-spin" />)
  : 
  <svg
    className="w-6 h-6 -ml-2"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <path d="M20 8v6M23 11h-6" />
  </svg>

}
  <span className="ml-3">Register</span>
</button>
                   </>
                }
                
                
               
                



                

                
                <p className="mt-6 text-base text-gray-600 text-center font-semibold">
                  Already have an account?{" "}
                  <Link to="/login" className=" text-violet-600 font-bold">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-violet-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${RegisterImg})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
