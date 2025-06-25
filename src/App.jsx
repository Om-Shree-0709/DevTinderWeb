import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/SignUp";
import Feed from "./components/feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/SignUp" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
