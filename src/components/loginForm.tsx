"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
const formInputClasses = "mb-2 border rounded-[3px] p-[5px] box-border text-[14px]";
const formLabelClasses = "mb-1 font text-[14px]";
const formMessageClasses = "text-xs italic text-[#ff1100]";

/* 
  SCREEN SIZES (px) as defined in tailwind.config.js
  >small< 799 and smaller
  Title:      18       -
  Subtext:    12 -
  Label:      14   -
  Error:      12 -
  PlHolder:   14   -
  ForgotPW:   12 -
  BtnTxt:     14   -
  OrContWith: 14   -

  >medium< 800 to 1199 +4px
  
  
  >large< 1200+
*/

// add schemas as necessary
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    // .min(1, { message: "Email is required" })
    .email({ message: "Email address must be valid." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="font-text flex flex-col items-center justify-center h-screen p-[30px]">
      <div className="flex flex-col w-full max-w-80 items-center">
        <h2 className="font-bold text-lg">Login to your account</h2>
        <p className="text-gray-400 text-caption-text">
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
                      <Button className="text-xs font-thin text-white absolute top-2 right-0 p-0 m-0 h-0">
                        Forgot your Password?
                      </Button>
                    </div>
                  </div>
                  <FormMessage className={formMessageClasses} />
                  <FormControl>
                    <Input placeholder="...here" className={formInputClasses} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="border rounded-[3px] !bg-[#FF8F60] text-black w-full my-4"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
        <p className="text-gray-400 text-[14px]">Or continue with</p>
        <Button className="w-full my-4 border rounded-[3px] bg-transparent text-white">
          Login with Google
        </Button>
      </div>
    </div>
  );
}
