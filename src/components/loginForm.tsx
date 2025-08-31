"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSessionAuth } from "../hooks/use-session-auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

// class lists that are used across identical elements
const formInputClasses =
  "mb-2 border rounded-[3px] p-[5px] box-border text-[14px] md:text-[18px] lg:text-[20px]";
const formLabelClasses = "mb-1 font text-[14px] md:text-[18px] lg:text-[20px]";
const formMessageClasses = "text-xs italic text-[#ff1100] md:text-[16px] lg:text-[20px]";
const btnClasses =
  "cursor-pointer border rounded-[3px] w-full my-4 md:text-[18px] md:h-[40px] lg:text-[20px] lg:h-[44px]";

// add schemas as necessary
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Email address must be valid." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
});

export function ProfileForm() {
  const navigate = useNavigate();
  const { login, loading, error } = useSessionAuth({
    onLoginSuccess: (user) => {
      toast.success(`Welcome back, ${user.name}!`);
      navigate("/"); // Redirect to dashboard
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login({ email: values.email, password: values.password });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      toast.error(errorMessage);
    }
  }

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth endpoint
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="font-text flex flex-col items-center justify-center h-screen p-[30px]">
      <div className="flex flex-col w-80 max-w-[660px] items-center md:w-[480px] lg:w-[620px]">
        <h2 className="font-bold text-lg md:text-[22px] lg:text-[24px]">Login to your account</h2>
        <p className="text-gray-400 text-caption-text md:text-[14px] lg:text-[18px]">
          Enter your email below to login to your account
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={formLabelClasses}>Email</FormLabel>
                  <FormMessage className={formMessageClasses} />
                  <FormControl>
                    <Input placeholder="m@example.com" className={formInputClasses} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="relative flex flex-row justify-between">
                    <FormLabel className={formLabelClasses}>Password</FormLabel>
                    <div className="w-auto">
                      <Button
                        className={`cursor-help text-xs font-thin text-white absolute top-2 right-0 p-0 m-0 h-0`}
                      >
                        Forgot your Password?
                      </Button>
                    </div>
                  </div>
                  <FormMessage className={formMessageClasses} />
                  <FormControl>
                    <Input
                      placeholder="...here"
                      type="password"
                      className={formInputClasses}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button 
              className={`${btnClasses} box-border !bg-[#FF8F60] text-black`} 
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>
        </Form>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
        <p className="text-gray-400 text-[14px] md:text-[16px]">Or continue with</p>
        <Button 
          className={`${btnClasses} bg-transparent text-white border border-gray-600 hover:bg-gray-800`}
          onClick={handleGoogleLogin}
          type="button"
          disabled={loading}
        >
          Login with Google
        </Button>
        <p className="text-gray-400 text-[12px] md:text-[14px] mt-4">
          Don't have an account?{" "}
          <button 
            onClick={() => navigate("/welcome")}
            className="text-[#FF8F60] hover:underline"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}
