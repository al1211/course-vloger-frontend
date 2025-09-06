import React from 'react'
import Nav from '../Componensts/Nav'
import home from "../assets/home1.jpg"
import {FaPlay} from "react-icons/fa"
import ai from "../assets/ai.png"
import ai1 from "../assets/SearchAi.png"
import Logo from '../Componensts/Logo'
import ExploreCourses from '../Componensts/ExploreCourses'
import CardPage from '../Componensts/CardPage'
import { useNavigate } from 'react-router-dom'


const Home = () => {
   const naivgate=useNavigate();
  return (
    <div className='w-[100%] overflow-hidden'>
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
        <Nav/>
        <img src={home} alt='hero_image' className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]'/>
        <span className='lg:text-[70px] absolute md:text[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'>Grow your Skill to Advance</span>
        <span className='lg:text-[70px] absolute md:text[40px] lg:top-[20%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'>Your Carrer path</span>
        <div className='absolute lg:top-[32%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap
        '>
          <button className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer' onClick={()=>naivgate("/allCourses ")} >View All Courses <FaPlay className="w-[30px] h-[25px] lg:fill-white fill-black"/> </button>
          <button className='px-[20px] py-[10px] border-2 lg:bg-white bg-black lg:text-black lg:border-white border-black   text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer'>Search With AI <img src={ai} className="w-[30px] h-[30px] rounded-full hidden lg:block" alt="ai_image"/>   <img src={ai1} alt="ai_search" className="w-[30px] h-[30px] rounded-full lg:hidden "/></button>
         
        </div>
      </div>
        <Logo/>
        <ExploreCourses/>
        <CardPage/>
    </div>
  )
}

export default Home