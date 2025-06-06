"use client";

// Lib
import { cn } from "@/lib/utils";
// Shadcn
import { Button } from "@/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/card";
import { Input } from "@/shadcn/input";
import { Label } from "@/shadcn/label";
// React
import { useState } from "react";
// Next
import { useRouter } from "next/navigation";
// NextAuth
import { signIn } from "next-auth/react";
// Icons
import Spinner from "@/ui/icons/spinner";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  const [formState, setFormState] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
    if (loginError) setLoginError("");
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const signInResult = await signIn("credentials", {
        username: formState.username,
        password: formState.password,
        redirect: false,
      });

      if (signInResult?.error) {
        return setLoginError("Your account or password is incorrect.");
      }

      return router.push("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during login";
      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="space-y-6">
              {loginError && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">
                  {loginError}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  autoComplete="username"
                  autoFocus
                  disabled={isLoading}
                  id="username"
                  onChange={handleInputChange}
                  placeholder="admin"
                  required
                  type="text"
                  value={formState.username}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  autoComplete="current-password"
                  disabled={isLoading}
                  id="password"
                  onChange={handleInputChange}
                  required
                  type="password"
                  value={formState.password}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Spinner className="mr-2 size-5" /> : null}
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
