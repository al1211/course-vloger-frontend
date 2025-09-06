import React, { useEffect, useState } from 'react'
import Nav from "../Componensts/Nav"
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import img from "../assets/SearchAi.png"
import { useSelector } from 'react-redux';
import Card from '../Componensts/Card';

const AllCourses = () => {
    const navigate=useNavigate();
    const {courseData}=useSelector(state=>state.course);
    const [category,setCategory]=useState([]);
    const [filterCourses,setFilterCourses]=useState([]);
    
    const toogleCategory=(e)=>{
        const value=e.target.value;;
        if(category.includes(value)){
            setCategory(prev=>prev.filter(c=>c!==value))
        }else{
            setCategory(prev=>[...prev,value])
        }
    };

    const applyFilter=()=>{
        let courseCopy=courseData?.slice();
        if(category.length > 0){
            courseCopy=courseCopy.filter(c=>category.includes(c.category))
        }
        setFilterCourses(courseCopy);
        return courseCopy;
    }
  
  useEffect(()=>{
    setFilterCourses(courseData)
  },[courseData]);

  useEffect(()=>{
   applyFilter();
  },[category])
 useEffect(() => {
  console.log("Updated filter data", filterCourses);
}, [filterCourses]);
 console.log("category" ,category);
 console.log("coureData",courseData);
 console.log("filter data",filterCourses);
  return (
    <div className="flex min-h-screen bg-gray-50 ">
        <Nav/>
        
        {/* sidebar */}
        <aside className="w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5">
       <h2 className="text-xl font-bold flex  items-center justify-center gap-2 text-gray-50 mb-6"> <FaArrowLeft className="text-white" onClick={()=>navigate("/")}/> Filter by Category</h2>   
        <form className="space-y-4 text-sm bg-gray-600 border-white text-white border p-[20px] rounded-2xl" onSubmit={(e)=>e.preventDefault()}>
        <button className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer">Search With AI <img src={img} alt="img" className="w-[30px] h-[30px] rounded-full " /></button>
        <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className="accent-black w-4 h-4 rounded-md" value="App Development" onChange={toogleCategory}/> App development
        </label>
        <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className="accent-black w-4 h-4 rounded-md" value="AI ML" onChange={toogleCategory}/> AI/ML
        </label>
        <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className="accent-black w-4 h-4 rounded-md" value="AI Tools" onChange={toogleCategory}/> AI Tools
        </label>
        <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className="accent-black w-4 h-4 rounded-md" value="Data Science" onChange={toogleCategory}/> Data Science
        </label>
        <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className="accent-black w-4 h-4 rounded-md" value="Data Analytics" onChange={toogleCategory}/> Data Analytics
        </label>
        <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className="accent-black w-4 h-4 rounded-md" value="Ethical Hacking" onChange={toogleCategory}/> Ethical Hacking
        </label>
        <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className="accent-black w-4 h-4 rounded-md" value="UI UX Design" onChange={toogleCategory}/> UI/UX Design
        </label>
        <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className="accent-black w-4 h-4 rounded-md" value="Web Development" onChange={toogleCategory}/> Web development
        </label>
        <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className="accent-black w-4 h-4 rounded-md" value="Others" onChange={toogleCategory}/> Others
        </label>
        </form>
        </aside>
        <main className='w-full transition-all duration-300 py-[130px] md:pl-[300px]  flex  items-starts justify-center md:justify-start flex-wrap gap-6 px-[10px]'>
            {filterCourses?.map((course,index)=>(
                <Card key={index} thumbnail={course?.thumbnail} title={course?.title} category={course?.category} price={course?.price} id={course?._id}/>
            ))}
        </main>
    </div>
  )
}

export default AllCourses