import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./forgotpwd.css";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /([?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ForgotConfirmMail = () => {
  const [email, setEmail] = useState("");

  const [showCreatePwd, setShowCreatePwd] = useState(true);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    console.log(result);
    const match = password === confirmPassword;
    setValidConfirmPassword(match);
  }, [password, confirmPassword]);

  const handleconfirmmail = async (e) => {
    e.preventDefault();
    setShowCreatePwd(!showCreatePwd);
  };
  const handlechancepassword = async (e) => {
    e.preventDefault();
  };

  return (
    <section className=" bg-[url('https://wallpaperaccess.com/full/4688678.jpg')] bg-cover bg-no-repeat pl-5 pr-5 bg-fixed w-full min-h-screen mt-0 items-center justify-center top-0">
      <h2 className=' text-center text-5xl text-slate-50 font-mono font-medium pt-20'>
        Forgot Password
      </h2>
      <p className='text-center text-2xl text-slate-50 font-mono font-medium pt-2'>
        Enter your email to create new Password!
      </p>
      <Box
        className=' max-w-lg flex mx-auto items-center justify-center gap-1'
        component='form'
        noValidate
        onSubmit={handleconfirmmail}
      >
        <TextField
          className='email_confirm'
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
        />
        <button
          disabled={!showCreatePwd ? true : false}
          className=' font-mono h-14 text-blue-50 text-xl border-white rounded-md border-2 items-center justify-center px-5 mt-2 hover:scale-110 shadow-xl  active:scale-100'
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
          onSubmit={handlechancepassword}
        >
          <p className='text-center text-3xl text-white font-mono font-bold pt-2'>
            Create new Password!
          </p>
          <p className='text-center text-md text-black font-mono  pt-2'>
          !! New password must include 2 uppercase and lowercase letters, a number and a special character. !!
          </p>
          <TextField
          color={validPassword? "success" : "error" }
            className='email_confirm'
            margin='normal'
            required
            fullWidth
            id='password'
            label={validPassword? "Password is valid" : "Password isn't valid" }
            name='password'
            type='password'
            autoComplete='off'
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <TextField
            color={validConfirmPassword? "success" : "error" }
            className='email_confirm'
            margin='normal'
            required
            fullWidth
            id='password'
            label={validConfirmPassword? "Confirm Password is match" : "Confirm Password isn't match" }
            name='password'
            type='password'
            autoComplete='off'
            autoFocus
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}     
          />

          <button className=' w-full  font-mono h-14 text-blue-50 text-xl border-white rounded-md border-2 items-center justify-center px-5 mt-2 hover:scale-105 shadow-xl  active:scale-100'>
            Submit
          </button>
        </Box>
      )}
    </section>
  );
};

export default ForgotConfirmMail;
