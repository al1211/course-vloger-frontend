
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPasword] = useState("");
  const [conpassword, setConPasword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // for step1
  const sendOpt = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        ServerUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setLoading(false);
      setStep(2);
      toast.success("otp succesful sedn");
    } catch (err) {
      console.log(err);
      toast.error("erro in send otp");
      setLoading(false);
    }
  };

  // fot stwp2
  const verigyOtp = async () => {
    console.log(otp);
    setLoading(true);
    try {
      const result = await axios.post(
        ServerUrl + "/api/auth/verifyotp",
        { email, otp },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      setStep(3);
      toast.success("otp verified ");
    } catch (err) {
      console.log(err);

      toast.error("erro in verified otp");
      setLoading(false);
    }
  };

  // step 3

  const resetPassword = async () => {
    setLoading(true);
    try {
      if (password !== conpassword) {
        return toast.error("password is not match");
      }
      const result = await axios.post(
        ServerUrl + "/api/auth/resetpassword",
        { email, password: password },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      toast.success("reset password succesfull ");
      navigate("/login");
    } catch (err) {
      console.log(err);

      toast.error("erro in reset password otp");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {step === 1 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Forget Your Password
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefalut()}>
            <div>
              <label
                htmlFor="email"
                className="blocc text-sm font-medium text-gray-700"
              >
                Enter Your email address
              </label>
              <input
                type="text "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral-950 focus:ring-2"
              />
            </div>
            <button
              className="w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4  rounded-md font-medium cursor-pointer"
              disabled={loading}
              onClick={sendOpt}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Enter OTP
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="otp"
                className="blocc text-sm font-medium text-gray-700"
              >
                Please Enter your 4-digit code send you email
              </label>
              <input
                type="text "
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="* * * * "
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral-950 focus:ring-2"
              />
            </div>
            <button
              className="w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4  rounded-md font-medium cursor-pointer"
              onClick={verigyOtp}
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Veirfy OTP"}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset Your Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter a new password below to ragin accces to your account
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="password"
                className="blocc text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="text "
                id="password"
                value={password}
                onChange={(e) => setPasword(e.target.value)}
                placeholder="*********"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral-950 focus:ring-2"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="blocc text-sm font-medium text-gray-700"
              >
                Conform Password
              </label>
              <input
                type="text "
                id="password"
                value={conpassword}
                onChange={(e) => setConPasword(e.target.value)}
                placeholder="*********"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral-950 focus:ring-2"
              />
            </div>

            <button
              className="w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4  rounded-md font-medium cursor-pointer"
              onClick={resetPassword}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
