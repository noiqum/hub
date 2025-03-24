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
    email: Schema.string().email(),
    password: Schema.string().min(8),
});

export default function LoginPage() {
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
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: { email: string; password: string }) => {
        try {
            const response = await fetch(`${base_url}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.status === "success") {
                    dispatch(setUser({
                        id: result.id,
                        name: result.name,
                        email: result.email,
                        role: result.role
                    }));

                    // Redirect based on where user came from
                    if (redirectTo === "listing-create") {
                        router.push("/listing-create");
                    } else {
                        router.push("/dashboard"); // Default redirect
                    }
                } else {
                    alert(result.message);
                }
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-primary-light-gray p-4 md:p-8">
            <form className="bg-white space-y-6 border border-gray-200 border-solid p-6 rounded-md w-full md:w-2xl lg:w-3xl" onSubmit={handleSubmit(onSubmit)}>
                <Link href="/">
                    <span className="w-full block font-bold text-2xl font-caveat text-primary-green mb-2 text-end">Hub.com</span>
                </Link>
                <div className="space-y-4">
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
                                {errors.email?.message}
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
                                {errors.password?.message}
                            </span>
                        )}
                    </label>
                    <div className="flex justify-end"><Button type="submit">Login</Button></div>
                </div>
                <p className="text-sm mt-4 text-end">Don&apos;t have an account? <Link className="text-primary-green" href="/register">Sign up</Link></p>
            </form>
        </div>
    );
}