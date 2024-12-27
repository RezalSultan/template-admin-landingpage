import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import PreAuthLayout from "@/Layouts/PreAuthLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <PreAuthLayout>
      <Head title="Forgot Password" />
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
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
          </div>

          <form onSubmit={submit}>
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
              <div className="mt-4 w-full">
                <Button disabled={processing} type="submit" className="w-full">
                  Email Password Reset Link
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </PreAuthLayout>
  );
}
