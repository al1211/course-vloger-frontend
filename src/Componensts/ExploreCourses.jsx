import React from 'react'
import {FaPlay,FaDesktop,FaBrain,FaPython} from "react-icons/fa"
import {LiaUikit} from "react-icons/lia"
import { VscTerminalBash } from "react-icons/vsc";
import {MdPhoneIphone} from "react-icons/md";
import { BsBarChart } from "react-icons/bs";
import { GiArtificialIntelligence } from "react-icons/gi";
import { useNavigate } from 'react-router-dom'



const ExploreCourses = () => {
    const naivagate=useNavigate();
  return (
    <div className='w-[100vw] min-h-[50vh] lg:h-[60vh] flex flex-col lg:flex-row  items-center justify-center gap-4 px-[30px] py-[10px]'>
        {/* left div */}
        <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]'>
            <span className='text-[35px] font-semibold'>Explore</span>
            <span className='text-[35px] font-semibold'>Our Courses</span>
            <p className='text-[17px] '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum minima, perferendis alias dignissimos quo molestias doloribus quasi aliquam necessitatibus maxime?</p>
            <button className='px-[20px] py-[10px] border-2 bg-black border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[30px] cursor-pointer' onClick={()=>naivagate("/allCourses")}>Explore Courses <FaPlay className="w-[30px] h-[25px] lg:fill-white fill-white"/> </button>
        </div>


        {/* right div */}
        <div className="w-[720px] max-w-[90%] lg:h-[300px]  md:min-h-[300px] flex items-center justify-center    lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]">
            <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center" > <FaDesktop size={40} className="h-[60px] w-[60px] text-[#6d6c6c]" />;</div>
                Web Dev
            </div>
             <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center" >    <LiaUikit size={40} className="h-[60px] w-[60px] text-[#6d6c6c]" />;</div>
                UI/UX Designing 
            </div>
             <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#fcd9c8] rounded-lg flex items-center justify-center" > <MdPhoneIphone size={40} className="h-[60px] w-[60px] text-[#6d6c6c]" />;</div>
                App Dev
            </div>
             <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#fcd9c8] rounded-lg flex items-center justify-center" > <VscTerminalBash size={40} className="h-[60px] w-[60px] text-[#6d6c6c]" />;</div>
                Ethical Hacking
            </div>
             <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center" > <FaBrain size={40} className="h-[60px] w-[60px] text-[#6d6c6c]" />;</div>
                AI/ML
            </div>
             <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#fcd9c8] rounded-lg flex items-center justify-center" > <FaPython size={40} className="h-[60px] w-[60px] text-[#6d6c6c]" />;</div>
                Data Science
            </div>
             <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center" > <BsBarChart size={40} className="h-[60px] w-[60px] text-[#6d6c6c]" />;</div>
                Data Analytics
            </div>
             <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center" > <GiArtificialIntelligence size={40} className="h-[60px] w-[60px] text-[#6d6c6c]" />;</div>
                Ai Tools
            </div>

        </div>
 

    </div>
  )
}

export default ExploreCourses