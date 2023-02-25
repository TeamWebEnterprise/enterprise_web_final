import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { ForgotPW } from "./pages/ForgotPassWord/ForgotPW";
import { Profile } from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgotPW" element={<ForgotPW />}></Route>

        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
