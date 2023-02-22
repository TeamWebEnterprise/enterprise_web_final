import { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequest";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <section className=' bg-[#437BE8] min-h-screen flex items-center justify-center shadow-gray-500 shadow-lg'>
      <div className='sm:max-w-2xl ml-5 mr-5 rounded-xl md:rounded-2xl bg-[#FFFFFFFF] mx-auto flex shadow-lg max-w-6xl p-5 '>
        <div className='px-5'>
          <h2 className='font-bold text-2xl'> Login</h2>
          <p className='text-sm mt-4'>
            Please enter email and password to login client
          </p>
          <form className='flex flex-col grap-4' onSubmit={handleSubmit}>
            <label className=' mt-3 font-bold text-sm '>username</label>
            <input
              className=' p-2 mt-1  border-b-2 outline-none'
              type='text'
              name='username'
              ref={userRef}
              autoComplete='off'
              id='username'
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              required
            ></input>
            <label className=' mt-3 font-bold text-sm'>Password</label>
            <input
              className='p-2 mt-1  border-b-2 outline-none'
              type='password'
              name='password'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id='password'
              required
            ></input>
            <div className=' form-check mt-1'>
              <input
                class=' rounded-full form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                type='checkbox'
                value=''
                id='flexCheckDefault'
              ></input>
              <label
                class='form-check-label inline-block text-black font-bold text-sm '
                for='flexCheckDefault'
              >
                Remember me
              </label>
            </div>
            <button className='mt-3 mx-auto w-full bg-blue-700 rounded-xl text-white py-2 hover:scale-110 duration-200'>
              Login
            </button>
          </form>

          <div className='mt-10 grid grid-cols-3 items-center text-gray-500'>
            <hr className='outline-gray-700' />
            <p className='text-center text-sm'>OR</p>
            <hr className='outline-gray-700' />
          </div>
          <button className=' justify-center flex mt-5 w-full rounded-xl bg-white border py-2 hover:scale-110 duration-200'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='25'
              fill='currentColor'
              class='bi bi-google '
              viewBox='0 0 16 16'
              className='mr-2 '
            >
              <path d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' />
            </svg>
            Login with google
          </button>
          <p className='mt-10 text-xs border-b py-4 '>Forgot your password?</p>
          <div className='sm: text-xs mt-3 font-bold flex justify-between items-center md:text-sm '>
            <p className=' md:text-black '>If your don't have an account..</p>
            <button className='py-2 px-5 bg-green-500 border rounded-xl hover:scale-110 duration-200'>
              <a className='text-white' href='/register'>
                Register
              </a>
            </button>
          </div>
        </div>
        <div className='md:block hidden w-1/2 shadow-xl rounded-xl shadow-gray-500 '>
          <img
            src='https://sumfinity.com/wp-content/uploads/2017/08/Greenwich-University.jpg'
            className=' rounded-xl w-auto h-full'
          ></img>
        </div>
      </div>
    </section>
  );
};
export default Login;
