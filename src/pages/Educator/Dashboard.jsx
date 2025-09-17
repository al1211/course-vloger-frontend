import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const Dashboard = () => {
  const {userData}=useSelector(state=>state.user);
  const navigate=useNavigate();
  
  return (
    <div className='flex min-h-screen bg-gray-100'>
      <FaArrowLeft className='w-22 absolute top-[10%] left-[5%] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
      <div className='w-full px-6 py-10 bg-gray-50 space-y-10'>
        {/* main section */}
        <div className='max-w-5xl mx-auto bg-white rounded-xl shadwow-md p-6 flex flex-col md:flex-row items-center gap-6'>
          {userData?.photoUrl ? 
          <img src={userData?.photoUrl ? userData?.photoUrl :userData.name.slice(0,1)} className="w-28  h-28  text-2xl rounded-full object-cover border-4 border-black shadow-md" />
          
          :
          <h1 className='w-28  h-28  text-4xl rounded-full object-cover border-4 border-black shadow-md flex items-center justify-center bg-black text-white ' >{userData.name.slice(0,1)}</h1>
          }
          <div className='text-center md:text-left space-y-1'>
            <h1 className='text-2xl font-bold text-gray-800'>Welcome, {userData?.name || 'Educator'}  👋</h1>
            <h1 className='text-xl font-semibold text-gray-800'>
              Total Earning : 0
            </h1>
            <p className='text-gray-600 text-sm'>{userData?.description || "Start Creating Courses for your Students"}</p>
            <h1 className='px-[10px] text-center py-[10px] border-2 bg-black border-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer' onClick={()=>navigate("/courses")}>Create Courses</h1>
          </div>
        </div>

         {/* graph section  */}
      <div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard