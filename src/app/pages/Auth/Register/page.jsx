"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProvider";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import RegisterImg from "../../../../../public/images/register.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Registration = () => {
  const [isShow, setIsShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const MySwal = withReactContent(Swal);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { registerWIthEmailAndPassword, updateUser, googleLogin } =
    useContext(AuthContext);

  const handlePasswordShow = () => setIsShow(!isShow);

  // ✅ Handle Google Login & Store in DB
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
      };

      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(userData));

      const response = await fetch(
        "https://phero1.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        MySwal.fire("Success!", "Logged in with Google!", "success");
        router.push("/");
      } else {
        throw new Error("Failed to register via Google.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // ✅ Handle Email/Password Registration & Store in DB
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const result = await registerWIthEmailAndPassword(
        data.email,
        data.password
      );
      await updateUser(data.name);

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password, // Include password in the userData object
      };

      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(userData));

      const response = await fetch(
        "https://phero1.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        MySwal.fire("Success!", "Your account has been created!", "success");
        reset();
        router.push("/pages/Auth/Login");
      } else {
        throw new Error("Registration failed! Try again.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden w-full max-w-4xl grid md:grid-cols-2">
        {/* Left - Image Section */}
        <div className="hidden md:flex items-center justify-center bg-blue-500 p-6">
          <Image
            src={RegisterImg}
            alt="Register"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right - Form Section */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign Up Now
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="font-semibold text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full mt-1"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full mt-1"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-700">Password</label>
              <input
                type={isShow ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full mt-1"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "At least 8 characters" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    message:
                      "Include uppercase, lowercase, number, and special character",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                type={isShow ? "text" : "password"}
                placeholder="Confirm Password"
                className="input input-bordered w-full mt-1"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
              Sign Up
            </button>
          </form>

          {/* Google Sign-in Button */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              <FaGoogle className="text-xl" /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
