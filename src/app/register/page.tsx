"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Schema from "zod";
import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { base_url } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice";

const schema = Schema.object({
    name: Schema.string().min(2, "Name must be at least 2 characters"),
    email: Schema.string().email("Please enter a valid email"),
    password: Schema.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: Schema.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export default function RegisterPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit = async (data: { name: string; email: string; password: string; confirmPassword: string }) => {
        try {

            const { confirmPassword, ...registerData } = data;

            const response = await fetch(`${base_url}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
                credentials: "include",
            });

            if (response.ok) {
                const result = await response.json();
                if (result.status === "success") {
                    dispatch(setUser({
                        id: result.id,
                        name: result.name,
                        email: result.email,
                        role: result.role || "user" // Default role if not provided
                    }));

                    // Redirect based on where user came from
                    if (redirectTo === "listing-create") {
                        router.push("/listing-create");
                    } else {
                        router.push("/"); // Default redirect
                    }
                } else {
                    alert(result.message);
                }
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-primary-light-gray p-4 md:p-8">
            <form className="bg-white space-y-6 border border-gray-200 border-solid p-6 rounded-md w-full md:w-2xl lg:w-3xl" onSubmit={handleSubmit(onSubmit)}>
                <Link href="/" className="flex w-full items-center justify-end my-4" >
                    <span className="font-bold text-2xl lg:text-3xl font-caveat text-primary-green">Hub.com</span>
                </Link>
                <div className="space-y-4">
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700 mb-1">
                            Full Name
                        </span>
                        <Input
                            type="text"
                            placeholder="Full Name"
                            {...register("name")}
                        />
                        {errors.name?.message && (
                            <span className="text-red-700 text-sm mt-1 block">
                                {errors.name?.message.toString()}
                            </span>
                        )}
                    </label>

                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700 mb-1">
                            Email
                        </span>
                        <Input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                        />
                        {errors.email?.message && (
                            <span className="text-red-700 text-sm mt-1 block">
                                {errors.email?.message.toString()}
                            </span>
                        )}
                    </label>

                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700 mb-1">
                            Password
                        </span>
                        <Input
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                        />
                        {errors.password?.message && (
                            <span className="text-red-700 text-sm mt-1 block">
                                {errors.password?.message.toString()}
                            </span>
                        )}
                    </label>

                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700 mb-1">
                            Confirm Password
                        </span>
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword?.message && (
                            <span className="text-red-700 text-sm mt-1 block">
                                {errors.confirmPassword?.message.toString()}
                            </span>
                        )}
                    </label>

                    <div className="flex justify-end"><Button type="submit">Register</Button></div>
                </div>
                <p className="text-sm mt-4 text-end">Already have an account? <Link className="text-primary-green" href="/login">Login</Link></p>
            </form>
        </div>
    );
}