import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import { Link, useNavigate } from "react-router-dom";
import Password from "../components/input/Password";
import axiosInstance from "../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    // login API call-
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      const token = response.data?.data?.token;
      // handle successfull login response
      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
        toast.success("user Logged in successfully");
      } else {
        newErrors.loginError = "Login failed. No token received.";
      }
      // handle login error
    } catch (err) {
      newErrors.loginError =
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
    }
    setError(newErrors);
  }

  return (
    <>
      <Home />
      <div className="absolute top-0 right-0 left-0 px-6 flex min-h-screen items-center justify-center bg-linear-to-l from-indigo-200 via-violet-300 to-purple-200">
        <div className="w-96 border border-indigo-300 shadow-2xl  rounded-2xl bg-white px-7 py-10">
            <h2 className="text-indigo-800 mb-4 text-xl  text-center font-bold">
              Welcome To Notely
            </h2>
          <form onSubmit={handleLogin}>

            <h4 className="text-center font-bold text-indigo-500 text-3xl mb-7">
              Login
            </h4>

            {error.loginError && (
              <p className="mb-1 text-red-500 text-xs mt-1">
                {error.loginError}
              </p>
            )}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className=" w-full font-medium text-sm bg-transparent border px-5 py-3 border-indigo-300 text-gray-600 rounded-md mb-1 outline-none"
            />
            {error.email && (
              <p className="mb-4 text-red-500 text-xs mt-1">{error.email}</p>
            )}

            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && (
              <p className="mb-1 text-red-500 text-xs mt-1">{error.password}</p>
            )}

            <button
              type="submit"
              className="w-full text-white bg-linear-to-r from-purple-600 to-indigo-400 rounded p-2 my-1 mt-4 hover:bg-blue-500"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4">
              don't have Account? {""}
              <Link to="/signup" className="font-bold text-indigo-600">
                Create an Account.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
