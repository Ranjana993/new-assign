import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.message === "ok") {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        onLoginSuccess(data.user); 
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-[80%] flex justify-center items-center relative h-[80%] ">
      <button className="absolute -top-0 w-56 px-4 py-2 mb-4 text-white bg-cyan-500 rounded-md shadow-md">
        SIGN UP
      </button>
      <div className="w-1/2 p-6 shadow-lg bg-white rounded-md">
        <h1 className="flex items-center justify-center py-6 font-semibold mt-12">
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
          <div className="mt-3 ">
            <label htmlFor="username" className="block text-base mb-2">
              Username
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="gray"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute top-2 left-2"
              >
                <path d="M18 20a6 6 0 0 0-12 0" />
                <circle cx={12} cy={10} r={4} />
                <circle cx={12} cy={12} r={10} />
              </svg>
              <input
                type="text"
                id="username"
                className="w-full border border-l-2 border-gray-300 text-base px-8 py-2 focus:outline-none focus:ring-0 focus:border-gray-600"
                placeholder="Enter Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="block text-base mb-2">
              Password
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="gray"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute top-2 left-2"
              >
                <rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 text-base px-8 py-2 focus:outline-none focus:ring-0 focus:border-gray-600"
                placeholder="Enter Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ml-2">
                Remember Me
              </label>
            </div>
            <div>
              <a href="#" className="text-indigo-800 font-semibold">
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="bg-teal-800 text-white py-2 w-full rounded-md font-semibold hover:bg-teal-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;