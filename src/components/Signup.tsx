import React from "react";

type Props = {};

const Signup = (props: Props) => {
  return (
    <div className="w-[310px] h-[410px] flex flex-col justify-between items-center bg-teal-800 rounded-lg border-2 border-white text-white shadow-lg shadow-lime-800/60">
      <form className="h-52 w-full p-4 space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="inputClass"
        />
        <input
          type="text"
          placeholder="Email"
          className="inputClass"
        />
        <input
          type="text"
          placeholder="Password"
          className="inputClass"
        />
      </form>
      <button className="h-[38px] 44px bg-white text-teal-800 font-bold rounded hover:bg-orange-300 hover:text-white">
        Sign up
      </button>
      <p>Follow me on YouTube, Twitter and Instagram. Thank you!</p>
      <h3>Already have an account? Log in.</h3>
    </div>
  );
};

export default Signup;
