import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState(userData?.name || "");
  const [descriptions, setDiscription] = useState(userData?.descriptions || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const formData = new FormData ();
  formData.append("name", name);
  formData.append("description", descriptions);
  formData.append("photoUrl", photoUrl);

  const handleProfile = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        ServerUrl + "/api/user/profile",
        formData,
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));

      setLoading(false);
      navigate("/");
      toast.success("Profile update");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("erro in profile update");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <FaArrowLeft
          className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Profile
        </h2>
        <form
          action=""
          className="space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col items-center text-center">
            {userData?.photoUrl ? (
              <img
                src={userData?.photoUrl}
                className="w-24 h-24 rounded-full object-cover border-4 border-black"
                alt="profile_url"
              />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white">
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              Select Avtar
            </label>
            <input
              placeholder="PhotoUrl"
              id="image"
              name="photoUrl"
              type="file"
              className="w-full px-4 py-2 border rounded-md text-sm"
              accept="images/*"
              onChange={(e) => setPhotoUrl(e.target.files[0])}
            />
          </div>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              UserName
            </label>
            <input
              placeholder={userData?.name}
              id="name"
              name="username"
              type="text"
              className="w-full px-4 py-2 border rounded-md text-sm"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              readOnly
              placeholder={userData?.email}
              id="name"
              name="username"
              type="text"
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              placeholder="Tell us  about yourself"
              name="descriptions"
              rows={3}
              id="name"
              type="text"
              className="w-full mt-1 border-gray-300 resize-none focus:ring-2 focus:ring-black px-4 py-2  focus:outline-none border rounded-md text-sm"
              onChange={(e) => setDiscription(e.target.value)}
            ></textarea>
          </div>
          <button
            className="w-full bg-black active:bg-[#454545] text-white py-2  rounded-md font-medium transition cursor-pointer"
            disabled={loading}
            onClick={handleProfile}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
