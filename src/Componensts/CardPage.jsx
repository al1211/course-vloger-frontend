import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card';


const CardPage = () => {
 
   const {courseData}=useSelector(state=>state.course)
  console.log(courseData);
  // const popularCourses=courseData?.slice(0,6) || [];
    const [popularCourses,setPopularCourses]=useState([])
    

    useEffect(()=>{
      setPopularCourses(courseData?.slice(0,6) || []);
    },[courseData]);
    console.log("porpular",popularCourses);
  return (
    <div className='relative flex items-center justify-center flex-col'>
        <h1 className='md:text-[45px] text-[30px] font-semibold text-center  mt-[30px] px-[20px]'>Our Popular Courses</h1>
        <span className='lg:w-[50%]  md:[30px] px-[20px] '>Explore top-rated courses designed to boost your skills, enhance carrers, and unlock opportunites in tech, AI, business, and beyond.</span>
        <div className='w-[100%]  flex items-center justify-center md:justify-start flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] mb-[40px]'>
            {
                popularCourses.map((course,index)=>(
                    <Card key={index} thumbnail={course?.thumbnail} title={course?.title} category={course?.category} price={course?.price} id={course?._id}/>
                ) )
            }
        </div>
    </div>
  )
}

export default CardPage