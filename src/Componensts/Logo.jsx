import React from 'react'
import {FaBook,FaLockOpen,FaRupeeSign,FaHeadset,FaHandsHelping} from "react-icons/fa"
const Logo = () => {
  return (
    <div className="w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px]">
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'><FaBook className="w-[30px] h-[30px] fill-[#03394b]"/>20k+ online Courses  </div>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'><FaLockOpen className="w-[30px] h-[30px] fill-[#03394b]"/>Lifetime Access  </div>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'><FaRupeeSign className="w-[30px] h-[30px] fill-[#03394b]"/>Value for money  </div>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'><FaHeadset className="w-[30px] h-[30px] fill-[#03394b]"/>Lifetime Supoort  </div>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'><FaHandsHelping className="w-[30px] h-[30px] fill-[#03394b]"/>Community Support  </div>
    </div>
  )
}

export default Logo