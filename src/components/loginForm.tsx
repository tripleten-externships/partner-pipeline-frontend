"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as auth from "../utils/auth";
import { client } from "../store";

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
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  // --- added from the prebuilt one in auth.ts. Minorly corrected to fit the new schema. - Alex
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await auth.login({ email: values.email, password: values.password });

    if (result.__typename === "UserAuthenticationWithPasswordSuccess") {
      // Make Apollo forget any anonymous cache and re-fetch as the logged-in user
      await client.resetStore();
      window.location.replace("/"); // or window.location.replace("/")
    } else {
      console.error(result.message);
      // toast.error(result.message);
    }
  }
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
            <Button className={`${btnClasses} box-border !bg-[#FF8F60] text-black`} type="submit">
              Login
            </Button>
          </form>
        </Form>
        <p className="text-gray-400 text-[14px] md:text-[16px]">Or continue with</p>
        <Button className={`${btnClasses} bg-transparent text-white `}>Login with Google</Button>
      </div>
    </div>
  );
}
