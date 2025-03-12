"use client";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { FaGoogle, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthProvider";
import login from "../../../../../public/images/login.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const { accessLogin, googleLogin, auth, resetPassword } =
    useContext(AuthContext); // ✅ Use auth from Context
  const [isShow, setIsShow] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handlePasswordShow = () => setIsShow(!isShow);

  // ✅ Handle Google Login & Store in Local Storage
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
      };

      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(userData));

      Swal.fire("Success!", "Logged in with Google!", "success");
      router.push("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  // ✅ Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await accessLogin(email, e.target.password.value);
      const userData = {
        name: result.user.displayName || "User",
        email: result.user.email,
      };

      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(userData));

      Swal.fire("Good job!", "Login Successful!", "success");
      router.push("/");
    } catch (error) {
      Swal.fire("Error", "Invalid Email or Password!", "error");
    }
  };

  // ✅ Handle Password Reset
  const handleResetPassword = async () => {
    if (!email) {
      Swal.fire("Error", "Please enter your email first!", "error");
      return;
    }
    try {
      await resetPassword(email);
      Swal.fire(
        "Success!",
        "Password reset link sent to your email!",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen mt-8 flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-2xl flex flex-col lg:flex-row">
        {/* Left Side: Image */}
        <div className="lg:w-1/2 flex items-center justify-center p-6">
          <Image
            src={login}
            alt="Login Illustration"
            className="rounded-lg shadow-md"
            width={500}
            height={500}
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Login Now!
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={isShow ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="password"
                  required
                />
                <button
                  type="button"
                  onClick={handlePasswordShow}
                  className="absolute right-3 top-3 text-gray-500 hover:text-blue-500"
                >
                  {isShow ? (
                    <FaToggleOn className="text-2xl" />
                  ) : (
                    <FaToggleOff className="text-2xl" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>

            {/* Forgot Password Button */}
            <button
              type="button"
              onClick={handleResetPassword}
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300 mt-3"
            >
              Forgot Password?
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-1/3 h-px bg-gray-300"></div>
              <span className="text-gray-500">OR</span>
              <div className="w-1/3 h-px bg-gray-300"></div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              <FaGoogle className="text-2xl text-red-600" />
              <span className="text-gray-700">Login with Google</span>
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600">New to Programming-Hero? </span>
              <Link
                href="/pages/Auth/Register"
                className="text-blue-600 font-bold hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
