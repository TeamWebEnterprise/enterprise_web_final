import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./forgotpwd.css";
import axios from "../../api/axios";
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const ForgotConfirmMail = () => {
  const [email, setEmail] = useState("");

  const [showCreatePwd, setShowCreatePwd] = useState(true);

  const handleconfirmmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/forgot-password",
        JSON.stringify({
          emailConfirm: email,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setShowCreatePwd(!showCreatePwd);
    } catch (err) {
      if (err?.response?.status === 400) {
        console.log("email no ");
      }
    }
  };

  return (
    <section className=" bg-[url('https://wallpaperaccess.com/full/4688678.jpg')] bg-cover bg-no-repeat pl-5 pr-5 bg-fixed w-full min-h-screen mt-0 flex items-center justify-center top-0 p-5">
      <div className='box_email'>
        <h2 className=' text-center text-5xl text-white font-sans  font-medium pt-12'>
          Forgot Password
        </h2>
        <p className='text-center text-2xl text-white font-sans font-normal pt-2'>
          Enter your email to create new Password!
        </p>
        <Box
          className=' max-w-lg flex mx-auto items-center justify-center gap-1 '
          component='form'
          noValidate
          onSubmit={handleconfirmmail}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            type='email'
            autoComplete='email'
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='text-white'
          />
          <button
            disabled={!showCreatePwd ? true : false}
            className=' font-sans h-14 bg-[#1976d2] text-white text-xl border-white rounded-md border-2 items-center justify-center px-5 mt-2 hover:scale-110 shadow-xl  active:scale-100'
          >
            Submit
          </button>
        </Box>
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
            <p className='text-white text-xl text-center flex justify-center items-center gap-3 '>
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
    </section>
  );
};

export default ForgotConfirmMail;
