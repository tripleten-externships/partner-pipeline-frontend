import React, { useState } from "react";
import { ProfileForm } from "./loginForm";
import { RegisterForm } from "./registerForm";
import { Button } from "./ui/button";

export default function WelcomePage() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <div className="flex justify-center pt-8">
        <div className="flex bg-zinc-800 rounded-lg p-1">
          <Button
            variant={isLoginMode ? "default" : "ghost"}
            className={`px-6 py-2 rounded-md transition-all ${
              isLoginMode 
                ? "bg-[#FF8F60] text-black" 
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setIsLoginMode(true)}
          >
            Sign In
          </Button>
          <Button
            variant={!isLoginMode ? "default" : "ghost"}
            className={`px-6 py-2 rounded-md transition-all ${
              !isLoginMode 
                ? "bg-[#FF8F60] text-black" 
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setIsLoginMode(false)}
          >
            Sign Up
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex flex-col items-center justify-center">
        {isLoginMode ? <ProfileForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
