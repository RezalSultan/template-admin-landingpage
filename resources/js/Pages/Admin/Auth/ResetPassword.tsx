import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import PreAuthLayout from "@/Layouts/PreAuthLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const [spyPassNew, setSpyPassNew] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.reset.request"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <PreAuthLayout>
      <Head title="Reset Password" />
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
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="w-full">
            <div className="flex w-full flex-col items-center justify-center">
              <div>
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  autoComplete="username"
                  onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />
              </div>

              <div className="mt-4">
                <Label htmlFor="password">Password</Label>
                <p className="mt-0 w-full text-xs text-foreground">
                  Password harus memiliki setidaknya 1 huruf besar, 1 huruf
                  kecil, 1 angka, dan 1 simbol.
                </p>
                <div className="relative">
                  <Input
                    id="password"
                    disabled={processing}
                    type={spyPassNew ? "text" : "password"}
                    placeholder="password"
                    className="pr-10"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                  />
                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                    onMouseDown={() => setSpyPassNew(true)}
                    onMouseUp={() => setSpyPassNew(false)}
                    onMouseLeave={() => setSpyPassNew(false)}
                  >
                    {spyPassNew ? <Eye size={20} /> : <EyeOff size={20} />}
                  </div>
                </div>
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div className="mt-4">
                <Label htmlFor="password_confirmation">Confirm Password</Label>

                <Input
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData("password_confirmation", e.target.value)
                  }
                />

                <InputError
                  message={errors.password_confirmation}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="mt-4 w-full">
              <Button className="ms-4" disabled={processing}>
                Reset Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PreAuthLayout>
  );
}
