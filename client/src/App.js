import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { ForgotPW } from "./Pages/ForgotPassWord/ForgotPW";
import { Profile } from "./Pages/Profile/Profile";
import RequireAuth from "./context/RequireAuth";
import PersistLogin from "./Pages/Login/PresistLogin";
function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/forgotPW' element={<ForgotPW />}></Route>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
