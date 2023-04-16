import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import "./forgotpwd.css";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";

const PWD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

export const SetNewPwd = () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const token = urlParams.get("token");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlechancepassword = async (e) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:3001/auth/set-newpassword?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        body: JSON.stringify({
          password: password,
          passwordConfirm: confirmPassword,
        }),
      });
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      navigate("/");
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setValidConfirmPassword(match);
  }, [password, confirmPassword]);
  return (
    <section className=' bg_reset-pwd  bg-right-bottom bg-no-repeat h-[100vh] bg-[length:500px]   flex mx-auto items-center justify-center pl-5 pr-5 '>
      <Box
        className='box_email max-w-lg mx-auto items-center justify-center gap-1 '
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

        <button className=' w-full bg-[#1976d2] font-sans h-14 text-white text-xl border-black rounded-md border-2 items-center justify-center px-5 mt-2y btn_submit'>
          Submit
        </button>
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
        {!loading ? (
          <box></box>
        ) : (
          <Box sx={{ width: "100%" }} className=' pl-3 pr-3'>
            <LinearProgress />
          </Box>
        )}
      </Box>
    </section>
  );
};
