import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import "./Register.css";
import TextField from "@mui/material/TextField";
import { Email } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{1,23}$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const PHONE_REGEX = /^(?=.*[0-9]).{10,11}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = "/auth/register";

export const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocusn, setLastNameFocus] = useState(false);

  const [address, setAddress] = useState("");

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState(Date);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [username, setUserName] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    setValidPhone(result);
  }, [phone]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const check = async () => {
      try {
        await axios.post("/auth/checkregister", JSON.stringify({ username }), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
      } catch (err) {
        setValidName(true);
      }
    };
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    console.log(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPwd]);

  const handleSubmit = async (e) => {
    setLoading(!loading);
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    const birth = dateOfBirth + "T03:36:29.314Z";
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({
          username,
          password,
          firstName,
          lastName,
          email,
          phone,
          address,
          dateOfBirth: birth,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSuccess(true);
    } catch (err) {
      if (err?.response) {
        setErrMsg("User name phone number or email already exists");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration Failed ");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1 className='text-5xl text-center text-green-600'>Success</h1>
          <p className='text-2xl text-center text-blue-600'>
            Please check your{" "}
            <a
              className='text-2xl text-center text-green-600 underline'
              href='https://mail.google.com/mail/'
            >
              Mail
            </a>{" "}
            to activate account{" "}
          </p>
          <p>
            <a className='text-3xl text-center text-green-600' href='/login'>
              Login
            </a>
          </p>
        </section>
      ) : (
        <section className='bg-[url("https://th.bing.com/th/id/R.5a6e05753a3209540850409c73286a6a?rik=%2bm%2fC1THL7MbisA&pid=ImgRaw&r=0")] bg-fixed bg-cover min-h-screen items-center justify-center md:p-14 relative '>
          <p
            ref={errRef}
            className={errMsg ? "setErrMsg " : "offscreen"}
            aria-live='assertive'
          >
            {errMsg}
          </p>

          <div className='flex items-center justify-center'>
            <div className='sm:max-w-2xl ml-5 mr-5 rounded-xl bg-white md:flex max-w-7xl m-10'>
              <form
                className='flex flex-col p-10 mr-5 ml-5 md:p-2 max-w-7xl m-10'
                onSubmit={handleSubmit}
              >
                <h2 className='text-center text-3xl font-semibold mt-2 mb-5'>
                  Sign Up
                </h2>
                <div className='sm:flex-none md:flex  gap-2 mb-2'>
                  <TextField
                    color={emailFocus && !validEmail ? "error" : "success"}
                    label={
                      !emailFocus
                        ? "email"
                        : !validEmail
                        ? "email not validate"
                        : "email validate"
                    }
                    id='outlined-basic'
                    variant='outlined'
                    className='sm: w-full m-0 p-5 pb-2 pl-0 border-b-2 outline-none md: w-1/2'
                    type='email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby='emailnote'
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  ></TextField>
                  <div className='mb-2'> </div>
                  <TextField
                    id='outlined-basic'
                    label='username'
                    variant='outlined'
                    className='sm: w-full m-0 p-5 pb-2 pl-0 border-b-2 outline-none md: w-1/2'
                    type='text'
                    required
                    ref={userRef}
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                    placeholder='username'
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby='uidnote'
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  ></TextField>
                  <div className='mb-2'> </div>
                </div>
                <div className='sm:flex-none md:flex gap-2 mb-2 '>
                  <TextField
                    className='sm: w-full m-0 p-5 pb-2 pl-0 border-b-2 outline-none md: w-1/2'
                    type='date'
                    autoComplete='off'
                    required
                    placeholder='dateofbirth'
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  ></TextField>
                  <div className='mb-2'> </div>
                  <TextField
                    color={phoneFocus && !validPhone ? "error" : "success"}
                    label={
                      !phoneFocus
                        ? "Phone number"
                        : !validPhone
                        ? "phone not valid"
                        : "phone valid"
                    }
                    id='outlined-basic'
                    variant='outlined'
                    className='sm: w-full m-0 p-5 pb-2 pl-0 border-b-2 outline-none md: w-1/2'
                    type='tel'
                    autoComplete='off'
                    required
                    placeholder='phone'
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    aria-invalid={validPhone ? "false" : "true"}
                    aria-describedby='phonenote'
                    onFocus={() => setPhoneFocus(true)}
                    onBlur={() => setPhoneFocus(false)}
                  ></TextField>
                  <div className='mb-2'> </div>
                </div>
                <div className='sm:flex-none md:flex gap-2 mb-2'>
                  <TextField
                    id='outlined-basic'
                    label='First name'
                    variant='outlined'
                    className='sm: w-full m-0 p-5 pb-2 pl-0 border-b-2 outline-none md: w-1/2'
                    type='text'
                    autoComplete='off'
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    aria-invalid={validFirstName ? "false" : "true"}
                    aria-describedby='firstnamenote'
                    onFocus={() => setFirstNameFocus(true)}
                    onBlur={() => setFirstNameFocus(false)}
                    required
                    placeholder='firstname'
                  ></TextField>
                  <div className='mb-2'> </div>
                  <TextField
                    id='outlined-basic'
                    label='Last name'
                    variant='outlined'
                    className='sm: w-full m-0 p-5 pb-2 pl-0 border-b-2 outline-none md: w-1/2'
                    type='text'
                    autoComplete='off'
                    required
                    placeholder='lastname'
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    aria-invalid={validLastName ? "false" : "true"}
                    aria-describedby='lastnamenote'
                    onFocus={() => setLastNameFocus(true)}
                    onBlur={() => setLastNameFocus(false)}
                  ></TextField>
                  <div className='mb-2'> </div>
                </div>

                <TextField
                  id='outlined-basic'
                  label='Address'
                  variant='outlined'
                  className='w-full p-5 pb-2 pl-0 mr-5 border-b-2 outline-none max-w-xl mb-2'
                  type='text'
                  autoComplete='off'
                  required
                  placeholder='address'
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                ></TextField>
                <div className='mb-2'> </div>
                <TextField
                  color={pwdFocus && !validPwd ? "error" : "success"}
                  label={
                    !pwdFocus
                      ? "password"
                      : !validPwd
                      ? "password not validate"
                      : "password validate"
                  }
                  id='outlined-basic'
                  variant='outlined'
                  className='w-full p-5 pb-2 pl-0 mr-3 border-b-2 outline-none '
                  type='password'
                  autoComplete='off'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby='pwdnote'
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  required
                ></TextField>
                <p
                  id='pwdnote'
                  className={
                    pwdFocus && !validPwd
                      ? " text-sm text-black p-0.5 relative"
                      : "register__validpwd--off"
                  }
                >
                  6 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label='exclamation mark'>!</span>{" "}
                  <span aria-label='at symbol'>@</span>{" "}
                  <span aria-label='hashtag'>#</span>{" "}
                  <span aria-label='dollar sign'>$</span>{" "}
                  <span aria-label='percent'>%</span>
                </p>
                <div className='mb-2'> </div>
                <TextField
                  color={matchFocus && !matchPwd ? "error" : "success"}
                  label={
                    !matchFocus
                      ? "Confirm Password"
                      : !matchPwd
                      ? "Confirm Password not match"
                      : "Confirm Password  match"
                  }
                  id='outlined-basic'
                  variant='outlined'
                  className='w-full p-5 pb-2 pl-0 mr-3 border-b-2 outline-none'
                  type='password'
                  autoComplete='off'
                  required
                  placeholder='conform-password'
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby='confirmnote'
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                ></TextField>
                <div className='mb-2'> </div>
                <button
                  disabled={!validPwd || !validMatch ? true : false}
                  className={
                    !validPwd || !validMatch
                      ? "mt-8 mx-auto w-full bg-gray-300 rounded-xl text-white py-2"
                      : "mt-8 mx-auto w-full bg-blue-700 rounded-xl text-white py-2 hover:scale-110 duration-200"
                  }
                >
                  <>
                    {loading ? (
                      <p >
                        <CircularProgress className="max-h-4" />
                      </p>
                    ) : (
                      <p>Sign Up</p>
                    )}
                  </>
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
