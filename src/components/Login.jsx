import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login successful");
      dispatch(addUser(res.data));
      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message;

      alert(errorMsg);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-300 shadow-xl mt-20 mb-20">
        <form className="card-body" onSubmit={handleLogin}>
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

          <legend className="text-sm font-medium mb-1">Email</legend>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <span className="font-medium">📧</span>
            <input
              type="email"
              placeholder="Enter your Email"
              className="grow"
              value={email}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </label>

          <legend className="text-sm font-medium mb-1">Password</legend>
          <label className="input input-bordered flex items-center gap-2 mb-6">
            <span className="font-medium">🔒</span>
            <input
              type="password"
              placeholder="Enter your Password"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
