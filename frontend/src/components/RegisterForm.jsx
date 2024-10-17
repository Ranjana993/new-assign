import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registration({ setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the Node.js API for registration
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json(); 

      if (result.message === "ok" || result.message === "User already exists") {
        localStorage.setItem("user", JSON.stringify(result.user));

        // Redirect to dashboard
        navigate("/");
      } else {
        setErrorMessage(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Server error. Please try again later."); 
    }
  };

  return (
    <div className="w-full lg:w-[80%] flex justify-center items-center relative h-[80%]">
      <button className="absolute -top-5 lg:-top-5 w-56 px-2 py-3 mb-8 text-white bg-cyan-500 rounded-md shadow-md">
        <Link to={"/"}> SIGN IN</Link>
      </button>
      <div className="w-[90%] lg:w-1/2 p-6 bg-white rounded-md">
        <h1 className="flex items-center justify-center py-2 font-semibold mt-5">
          <div className="flex items-center justify-center w-full">
            <div className="border-t border-gray-300 w-full mx-4"></div>
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png"
              alt="User Icon"
              className="w-24"
            />
            <div className="border-t border-gray-300 w-full mx-4"></div>
          </div>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <label htmlFor="name" className="block text-base mb-2">
              username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                className="w-full border text-base px-8 py-2 focus:outline-none focus:border-gray-600"
                placeholder="Enter Username..."
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label htmlFor="email" className="block text-base mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full border text-base px-8 py-2 focus:outline-none focus:border-gray-600"
                placeholder="Enter email..."
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label htmlFor="dob" className="block text-base mb-2">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="date"
                id="dob"
                className="w-full border text-base px-8 py-2 focus:outline-none focus:border-gray-600"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label htmlFor="password" className="block text-base mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full border text-base px-8 py-2 focus:outline-none focus:border-gray-600"
                placeholder="Enter Password..."
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mt-5">
            <button type="submit" className="bg-teal-800 text-white py-2 w-full rounded-md font-semibold hover:bg-teal-700">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
