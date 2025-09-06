import axios from "axios";
import React, { useEffect } from "react";
import { ServerUrl } from "../App";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";

const usegetPublishedCoures = () => {
  console.log("coustoom hook is calling")
  const dispatch = useDispatch();
  console.log("us")
  useEffect(() => {
    const getCourseData = async () => {
      try {
        const result = await axios.get(ServerUrl+"/api/course/getpublished", {
          withCredentials: true,
        });
        dispatch(setCourseData(result.data));
        console.log("calling data",result.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCourseData();
  }, [dispatch]);
};

export default usegetPublishedCoures;
