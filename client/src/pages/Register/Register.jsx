import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./Register.css";
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{1,23}$/;
const PWD_REGEX = /([?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^(?=.*[0-9]).{10,11}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

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

  const [dateofbirth, setDateOfBirth] = useState(Date);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
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
    const result = USER_REGEX.test(firstName);
    console.log(result);
    console.log(firstName);
  }, [firstName]);

  useEffect(() => {
    const result = USER_REGEX.test(lastName);
    console.log(result);
    console.log(lastName);
  }, [lastName]);

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    console.log(result);
    console.log(phone);
  }, [phone]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
  }, [email]);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e)=>{
    e.preventDefault();
  }
  return (
    <section className='bg-[#437BE8] min-h-screen items-center justify-center '>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live='assertive'
      >
        {errMsg}
      </p>
      <div className='lg:flex mx-auto max-w-2xl p-5 gap-5 items-center justify-center pt-10'>
        <img
          className=' md:w-1/2'
          src='https://oecglobal.com/images/stories/PDF/University_of_Greenwich_logo.png'
        ></img>
        <h2 className='md:w-1/2 border-l-2 pl-5 text-[#2A175B] text-4xl font-bold'>
          Create new Greenwich account
        </h2>
      </div>
      <div className='flex items-center justify-center'>
        <div className='bg-[#FFFFFFFF] flex mx-auto flex shadow-lg max-w-6xl p-5 rounded-xl'>
          <div className='lg:block hidden w-1/3 p-10 text-center bg-[#FAFAFA] rounded-xl shadow-lg'>
            <h2 className='text-5xl font-bold text-[#2A175B] text-center'>
              Create new account
            </h2>
            <p className='flex gap-2 m-6 text-xl'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6 text-yellow-400'
              >
                <path d='M10.5 1.875a1.125 1.125 0 012.25 0v8.219c.517.162 1.02.382 1.5.659V3.375a1.125 1.125 0 012.25 0v10.937a4.505 4.505 0 00-3.25 2.373 8.963 8.963 0 014-.935A.75.75 0 0018 15v-2.266a3.368 3.368 0 01.988-2.37 1.125 1.125 0 011.591 1.59 1.118 1.118 0 00-.329.79v3.006h-.005a6 6 0 01-1.752 4.007l-1.736 1.736a6 6 0 01-4.242 1.757H10.5a7.5 7.5 0 01-7.5-7.5V6.375a1.125 1.125 0 012.25 0v5.519c.46-.452.965-.832 1.5-1.141V3.375a1.125 1.125 0 012.25 0v6.526c.495-.1.997-.151 1.5-.151V1.875z' />
              </svg>
              Create your idea
            </p>
            <p className='flex gap-2 m-6 text-xl'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6 text-blue-600'
              >
                <path d='M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z' />
              </svg>
              Vote
            </p>
            <p className='flex gap-2 m-6 text-xl'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6'
              >
                <path
                  fillRule='evenodd'
                  d='M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z'
                  clipRule='evenodd'
                  className='w-6 h-6 text-gray-400'
                />
              </svg>
              Comment
            </p>
            <p className='flex gap-2 m-6 text-xl'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6 text-gray-600'
              >
                <path
                  fillRule='evenodd'
                  d='M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z'
                  clipRule='evenodd'
                />
              </svg>
              Manager your idea
            </p>
            <div className='mt-10'>
              <p className='text-lg'>Your have an account</p>
              <a
                className=' text-lg font-bold underline text-sky-500'
                href='/login'
              >
                sign in
              </a>
            </div>
          </div>
          <form className='w-2/3 p-10 items-center ' onSubmit={handleSubmit}>
            <div className='w-full flex '>
              <input
                className='w-1/2 p-5 pb-2 pl-0 mr-3 border-b-2 outline-none'
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
              ></input>
              <input
                className='w-1/2 p-5 pb-2 pl-0 mr-3 border-b-2 outline-none'
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
              ></input>
            </div>
            <div className='w-full flex '>
              <input
                className='w-1/2 p-5 pb-2 pl-0 mr-3 border-b-2 outline-none'
                type='date'
                autoComplete='off'
                required
                placeholder='dateofbirth'
              ></input>
              <input
                className='w-1/2 p-5 pb-2 pl-0 mr-3 border-b-2 outline-none'
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
              ></input>
            </div>
            <input
              className='w-full p-5 pb-2 pl-0 mr-3 border-b-2 outline-none'
              type='search'
              autoComplete='off'
              required
              placeholder='address'
            ></input>
            <div className='w-full flex '>
              <input
                className='w-1/2 p-5 pb-2 pl-0 mr-3 border-b-2 outline-none'
                type='email'
                autoComplete='off'
                required
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby='emailnote'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              ></input>
              <input
                className='w-1/2 p-5 pb-2 pl-0 mr-3 border-b-2 outline-none'
                type='text'
                autoComplete='off'
                required
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                value={user}
                placeholder='username'
                aria-invalid={validName ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              ></input>
            </div>
            <input
              className='w-full p-5 pb-2 pl-0 mr-3 border-b-2 outline-none'
              type='password'
              autoComplete='off'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              required
              placeholder='password'
            ></input>
            <p
              id='pwdnote'
              className={
                pwdFocus && !validPwd
                  ? " text-sm text-red-500 p-0.5 relative"
                  : "register__validpwd--off"
              }
            >
              8 to 24 characters.
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

            <input
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
            ></input>
            <p
              id='confirmnote'
              className={
                matchFocus && !validMatch
                  ? " flex-none text-sm text-red-500 p-0.5 relative"
                  : "register__validpwd--off"
              }
            >
              Must match the first password input field.
            </p>
            <button
            type="submit"
              disabled={ !validFirstName || !validLastName || !validEmail||!validPhone|| !validPwd || !validMatch ? true : false}
              className={
                !validFirstName || !validLastName || !validEmail||!validPhone||!validPwd || !validMatch
                  ? "mt-8 mx-auto w-full bg-gray-300 rounded-xl text-white py-2"
                  : "mt-8 mx-auto w-full bg-blue-700 rounded-xl text-white py-2 hover:scale-110 duration-200"
              }
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
