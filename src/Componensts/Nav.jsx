import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";

import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiox from "axios";
import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [shownav, setShowNav] = useState(false);
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axiox.post(
        ServerUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(setUserData(null));
      console.log(result.data);
      toast.success("logout succesfully");
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  return (
    <div>
      <div className="w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10">
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px]">
          <img
            src={logo}
            alt="logo"
            className="w-[60px] rounded-[5px] border-2  border-white "
          />
        </div>
        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden">
          {!userData && (
            <MdAccountCircle
              className="w-[30px] h-[30px] fill-black cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
          {userData && (
            <div
              className="w-[50px] h-[50px] flex rounded-full text-white items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {userData?.name.slice(0, 1).toUpperCase()}{" "}
            </div>
          )}
          {userData?.role === "educator" && (
            <div className="px-[20px] py-[10px] border-2 border-white  bg-black text-white rounded-[10px] text-[18px] font-light  cursor-pointer" onClick={()=>navigate("/dashboard")}>
              Dashborad
            </div>
          )}
          {userData ? (
            <span
              className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]"
              onClick={handleLogout}
            >
              LogOut
            </span>
          ) : (
            <span
              className="px-[20px] py-[10px] border-2 border-white text-black shadow-sm shadow-black rounded-[10px] text-[18px] font-light cursor-pointer bg-white"
              onClick={() => navigate("/login")}
            >
              Login{" "}
            </span>
          )}
          {show && (
            <div className="absolute top-[110%] right-[15%] flex flex-col items-center justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black">
              <span className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 " onClick={()=>navigate("/profile")}>
                My Pofile
              </span>
              <span className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600">
                My Courses
              </span>
            </div>
          )}
        </div>
        <FiMenu
          className="lg:hidden w-[25px] h-[25px] fill-white text-white cursor-pointer"
          onClick={() => setShowNav((prev) => !prev)}
        />
        {shownav && (
          <div
            className={`fixed top-0 left-0 w-screen h-screen bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden
    transition-transform duration-700
    ${shownav ? "translate-x-0" : "-translate-x-full"}
  `}
          >
            <RxCross1
              size={28}
              className="absolute fill-white text-white top-5 right-[5%]"
              onClick={() => setShowNav((prev) => !prev)}
            />
              {!userData && (
            <MdAccountCircle
              className="w-[30px] h-[30px] fill-black cursor-pointer"
              
            />
            
          )}
           {userData && (
            <div
              className="w-[50px] h-[50px] flex rounded-full text-white items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
              
            >
              {userData?.name.slice(0, 1).toUpperCase()}{" "}
            </div>
          )}
           <div className="w-[180px] h-[40px] flex items-center justify-center border-2 border-white  bg-black text-white rounded-[10px] text-[18px] font-light  cursor-pointer" onClick={()=>navigate("/profile")}>
              My profile
            </div>
            <div className="w-[180px] h-[40px] flex items-center justify-center border-2 border-white  bg-black text-white rounded-[10px] text-[18px] font-light  cursor-pointer">
              My Courses
            </div>
          {userData?.role === "educator" && (
            <div className="w-[180px] h-[40px] flex items-center justify-center border-2 border-white  bg-black text-white rounded-[10px] text-[18px] font-light  cursor-pointer" onClick={()=>navigate("/dashboard")} >
              Dashborad
            </div>
          )}
           {userData ? (
            <span
              className="w-[180px] h-[40px] flex items-center justify-center border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]"
              onClick={handleLogout}
            >
              LogOut
            </span>
          ) : (
            <span
              className="w-[180px] h-[40px] border-2 flex items-center justify-center  border-white text-black shadow-sm shadow-black rounded-[10px] text-[18px] font-light cursor-pointer bg-white"
              onClick={() => navigate("/login")}
            >
              Login{" "}
            </span>
          )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
