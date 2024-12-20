"use client";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import PreAuthLayout from "@/Layouts/PreAuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { Label } from "@/Components/ui/label";
import { useErrorNotifier } from "@/lib/useErrorNotifier";

const Login = ({
  status,
  errorMessage,
  canResetPassword,
}: {
  status?: string;
  errorMessage?: string;
  canResetPassword: boolean;
}) => {
  const [spy, setSpy] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
  });

  const { resetErrorCount } = useErrorNotifier("Gagal Login", errorMessage);

  useEffect(() => {
    if (status) {
      toast.success("Status", {
        description: `${status}`,
        position: "top-center",
      });
    }
  }, [status]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("admin.login"), {
      onFinish: () => {
        reset("password");
        resetErrorCount();
      },
    });
  };

  return (
    <>
      <PreAuthLayout>
        <Head title="Login" />
        <Card className="z-10 w-[90%] md:mx-0 md:w-1/2 xl:w-5/12 2xl:w-fit">
          <CardHeader className="w-full justify-center">
            <CardTitle className="flex w-full items-center justify-center">
              {/* <Image
            src={"/logo-1.png"}
            alt="logo"
            width={180}
            height={80}
            className="-mb-3 w-[160px]"
          /> */}
            </CardTitle>
            <CardDescription className="text-center text-2xl">
              Selamat Datang
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <form onSubmit={onSubmit} method="post">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="email"
                    disabled={processing}
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      disabled={processing}
                      type={spy ? "text" : "password"}
                      placeholder="password"
                      className="pr-10"
                      value={data.password}
                      onChange={(e) => setData("password", e.target.value)}
                    />
                    <div
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                      onMouseDown={() => setSpy(true)}
                      onMouseUp={() => setSpy(false)}
                      onMouseLeave={() => setSpy(false)}
                    >
                      {spy ? <Eye size={20} /> : <EyeOff size={20} />}
                    </div>
                  </div>
                  <InputError message={errors.password} className="mt-2" />
                </div>
                {canResetPassword && (
                  <Link
                    href={route("password.request")}
                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                  >
                    Forgot your password?
                  </Link>
                )}
                <div className="mt-4 w-full">
                  <Button
                    disabled={processing}
                    type="submit"
                    className="w-full"
                  >
                    Masuk
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
          <CardFooter>
            <p className="w-full text-center text-sm">
              <strong>Copyright &copy; 2025 Muhammad Rezal Sultan.</strong> All
              rights reserved.
            </p>
          </CardFooter>
        </Card>
      </PreAuthLayout>
    </>
  );
};

export default Login;
