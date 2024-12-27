"use client";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { RotateCcw } from "lucide-react";
import { useErrorNotifier } from "@/lib/useErrorNotifier";
import InputError from "../InputError";
import { Label } from "../ui/label";
import { useForm } from "@inertiajs/react";
import { useSuccessNotifier } from "@/lib/useSuccessNotifier";
import { User } from "@/types";

type SettingProfileFormProps = {
  user: User;
  errorMessage?: string;
  successProfileMessage?: string;
};

const SettingProfileForm: React.FC<SettingProfileFormProps> = ({
  user,
  errorMessage,
  successProfileMessage,
}) => {
  const { data, setData, patch, processing, errors, reset } = useForm({
    email: user.email,
    name: user.name,
  });

  const { resetErrorCount } = useErrorNotifier(
    "Gagal Ubah Profil",
    errorMessage,
  );

  const { resetSuccessCount } = useSuccessNotifier(
    "Berhasil Ubah Profil",
    successProfileMessage,
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route("profile.edit.request"), {
      onError: (errors) => {
        console.log(errors);
      },
      onFinish: () => {
        resetErrorCount();
        resetSuccessCount();
      },
    });
  };

  return (
    <>
      <div className="mt-4">
        <form className="flex flex-col gap-1" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="email" className="relative">
              <span className="absolute -right-2 -top-1 text-red-400">*</span>
              Email
            </Label>
            <p className="mt-0 w-full text-xs text-foreground">
              Mengubah email akan mempengaruhi login dan reset password
            </p>
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
            <Label htmlFor="name" className="relative">
              <span className="absolute -right-2 -top-1 text-red-400">*</span>
              Nama Lengkap
            </Label>
            <Input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              placeholder="Nama Lengkap"
              disabled={processing}
            />
            <InputError message={errors.name} className="mt-2" />
          </div>
          <div className="mt-4 flex w-full justify-end gap-4">
            <button
              disabled={processing}
              onClick={() => reset()}
              type="reset"
              className="group flex items-center justify-center"
            >
              <RotateCcw
                size={20}
                className="mr-2 transition-all duration-300 group-hover:-rotate-[320deg]"
              />
              Reset
            </button>
            <Button disabled={processing} type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SettingProfileForm;
