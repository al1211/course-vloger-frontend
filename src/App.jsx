import { useState } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Singup from "./pages/Singup";
import Login from "./pages/Login";
export const ServerUrl = "https://course-vloger-backend.onrender.com";
import { ToastContainer } from "react-toastify";

import usegetCurrenthook from "./CustomHook/getCurrenthook";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Educator/Dashboard";
import Courses from "./pages/Educator/Courses";
import CreateCourses from "./pages/Educator/CreateCourses";
import usegetCreatorCourse from "./CustomHook/getCreatorCourse";
import EditCourse from "./pages/Educator/EditCourse";
import usegetPublishedCoures from "./CustomHook/getPublishedCoures";
import AllCourses from "./pages/AllCourses";

function App() {
  usegetCurrenthook();
  usegetCreatorCourse();
  usegetPublishedCoures();
  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/singup"
            element={!userData ? <Singup /> : <Navigate to={"/"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={userData ? <Profile /> : <Navigate to={"/singup"} />}
          />
          <Route
            path="/forget"
            element={
              userData ? <ForgetPassword /> : <Navigate to={"/singup"} />
            }
          />
          <Route
            path="/edit"
            element={userData ? <EditProfile /> : <Navigate to={"/singup"} />}
          />
          <Route
            path="/allCourses"
            element={userData ? <AllCourses /> : <Navigate to={"/singup"} />}
          />
          <Route
            path="/dashboard"
            element={
              userData?.role === "educator" ? (
                <Dashboard />
              ) : (
                <Navigate to={"/singup"} />
              )
            }
          />
          <Route
            path="/courses"
            element={
              userData?.role === "educator" ? (
                <Courses />
              ) : (
                <Navigate to={"/singup"} />
              )
            }
          />
          <Route
            path="/createcourses"
            element={
              userData?.role === "educator" ? (
                <CreateCourses />
              ) : (
                <Navigate to={"/singup"} />
              )
            }
          />
          <Route
            path="/editcourses/:courseId"
            element={
              userData?.role === "educator" ? (
                <EditCourse />
              ) : (
                <Navigate to={"/singup"} />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
