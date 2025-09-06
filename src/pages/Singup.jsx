import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import googel from "../assets/google.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { ServerUrl } from "../App";
import { toast } from "react-toastify";
import {ClipLoader} from "react-spinners"
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";


const Singup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading,setLoading]=useState(false);
  const dispatch=useDispatch();
  const handleSingup = async () => {
    setLoading(true)
    try{
    const result=await axios.post(ServerUrl+"/api/auth/signup",{name,password,email,role},
        {withCredentials:true}
    );
    console.log(result)
    dispatch(setUserData(result?.data))
    setLoading(false);
    navigate("/");
    toast.success("Singup Succesfully");
    }catch(err){
        console.log(err);
        setLoading(false)
        toast.error(err.response.data.message);
    }
  };

  const googleSingup=async()=>{
    try{
     const response = await signInWithPopup(auth,provider);
     console.log(response);
     let user=response.user;
     let name=user.displayName;
     let email=user.email;
     const result=await axios.post(ServerUrl+"/api/auth/googleauth",{name,email,role},{withCredentials:true});
     dispatch(setUserData(result?.data))
     navigate("/");
     toast.success("Signup succesfull");
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
            <h1 className="font-semibold text-black text-2xl">
              Let's get started
            </h1>
            <h2 className="font-semibold text-gray-400 text-[18px]">
              Create your account
            </h2>
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]    focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              placeholder="your name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
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
              type={showPassword ? "text" : "password"}
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
          <div className="flex md:w-[50%] items-center justify-between">
            <span onClick={()=>setRole("student")} className={`px-[15px] py-[5px] border-[2px] border-[#e7e6e6] rounded-2xl  cursor-pointer hover:border-black ${role==="student"?"border-black":"border-[#646464]"}`}>
              Student
            </span>
            <span onClick={()=>setRole("educator")}  className={`px-[15px] py-[5px] border-[2px] border-[#e7e6e6] rounded-2xl  cursor-pointer hover:border-black ${role==="educator"?"border-black":"border-[#646464]"}`}>
              Educator
            </span>
          </div>
          <button className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]" onClick={handleSingup} disabled={loading}>
            {loading? <ClipLoader size={30} color="white"/>:"Singup"}
          </button>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex  items-center justify-center">
              OR Continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div className="w-[80%] h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center " onClick={googleSingup}>
            <img src={googel} alt="google" className="w-[25px]" />
            <span className="text-[18px] text-gray-500">oogle</span>
          </div>
          <div className="text-[#6f6f6f] ">
            already have an account?{" "}
            <span
              className="underline underline-offset-1 text-black cursor-pointer  font-bold"
              onClick={() => navigate("/login")}
            >
              Login
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

export default Singup;
