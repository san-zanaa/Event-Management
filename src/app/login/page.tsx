
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-6 md:p-12">
      <div className="w-full max-w-sm p-2">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required/>
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
                    <Input
                      id="password"
                      type="password"
                      required
                    />
                  </Field>

                  <Field>
                    <Button
                      type="submit"
                      className="bg-[#0ead69] hover:bg-[#07c573] mb-2 cursor-pointer">
                      Login
                      <ArrowRight className="h-4 w-4" />
                    </Button>

                    <p className="flex justify-center items-center text-xs text-gray-500 mb-2">
                      OR CONTINUE WITH
                    </p>
                    <Button
                      variant="outline"
                      type="button"
                      className="cursor-pointer mb-1">
                      Continue with Google
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
