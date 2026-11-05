"use client"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Lock, EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const savedEmail = sessionStorage.getItem("signupEmail");
    const savedPassword = sessionStorage.getItem("signupPassword");

    startTransition(() => {
      if (savedEmail) {
        setEmail(savedEmail);
      }
      if (savedPassword) {
        setPassword(savedPassword);
      }
    });
  }, []);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password!");
      return;
    }
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });
      if (error) {
        alert(error.message || "Login failed!");
        return;
      }
      sessionStorage.removeItem("signupEmail");
      sessionStorage.removeItem("signupPassword");

      alert("Login successful!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again!");
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
      <div className="w-full max-w-sm p-2">
        <div className={cn("flex flex-col gap-6 ")}>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">
                      Email
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="pl-9 h-10 bg-gray-50 border-gray-200 text-xs focus-visible:ring-[#0ead69]"
                      />
                    </div>
                  </Field>

                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">
                        Password
                      </FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-xs text-gray-500 underline-offset-4 hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                    <div className="relative mb-4">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="pl-9 pr-10 h-10 bg-gray-50 border-gray-200 text-xs focus-visible:ring-[#0ead69]" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </Field>

                  <Field>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-[#0ead69] hover:bg-[#07c573] mb-3 cursor-pointer">
                      {loading ? "Logging in..." : "Login"}
                      {!loading && (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </Button>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-px flex-1 bg-slate-200 dark:bg-gray-700" />
                      <span className="text-xs text-slate-400">OR</span>
                      <div className="h-px flex-1 bg-slate-200 dark:bg-gray-700" />
                    </div>

                    <Button onClick={handleGithubLogin}
                      variant="outline"
                      type="button"
                      className="cursor-pointer mb-1">
                      Continue with Github
                    </Button>

                    <FieldDescription className="text-center">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/signup"
                        className="text-[#0ead69] hover:underline font-medium">
                        Sign up
                      </Link>
                    </FieldDescription>

                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
