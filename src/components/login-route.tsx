import React from "react";
import { Button } from "./ui/button";

function Login() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <h2>Login to your account</h2>
        <p>Enter your email below to login to your account</p>
        <form action="submit">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="m@example.com" />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="password here" />
        </form>
        <Button>Login</Button>
        <Button>Forgot your Password?</Button>
        <p>Or continue with</p>
        <Button>Login with Google</Button>
      </div>
    </>
  );
}

export default Login;
