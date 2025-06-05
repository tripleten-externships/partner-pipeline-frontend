import React from "react";
import { Button } from "./ui/button";

function Login() {
  // class lists that are used across identical elements
  const formInputClasses = "mb-2 border rounded-[3px] p-[5px] box-border text-[14px]";
  const formLabelClasses = "mb-1 font-semibold text-[14px]";

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col w-full max-w-80 items-center">
          <h2 className="font-bold text-xl">Login to your account</h2>
          <p className="text-gray-400 text-[14px]">
            Enter your email below to login to your account
          </p>
          <form className="relative w-full" action="submit">
            <fieldset className="flex flex-col ">
              <label className={formLabelClasses} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className={formInputClasses}
                type="email"
                placeholder="m@example.com"
                required
              />
              <label className={formLabelClasses} htmlFor="password">
                Password
              </label>
              <Button className="text-xs text-white absolute bg-transparent bottom-[55px] right-0 p-0 m-0 h-0">
                Forgot your Password?
              </Button>
              <input
                id="password"
                className={formInputClasses}
                type="password"
                placeholder="...secret"
                required
              />
            </fieldset>
          </form>
          <Button className="w-full my-4">Login</Button>
          {/* <Button className="w-full relative">Forgot your Password?</Button> */}
          <p className="text-gray-400 text-[14px]">Or continue with</p>
          <Button className="w-full my-4 border rounded-[3px] bg-transparent text-white">
            Login with Google
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
