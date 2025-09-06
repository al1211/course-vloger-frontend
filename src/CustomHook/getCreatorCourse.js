import axios from 'axios'
import React, { useEffect } from 'react'
import { ServerUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setcreatorCourseData } from '../redux/courseSlice'
import { toast } from 'react-toastify'

const usegetCreatorCourse = () => {
    const dispahtc=useDispatch();
    const {userData}=useSelector(state=>state.user)
  return (
    useEffect(()=>{
        const creatorCourses=async()=>{
            try{
              const result=await axios.get(ServerUrl+"/api/course/getcreator",{withCredentials:true});
              console.log(result.data);
              dispahtc(setcreatorCourseData(result.data))
            }catch(err){
                 console.log(err);
                 
            }
        }
        creatorCourses();
    },[userData])
  )
}

export default usegetCreatorCourse