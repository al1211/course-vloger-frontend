import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import googel from "../assets/google.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {ClipLoader} from "react-spinners"
import axios from "axios";
import { ServerUrl } from "../App";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true)
    try{

        const result=await axios.post(ServerUrl+ "/api/auth/login",{email,password},{withCredentials:true});
        dispatch(setUserData(result.data));
        
        
        setLoading(false);
        navigate("/");
        toast.success("login succesfully");
    }catch(err){
        setLoading(false)
        console.log(err);
        toast.error("Invalid user name and password")
    }
  };
  const googleLogin=async()=>{
      try{
       const response = await signInWithPopup(auth,provider);
       console.log(response);
       let user=response.user;
       let name=user.displayName;
       let email=user.email;
       let role="";
       const result=await axios.post(ServerUrl+"/api/auth/googleauth",{name,email,role},{withCredentials:true});
       dispatch(setUserData(result?.data))
       navigate("/");
       toast.success("Login succesfull");
      }catch(err){
        console.log(err?.message);
        toast.error("in google auth error")
  
      }
    }
  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center ">
      <form onSubmit={(e)=>e.preventDefault()} className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex">
        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-black text-2xl">Welcome back</h1>
            <h2 className="font-semibold text-gray-400 text-[18px]">
              Login in your account
            </h2>
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]    focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              placeholder="your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "password" : "text"}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]    focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 "
              placeholder="your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute  top-[55%] translate-x-[50%] right-[14%]  flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>

          <button className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]" onClick={handleLogin}>
            {loading? <ClipLoader size={30} color="white"/>:"Login"}
          </button>
        <span className="text-[13px] cursor-pointer text-[#585757]" onClick={()=>navigate("/forget")}>
            Forget your password ?
          </span>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex  items-center justify-center">
              OR Continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div className="w-[80%] h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center" onClick={googleLogin}>
            <img src={googel} alt="google" className="w-[25px]" />
            <span className="text-[18px] text-gray-500">oogle</span>
          </div>
          <div className="text-[#6f6f6f] ">
            Create new account ?{" "}
            <span
              className="underline underline-offset-1 text-black cursor-pointer  font-bold"
              onClick={() => navigate("/singup")}
            >
              Singup
            </span>
          </div>
        </div>

        {/* right div  */}
        <div className="w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden">
          <img src={logo} alt="logo" className="w-30 shadow-2xl" />
          <span className="text-2xl text-white">VIRTUAL COURSES</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
