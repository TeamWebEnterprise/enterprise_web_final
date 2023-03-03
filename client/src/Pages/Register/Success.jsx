import React from "react";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

export const Success = () => {
  return (
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
          <h1 className='text-4xl text-center text-green-600 font-normal  mb-5'>Success</h1>
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
  );
};
