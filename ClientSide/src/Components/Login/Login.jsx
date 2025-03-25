import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "/src/assets/images/login_bg.jpg";
import Swal from "sweetalert2";
import { UserContext } from "../../UserProvider/UserProvider";

const forgotPassword = () => {
  Swal.fire({
    title: "Forgot Your Password?",
    text: "Contact The Admin To Reset Your Password",
    icon: "question",
    confirmButtonText: "Okay",
  });
};

const Login = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn, user } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    signIn(email, password);
    user ? navigate("/") : console.log("Login Failed");
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Glassmorphism Background Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      {/* Login Form */}
      <div className="relative p-8 rounded-2xl shadow-xl bg-white/60 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/50 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type={viewPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/50 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4 flex justify-between items-center">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => setViewPassword(!viewPassword)}
              />{" "}
              View Password
            </label>
            <Link
              onClick={forgotPassword}
              href="#"
              className="text-blue-600 text-sm font-bold hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-bold hover:text-blue-800"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
