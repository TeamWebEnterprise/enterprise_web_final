import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const PWD_REGEX = /([?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const SetNewPwd = () => {
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  console.log(token);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const handlechancepassword = async (e) => {
    try {
      await axios.post(
        `/auth/set-newpassword?token=${token}`,
        JSON.stringify({
          password: password,
          passwordConfirm: confirmPassword,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log("error reset");
    }
  };
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    console.log(result);
    const match = password === confirmPassword;
    setValidConfirmPassword(match);
  }, [password, confirmPassword]);
  return (
    <section className=" flex mx-auto items-center justify-center pl-5 pr-5 ">
      <Box
        className=' max-w-lg mx-auto items-center justify-center gap-1 pt-24'
        component='form'
        noValidate
        onSubmit={handlechancepassword}
      >
        <p className='text-center text-3xl text-black font-sans font-bold pt-2'>
          Create new Password!
        </p>
        <p className='text-center text-md text-black font-sans  pt-2'>
          !! New password must include 2 uppercase and lowercase letters, a
          number and a special character. !!
        </p>
        <TextField
          color={validPassword ? "success" : "error"}
          margin='normal'
          required
          fullWidth
          id='password'
          label={validPassword ? "Password is valid" : "Password invalid"}
          name='password'
          type='password'
          autoComplete='off'
          autoFocus
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <TextField
          color={validConfirmPassword ? "success" : "error"}
          margin='normal'
          required
          fullWidth
          id='password'
          label={
            validConfirmPassword
              ? "Confirm Password is match"
              : "Confirm Password isn't match"
          }
          name='password'
          type='password'
          autoComplete='off'
          autoFocus
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />

        <button className=' w-full bg-[#1976d2] font-sans h-14 text-white text-xl border-black rounded-md border-2 items-center justify-center px-5 mt-2 hover:scale-105 shadow-xl  active:scale-100'>
          Submit
        </button>
      </Box>
    </section>
  );
};
