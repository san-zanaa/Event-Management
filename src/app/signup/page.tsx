"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowRight, User, Mail, Lock, Eye, EyeOff, Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignupPage({ className, ...props }: React.ComponentProps<"div">) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [loading, setLoading] = useState(false);

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!hasUppercase || !hasLowercase || !hasMinLength) {
            alert("Please fulfill all password requirements!");
            return;
        }
        setLoading(true);

        try {
            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
                image: photo || undefined,
            });
            if (error) {
                alert(error.message || "Signup failed!");
                return;
            }
            sessionStorage.setItem("signupEmail", email);
            sessionStorage.setItem("signupPassword", password);

            alert("Account created successfully!");
            router.push("/login");

        } catch (error) {
            console.error("Signup error:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    const handleGithubLogin = async () => {
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/create-event",
        });
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-6 md:p-12 dark:bg-[#15171D]">
            <div className="w-full max-w-sm p-2 ">
                <div className={cn("flex flex-col items-center", className)}>
                    <Card className="w-full max-w-[380px] border-none shadow-lg rounded-2xl bg-white dark:bg-[#1B1E26]">

                        <CardHeader className="items-center text-center pb-4">

                            <div className='flex gap-1 justify-center items-center'>
                                <Image src={"/images/Sociallogo.png"} alt='logo' height={50} width={50} className='w-10 h-12 object-contain' />
                            </div>

                            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                                Create Account
                            </CardTitle>

                            <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
                                Join the community and start driving social change
                            </CardDescription>

                        </CardHeader>

                        <CardContent className="px-5 pb-6">

                            <form onSubmit={handleSignup}>
                                <FieldGroup className="gap-3">
                                    <Field className="gap-1">
                                        <FieldLabel htmlFor="name" className="text-xs font-semibold">
                                            Full Name
                                        </FieldLabel>

                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Your Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className="pl-9 h-10 bg-gray-50 border-gray-200 text-xs focus-visible:ring-[#0ead69]"
                                            />
                                        </div>
                                    </Field>
                                    <Field className="gap-1">
                                        <FieldLabel htmlFor="email" className="text-xs font-semibold">
                                            Email Address
                                        </FieldLabel>

                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="name@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="pl-9 h-10 bg-gray-50 border-gray-200 text-xs focus-visible:ring-[#0ead69]"
                                            />
                                        </div>
                                    </Field>

                                    <Field className="gap-1">
                                        <FieldLabel htmlFor="photo" className="text-xs font-semibold">
                                            Profile Photo URL
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id="photo"
                                                type="url"
                                                placeholder="https://images.unsplash.com/..."
                                                value={photo}
                                                onChange={(e) => setPhoto(e.target.value)}
                                                className="h-10 bg-gray-50 border-gray-200 text-xs focus-visible:ring-[#0ead91]"
                                            />
                                        </div>
                                        <FieldDescription className="text-[10px] text-gray-400">
                                            Optional: Leave empty for default avatar
                                        </FieldDescription>
                                    </Field>

                                    <Field className="gap-1">
                                        <FieldLabel htmlFor="password" className="text-xs font-semibold">
                                            Password
                                        </FieldLabel>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="pl-9 pr-10 h-10 bg-gray-50 border-gray-200 text-xs focus-visible:ring-[#0ead69]" />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                                                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                            </button>
                                        </div>

                                        <div className="space-y-1 mt-1">
                                            <p className={`flex items-center gap-1 text-[10px] ${hasUppercase ? "text-green-600" : "text-gray-400"}`}>
                                                {hasUppercase ? <Check size={11} /> : <X size={11} />}
                                                At least one uppercase letter (A-Z)
                                            </p>
                                            <p className={`flex items-center gap-1 text-[10px] ${hasLowercase ? "text-green-600" : "text-gray-400"}`}>
                                                {hasLowercase ? <Check size={11} /> : <X size={11} />}
                                                At least one lowercase letter (a-z)
                                            </p>
                                            <p className={`flex items-center gap-1 text-[10px] ${hasMinLength ? "text-green-600" : "text-gray-400"}`}>
                                                {hasMinLength ? <Check size={11} /> : <X size={11} />}
                                                Minimum 6 characters length
                                            </p>
                                        </div>
                                    </Field>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-10 mt-1 bg-[#0ead69] hover:bg-[#07c573] text-white font-semibold text-xs cursor-pointer">
                                        {loading ? "Creating Account..." : "Register"}
                                        {!loading && <ArrowRight size={15} />}
                                    </Button>

                                    <div className="flex items-center gap-3">
                                        <div className="h-px flex-1 bg-slate-200 dark:bg-gray-700" />
                                        <span className="text-xs text-slate-400">OR</span>
                                        <div className="h-px flex-1 bg-slate-200 dark:bg-gray-700" />
                                    </div>

                                    
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleGithubLogin}
                                            className="h-12 w-full cursor-pointer rounded-xl border-slate-200 bg-white text-sm font-semibold text-gray-800 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-[#222630] dark:text-white dark:hover:bg-[#292D38]">
                                            Continue with GitHub
                                        </Button>

                                    <FieldDescription className="text-center text-xs text-gray-500 mt-1">
                                        Already have an account?{" "}
                                        <Link
                                            href="/login"
                                            className="text-[#0ead69] font-semibold hover:underline">
                                            Login here
                                        </Link>
                                    </FieldDescription>

                                </FieldGroup>
                            </form>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
