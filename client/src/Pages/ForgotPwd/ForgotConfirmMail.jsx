import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./forgotpwd.css";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import LinearProgress from "@mui/material/LinearProgress";

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const ForgotConfirmMail = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const theme = createTheme();
  const [showCreatePwd, setShowCreatePwd] = useState(true);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const validEmail = EMAIL_REGEX.test(email);
    setValidEmail(validEmail);
  }, [email]);

  const handleconfirmmail = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      setLoading(true);
    }, 500);
    try {
      await fetch(
        "http://localhost:3001/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          body: JSON.stringify({
            emailConfirm: email,
          }),
        }
      );
      setLoading(false);
      setShowCreatePwd(!showCreatePwd);
    } catch (err) {
      setTimeout(() => {
        setErr(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          className='bg_email-confirm bg-cover bg-fixed'
          item
          xs={false}
          sm={4}
          md={7}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className=''></div>
            <div className='box_email'>
              <h2 className=' text-center text-5xl text-black  font-medium pt-12'>
                Forgot Password
              </h2>
              <p className='text-center text-2xl text-black  font-normal pt-2'>
                Enter your email to create new Password!
              </p>
              <Box
                component='form'
                noValidate
                onSubmit={handleconfirmmail}
                sx={{ mt: 1 }}
                className='flex items-center justify-center'
              >
                <TextField
                  color={emailFocus && !validEmail ? "error" : "success"}
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label={
                    !emailFocus
                      ? "Email address"
                      : !validEmail
                      ? "Type of email invalid"
                      : "Email is OK"
                  }
                  name='email'
                  type='email'
                  autoComplete='email'
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className='text-white'
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <button
                  disabled={!showCreatePwd ? true : false}
                  className='  btn_submit font-sans h-14 bg-[#1976d2] text-black text-xl border-black rounded-md border-2 items-center justify-center px-5 ml-1'
                >
                  Submit
                </button>
              </Box>
              <Grid container className='pl-3 pr-3 mt-3'>
                <Grid item xs>
                  <Link href='/' variant='body2'>
                    Back Home
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/login' variant='body2'>
                    {"Login page"}
                  </Link>
                </Grid>
              </Grid>
              <div>
                {!err ? (
                  <p></p>
                ) : (
                  <p className=' text-red-500 pl-3 pr-3'>
                    Email address does not exist or is not registered, please
                    try again !!
                  </p>
                )}
                {!loading ? (
                  <box></box>
                ) : (
                  <Box sx={{ width: "100%" } } className=' pl-3 pr-3'>
                    <LinearProgress />
                  </Box>
                )}
              </div>
              {showCreatePwd ? (
                <Box></Box>
              ) : (
                <Box
                  className=' max-w-lg mx-auto items-center justify-center gap-1 pt-14'
                  component='form'
                  noValidate
                >
                  <p className='text-white text-xl text-center flex justify-center items-center gap-3 '>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='25'
                      height='25'
                      fill='currentColor'
                      class='bi bi-check-circle text-green-500 font-bold '
                      viewBox='0 0 16 16'
                    >
                      <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                      <path d='M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z' />
                    </svg>
                    Confirm mail success
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='25'
                      height='25'
                      fill='currentColor'
                      class='bi bi-check-circle text-green-500 font-bold'
                      viewBox='0 0 16 16'
                    >
                      <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                      <path d='M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z' />
                    </svg>{" "}
                  </p>
                  <p className='text-black text-xl text-center flex justify-center items-center gap-3 '>
                    Please check your{" "}
                    <a
                      href='https://mail.google.com/mail/u/2/#inbox'
                      className='text-[#1976d2]'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        class='bi bi-envelope-check-fill'
                        viewBox='0 0 16 16'
                      >
                        <path d='M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z' />
                        <path d='M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z' />
                      </svg>
                    </a>{" "}
                    to reset Password
                  </p>
                </Box>
              )}
            </div>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ForgotConfirmMail;
