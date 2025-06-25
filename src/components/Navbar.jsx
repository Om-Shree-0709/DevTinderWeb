import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const logoutFxn = async () => {
    try {
      const res = await axios.post("http://localhost:3000/logout", {
        withCredentials: true,
      });
      dispatch(removeUser(res.data));

      console.log("LogOut successful");
      alert("LogOut successful");
    } catch (error) {
      console.error("LogOut error:", error.response?.data || error.message);

      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message;

      alert(errorMsg);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">JobSwiper-Web</a>
      </div>

      {user && (
        <>
          <p className="mx-2 font-medium">{user.firstName}</p>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a
                  onClick={logoutFxn}
                  className="cursor-pointer hover:text-error"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
