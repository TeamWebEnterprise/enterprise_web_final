import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Home } from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import ForgotConfirmMail from "./pages/ForgotPwd/ForgotConfirmMail";
import { Success, SuccessVerifyMail } from "./pages/Register/Success";
import { SetNewPwd } from "./pages/ForgotPwd/SetNewPwd";
function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <ThemeProvider theme={darkTheme}>
              <Home theme={darkTheme} setMode={setMode} mode={mode} />
            </ThemeProvider>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/confirmmail' element={<ForgotConfirmMail />} />
        <Route path='/emailverify' element={<SuccessVerifyMail />} />
        <Route path='/auth/set-newpassword' element={<SetNewPwd />} />
      </Routes>
    </>
  );
}

export default App;
