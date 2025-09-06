import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import  img from "../../assets/empty.jpg"
import { BsPencilSquare } from "react-icons/bs";
import {useParams} from "react-router-dom"
import axios from "axios"
import {ServerUrl} from "../../App"

import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/courseSlice';



const EditCourse = () => {
  const navigate=useNavigate();
  const {courseId}=useParams();
  console.log(courseId);


  const thumb=useRef();
  const [isPublished,setPublished]=useState(false);
  console.log(isPublished);
  const[selectedCourse,setSelectedCourse]=useState(null);
  const [title,setTitle]=useState("");
  const [subTitle,setSubTitle]=useState("")
  const [description,setDescription]=useState("")
  const [category,setCategory]=useState("")
  const [level,setLevel]=useState("")
  const [price,setPrice]=useState("")
  const [frontendImage,setFrontendImage]=useState(img);
  const [backendImage,setBackendImage]=useState(null);
  const [loading,setLoading]=useState(false);
  const [rloading,setRloading]=useState(false);
  const dispatch=useDispatch();
  const {courseData}=useSelector(state=>state.course)

console.log(subTitle);

  const handleThumbnail=(e)=>{
    const file=e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }

  const getCourseById=async()=>{
    try{
      const result=await axios.get(`${ServerUrl}/api/course/getcoursebyid/${courseId}`,{withCredentials:true});
      setSelectedCourse(result.data);
      console.log(result.data); 

    }catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    if(selectedCourse){
      setTitle(selectedCourse.title || "");
      setSubTitle(selectedCourse.subtitle || "");
      setDescription(selectedCourse.description || "");
      setCategory(selectedCourse.category || "");
      setLevel(selectedCourse.level || "");
      setPrice(selectedCourse.price || "");
      setFrontendImage(selectedCourse.thumbnail || img);
      setPublished(selectedCourse?.isPublished || "");

    }
     
  },[selectedCourse])
 
   useEffect(()=>{
    getCourseById();
   },[]);

   const handleEditCourse=async()=>{
    setLoading(true);
    const formData=new FormData();
    formData.append("title",title);
    formData.append("subtitle",subTitle);
    formData.append("description",description);
    formData.append("catrgory",category);
    formData.append("level",level);
    formData.append("price",price);
    formData.append("thumbnail",backendImage);
    formData.append("isPublished",isPublished);
    console.log(formData);

    try {
      const result=await axios.post(ServerUrl+`/api/course/editCourse/${courseId}`,formData,{ headers: { "Content-Type": "multipart/form-data" },withCredentials:true})
      console.log(result.data);
      const updateData=result.data;
      if(updateData.isPublished){
        const updateCourses=courseData.map(c=>c._id === courseId?updateData:c);
        if(!courseData.some(c=>c._id == courseId)){
          updateCourses.push(updateData)
        }
        dispatch(setCourseData(updateCourses));
      }else{
        const filterData=courseData.filter(c=>c._id !==courseId);
        dispatch(setCourseData(filterData));
      }
      setLoading(false)
      navigate('/courses')
      toast.success("Update Succesfully");
    } catch (err) {
      console.log(err);
      setLoading(false)
      toast.error("not updated ")
    }
   }
   const handleremoveCourse=async()=>{
    setRloading(true);
    try{
     const result=await axios.delete(ServerUrl+`/api/course/delete/${courseId}`,{withCredentials:true});
     setRloading(false);
     console.log(result.data);
     const updateData=result.data;
     const filterData=courseData.filter(c=>c._id !== courseId);
     dispatch(setCourseData(filterData));

    
     toast.success("deleted succesfull");
     navigate("/courses")
    }catch(err){
      console.log(err);
      toast.error("something went wrong");
      setRloading(false)
    }
   }
  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
       {/* top bar */}
       <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mg-6 relative'>
        <FaArrowLeft className='top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/courses")}/>
          <h2  className="text-2xl font-semibold  md:pl-[60px]">Add Detail Information regarding the course</h2>
          <div className='space-x-2 space-y-2'>
            <button className='bg-black text-white px-4  py-2 rounded-md'>Go to lecture page</button>
          </div>
       </div>

       {/* form details */}
       <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
        <div className='space-x-2 space-y-2'>
          { !isPublished ? <button className='bg-green-100 text-green-600 px-4 py-2 rounded-md border-1' onClick={()=>setPublished(prev=>!prev)} >Click to Publish</button>:<button className='bg-red-100 text-red-600 px-4 py-2 rounded-md border-1' onClick={()=>setPublished(prev=>!prev)}>Click to UnPublish</button>}
        <button className='bg-red-600 text-white px-4 py-2 rounded-md border-1' onClick={handleremoveCourse} disabled={rloading} >{rloading ? <ClipLoader size={30} color='white'/>:"Remove to course"}</button>
        </div>
        <form className='space-y-6' onSubmit={(e)=>e.preventDefault()}>
          <div>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input id='title'  type='text' className='w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-gray-600' placeholder='CourseTitle' onChange={(e)=>setTitle(e.target.value)} value={title}/>
          </div>
          <div>
            <label htmlFor='subtitle' className='block text-sm font-medium text-gray-700 mb-1'>SubTitle</label>
            <input id='subtitle'  type='text' className='w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-gray-600' placeholder='Course SubTitle' onChange={(e)=>setSubTitle(e.target.value)} value={subTitle}/>
          </div>
          <div>
            <label htmlFor='des' className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <textarea id='des'  type='text' className='w-full border px-4 py-2 h-24 resize-none rounded-md focus:outline-none focus:ring-gray-600' placeholder='description' onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
          </div>
          <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>

            {/* for category */}
            <div className='flex-1 '>
            <label className='block text-sm font-medium text-gray-700 mb-1' >Course Category</label>
              <select className='w-full border px-4 py-2 rounded-md bg-white'  onChange={(e)=>setCategory(e.target.value)} value={category} >
              <option value="">Select Category</option>
              <option value="App Development">App Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI UX Design">UI UX Design</option>
              <option value="Web Development">Web Development</option>
              <option value="AI Tools">AI Tools</option>
              <option value="AI ML">AI ML</option>
              <option value="Others">Others</option>
              </select>
            </div>

            {/* for level */}

             <div className='flex-1 '>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Course Level</label>
              <select className='w-full border px-4 py-2 rounded-md bg-white' onChange={(e)=>setLevel(e.target.value)} value={level}>
              <option value="">Select Category</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermidiate">Intermidiate</option>
              <option value="Advanced">Advanced</option>
             
              </select>
            </div>

            {/* for price */}

             <div className='flex-1 '>
            <label htmlFor='price' className='block text-sm font-medium text-gray-700 mb-1'>Course Price (INR)</label>
            <input id='price' type='number' className='w-full border px-4 py-2 rounded-md' placeholder='₹ ' onChange={(e)=>setPrice(e.target.value)}  value={price}/>
            </div>

           
          </div>
           <div>
              <label htmlFor='thum' className='block text-sm font-medium text-gray-700 mb-1' >Course Thumbnail</label>
              <input id='thum' type='file' hidden ref={thumb} accept='image/*' onChange={handleThumbnail} />
            </div>
            <div className='relative w-[300px] h-[170px]'>
              <img src={frontendImage} alt='' className='w-[100%] h-[100%] border-1 border-black rounded-[5px]' onClick={()=>thumb.current.click()}/>
              <BsPencilSquare className="w-[20px] h-[20px] absolute top-2 right-2" onClick={()=>thumb.current.click()}/>
            </div>

            <div className='flex items-center justify-start gap-[15px]'>
              <button className='bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-4 py-2 rounded-md' onClick={()=>navigate('/courses')}>Cancel</button>
              <button className='bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer' onClick={handleEditCourse}>{loading ? <ClipLoader size={30} color="white"/>:"Save"}</button>
            </div>
        </form>

       </div>

    </div>
  )
}

export default EditCourse