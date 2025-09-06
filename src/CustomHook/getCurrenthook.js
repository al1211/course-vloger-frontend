import React, { useEffect } from 'react'
import axiox from "axios"
import {ServerUrl} from "../App"
import {useDispatch} from 'react-redux'
import { setUserData } from '../redux/userSlice'
const usegetCurrenthook = () => {
    const dispatch=useDispatch()
 useEffect(()=>{
  const fetchuser=async()=>{
    try{

        const result=await axiox.get(ServerUrl+"/api/user/getcurrentuser",{withCredentials:true}) 
        dispatch(setUserData(result?.data))
    }catch(err){
        console.log("fetch usr error", err.response?.status,err.response?.data);
        dispatch(setUserData(null))
    }

  }
  fetchuser();
 },[])
}

export default usegetCurrenthook