import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("Signing up with:", {
      firstName,
      lastName,
      email,
      password,
      age: parseInt(age),
      gender,
    });

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
          age: parseInt(age),
          gender,
        },
        {
          withCredentials: true,
        }
      );
      console.log("SignUp successful:", res.data);
      alert("SignUp successful");
      navigate("/login");
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || error.message || "Something went wrong!";

      alert(errorMsg);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card w-full max-w-2xl bg-base-300 shadow-xl mt-20 mb-20">
        <form className="card-body" onSubmit={handleSignup}>
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

          {/* First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <legend className="text-sm font-medium mb-1">First Name</legend>
              <input
                type="text"
                placeholder="Enter your First Name"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <legend className="text-sm font-medium mb-1">Last Name</legend>
              <input
                type="text"
                placeholder="Enter your Last Name"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-4">
            <legend className="text-sm font-medium mb-1">Email</legend>
            <input
              type="email"
              placeholder="Enter your Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <legend className="text-sm font-medium mb-1">Password</legend>
            <input
              type="password"
              placeholder="Enter your Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Age */}
          <div className="mt-4">
            <legend className="text-sm font-medium mb-1">Age</legend>
            <input
              type="number"
              placeholder="Enter your Age"
              className="input input-bordered w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min={1}
              max={120}
            />
          </div>

          {/* Gender */}
          <div className="mt-4">
            <legend className="text-sm font-medium mb-1">Gender</legend>
            <select
              className="select select-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="card-actions mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
