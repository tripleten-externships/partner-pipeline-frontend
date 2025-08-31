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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// class lists that are used across identical elements
const formInputClasses =
  "mb-2 border rounded-[3px] p-[5px] box-border text-[14px] md:text-[18px] lg:text-[20px]";
const formLabelClasses = "mb-1 font text-[14px] md:text-[18px] lg:text-[20px]";
const formMessageClasses = "text-xs italic text-[#ff1100] md:text-[16px] lg:text-[20px]";
const btnClasses =
  "cursor-pointer border rounded-[3px] w-full my-4 md:text-[18px] md:h-[40px] lg:text-[20px] lg:h-[44px]";

// Registration form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Email address must be valid." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Password confirmation is required." }),
  role: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const navigate = useNavigate();
  const { register, loading, error } = useSessionAuth({
    onLoginSuccess: (user) => {
      toast.success(`Welcome, ${user.name}! Your account has been created.`);
      navigate("/"); // Redirect to dashboard
    },
  });

  // Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Student",
    },
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role || "Student",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed";
      toast.error(errorMessage);
    }
  }

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth endpoint
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="font-text flex flex-col items-center justify-center min-h-screen p-[30px]">
      <div className="flex flex-col w-80 max-w-[660px] items-center md:w-[480px] lg:w-[620px]">
        <h2 className="font-bold text-lg md:text-[22px] lg:text-[24px]">Create your account</h2>
        <p className="text-gray-400 text-caption-text md:text-[14px] lg:text-[18px] mb-4">
          Enter your information below to create your account
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={formLabelClasses}>Full Name</FormLabel>
                  <FormMessage className={formMessageClasses} />
                  <FormControl>
                    <Input placeholder="John Doe" className={formInputClasses} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={formLabelClasses}>Email</FormLabel>
                  <FormMessage className={formMessageClasses} />
                  <FormControl>
                    <Input placeholder="john@example.com" className={formInputClasses} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={formLabelClasses}>Role</FormLabel>
                  <FormMessage className={formMessageClasses} />
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={formInputClasses}>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Project Mentor">Project Mentor</SelectItem>
                      <SelectItem value="Lead Mentor">Lead Mentor</SelectItem>
                      <SelectItem value="External Partner">External Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={formLabelClasses}>Password</FormLabel>
                  <FormMessage className={formMessageClasses} />
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      className={formInputClasses}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={formLabelClasses}>Confirm Password</FormLabel>
                  <FormMessage className={formMessageClasses} />
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
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
              {loading ? "Creating account..." : "Create Account"}
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
          Sign up with Google
        </Button>
        <p className="text-gray-400 text-[12px] md:text-[14px] mt-4">
          Already have an account?{" "}
          <button 
            onClick={() => navigate("/login")}
            className="text-[#FF8F60] hover:underline"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}
