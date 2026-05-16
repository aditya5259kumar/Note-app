import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Password from "../components/input/Password";
import axiosInstance from "../utils/axiosInstance";
import { FcGoogle } from "react-icons/fc";

import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email";
    } else if (email[0] >= "0" && email[0] <= "9") {
      newErrors.email = "email must not start with a number";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(password)
    ) {
      newErrors.password =
        "Password must contain at least one lowercase letter, uppercase letter, number, and special character";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    console.log(error);

    try {
      const response = await axiosInstance.post("/signup", {
        name,
        email,
        password,
      });

      const token = response.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
        toast.success("user Signed up successfully");
      } else {
        newErrors.signupError = "Signup failed. No token received.";
      }
    } catch (error) {
      newErrors.signupError =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
    }
    setError(newErrors);
  }

  return (
    <>
      {/* <Navbar /> */}

      <div className="flex px-4 flex-col min-h-screen items-center justify-center  bg-linear-to-l from-indigo-200 via-violet-300 to-purple-200">
        <h2 className="text-indigo-700 mb-1 text-3xl  text-center font-extrabold">
          Welcome To Notely
        </h2>
        <p className="text-center text-sm mb-4">
          Your thoughts, tasks, and notes — all in one place.
        </p>
        <div className="sm:w-96 w-full shadow-2xl rounded-2xl bg-white px-7 py-10">
          <form onSubmit={handleSignup}>
            <h4 className="text-center text-indigo-500 font-bold text-3xl mb-7">
              Signup
            </h4>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full name"
              className=" w-full text-sm bg-transparent border  px-5 py-3 rounded-md border-indigo-300 text-gray-600 mb-mt-4 outline-none"
            />
            {error.name && (
              <p className="mb-1 text-red-500 text-xs mt-1">{error.name}</p>
            )}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className=" w-full text-sm bg-transparent border  px-5 py-3 rounded-md border-indigo-300 text-gray-600 mb-1 mt-4 outline-none"
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
              Signup
            </button>
            {/* <button
              className="flex items-center justify-center gap-2 w-full text-gray-600 border border-gray-300 bg-white rounded p-2 my-1 mt-4 hover:bg-gray-100"
            >
              <FcGoogle className="text-xl" /> <span>Singup with Google</span>
            </button> */}

            <p className="text-sm text-center mt-4">
              Already have an Account?{" "}
              <Link to="/login" className="font-bold text-indigo-600">
                Login.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
