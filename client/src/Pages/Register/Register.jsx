import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import "./Register.css";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
//import { checkRegister } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{1,23}$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const PHONE_REGEX = /^(?=.*[0-9]).{10,11}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = "/auth/register";

// export const displaydata = async (data) => {
//   const checkEmail = data.acceptEmailCheck;
//   const checkUserName = data.acceptUserNameCheck;
//   const checkPhone = data.acceptPhoneCheck;

// };

export const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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
  const [checkPhone, setCheckPhone] = useState(true);

  const [dateOfBirth, setDateOfBirth] = useState(Date);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [checkEmail, setCheckEmail] = useState(true);

  const [username, setUserName] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [checkUsername, setCheckUsername] = useState(true);

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
    checkRegister(username, email, phone);
  }, [username, email, phone]);

  const checkRegister = async (username, email, phone) => {
    const response = await axios.post("/auth/checkregister", {
      username: username,
      email: email,
      phone: phone,
    });
    setCheckUsername(response.data.acceptUsernameCheck);
    setCheckEmail(response.data.acceptEmailCheck);
    setCheckPhone(response.data.acceptPhoneCheck);

    console.log("mail " + checkEmail);
    console.log("phone " + checkPhone);
  };
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    console.log(result);
    const match = password === matchPwd;
    setValidMatch(match);
    console.log(matchPwd);
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
        <section className=' flex justify-center items-center bg-slate-200 min-h-screen'>
          <div className=' bg-white shadow-xl max-w-xl p-14 item-center mx-auto rounded-md ml-5 mr-5'>
            <div className=' bg-emerald-200 rounded-full m-14 mt-8 w-48 h-48 mx-auto relative'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-48 h-48 flex mx-auto text-green-600 '
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z'
                />
              </svg>
            </div>
            <div>
              <h1 className='text-4xl text-center text-green-600 font-normal  mb-5'>
                Success
              </h1>
              <p className='text-xl text-center text-blue-600'>
                Please check your{" "}
                <a
                  className='text-xl text-center text-green-600 underline'
                  href='https://mail.google.com/mail/'
                >
                  mail
                </a>{" "}
                to activate account{" "}
              </p>
            </div>
          </div>
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
                    color={
                      (emailFocus && !validEmail) || !checkEmail
                        ? "error"
                        : "success"
                    }
                    label={
                      !checkEmail
                        ? "Email already exists"
                        : !emailFocus
                        ? "email"
                        : !validEmail
                        ? "email invalid"
                        : "email valid"
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
                    color={userFocus && !checkUsername ? "error" : "success"}
                    id='outlined-basic'
                    label={
                      !checkUsername
                        ? "Username already exists"
                        : !userFocus
                        ? "User name"
                        : "User name"
                    }
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
                    color={
                      (phoneFocus && !validPhone) || !checkPhone
                        ? "error"
                        : "success"
                    }
                    label={
                      !phoneFocus
                        ? "Phone number"
                        : !checkPhone
                        ? "Phone already exists"
                        : !validPhone
                        ? "phone invalid"
                        : "phone valid"
                    }
                    id='outlined-basic'
                    variant='outlined'
                    className='sm: w-full m-0 p-5 pb-2 pl-0 border-b-2 outline-none md: w-1/2'
                    type='tel'
                    autoComplete='off'
                    required
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
                      ? "password invalid"
                      : "password valid"
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
                  color={matchFocus && !validMatch ? "error" : "success"}
                  label={
                    !matchFocus
                      ? "Confirm Password"
                      : !validMatch
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
                {loading ? (
                  <p className=' flex mx-auto'>
                    <CircularProgress />
                  </p>
                ) : (
                  <button
                    disabled={
                      !validPwd ||
                      !validMatch ||
                      !checkEmail ||
                      !checkPhone ||
                      !checkUsername
                        ? true
                        : false
                    }
                    className={
                      !validPwd ||
                      !validMatch ||
                      !checkEmail ||
                      !checkPhone ||
                      !checkUsername
                        ? "mt-8 mx-auto w-full bg-gray-300 rounded-xl text-white py-2"
                        : "mt-8 mx-auto w-full bg-blue-700 rounded-xl text-white py-2 hover:scale-110 duration-200"
                    }
                  >
                    Sign Up
                  </button>
                )}
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default Register;
