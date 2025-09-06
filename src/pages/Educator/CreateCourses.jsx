import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

  import {ServerUrl} from "../../App"
  import {ClipLoader} from "react-spinners"
import axios from 'axios';
import { toast } from 'react-toastify';


const CreateCourses = () => {
  const naivgate=useNavigate();
  const [title,setTitle]=useState("");
  const [category,setCategory]=useState("");
  const [loading,setLaoding]=useState(false);

  const handleCreateCourse=async()=>{
    setLaoding(true);
    try{

      const result= await axios.post(ServerUrl+"/api/course/create",{title,category},{withCredentials:true})
      console.log(result.data);
      setLaoding(false);
      toast.success("Courese created")
      naivgate("/courses")
      

    }catch(err){
      setLaoding(false)
     console.log(err);
     toast.error(err.response.data.message);
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
      <div className='max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative'>
        <FaArrowLeft className='top-[8%] absolute left-[15%] w-[22px] h-[22px] cursor-pointer' onClick={()=>naivgate("/courses")}/>
        <h2 className='text-2xl font-semibold mg-6 text-center'>Create Course</h2>
        <form className='space-y-5' onSubmit={(e)=>e.preventDefault()}>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='title'>Course Title</label>
            <input id='title' type='text' placeholder='Enter course title' className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]' onChange={(e)=>setTitle(e.target.value)} value={title}/>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='category'>Course Category</label>
            <select id='category' className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]' onChange={(e)=>setCategory(e.target.value)} >
              <option value="">Select Category</option>
              <option value="App Development">App Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI UX Design">UI UX Design</option>
              <option value="Web Development">Web Development</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Science">Data Science</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <button className='w-full bg-[black] text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition' onClick={handleCreateCourse}>{loading?<ClipLoader size={30} color="white" />:"Create"}</button>

        </form>
      </div>
    </div>
  )
}

export default CreateCourses