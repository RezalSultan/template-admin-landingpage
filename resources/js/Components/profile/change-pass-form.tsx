"use client";

import { Button } from "@/Components/ui/button";

import { Input } from "@/Components/ui/input";
import { useErrorNotifier } from "@/lib/useErrorNotifier";
import { useForm } from "@inertiajs/react";
import { Eye, EyeOff, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import InputError from "../InputError";
import { useSuccessNotifier } from "@/lib/useSuccessNotifier";

const ChangePassForm = ({
  errorMessage,
  successPassMessage,
}: {
  errorMessage?: string;
  successPassMessage?: string;
}) => {
  const [spyPassOld, setSpyPassOld] = useState(false);
  const [spyPassNew, setSpyPassNew] = useState(false);

  const { data, setData, patch, processing, errors, reset } = useForm({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const { resetErrorCount } = useErrorNotifier(
    "Gagal Ubah Password",
    errorMessage,
  );

  const { resetSuccessCount } = useSuccessNotifier(
    "Berhasil Ubah Password",
    successPassMessage,
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route("profile.edit.pass.request"), {
      onFinish: () => {
        resetErrorCount();
        resetSuccessCount();
        reset();
      },
    });
  };

  return (
    <>
      <div className="mt-4">
        <form className="flex flex-col gap-1" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="old_password" className="relative">
              <span className="absolute -right-2 -top-1 text-red-400">*</span>
              Password Lama
            </Label>
            <div className="relative">
              <Input
                id="old_password"
                disabled={processing}
                type={spyPassOld ? "text" : "password"}
                placeholder="password lama"
                className="pr-10"
                value={data.old_password}
                onChange={(e) => setData("old_password", e.target.value)}
              />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                onMouseDown={() => setSpyPassOld(true)}
                onMouseUp={() => setSpyPassOld(false)}
                onMouseLeave={() => setSpyPassOld(false)}
              >
                {spyPassOld ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
            </div>
            <InputError message={errors.old_password} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="new_password" className="relative">
              <span className="absolute -right-2 -top-1 text-red-400">*</span>
              Password Baru
            </Label>
            <p className="mt-0 w-full text-xs text-foreground">
              Password harus memiliki setidaknya 1 huruf besar, 1 huruf kecil, 1
              angka, dan 1 simbol.
            </p>
            <div className="relative">
              <Input
                id="new_password"
                disabled={processing}
                type={spyPassNew ? "text" : "password"}
                placeholder="password lama"
                className="pr-10"
                value={data.new_password}
                onChange={(e) => setData("new_password", e.target.value)}
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
            <InputError message={errors.new_password} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="confirm_new_password" className="relative">
              <span className="absolute -right-2 -top-1 text-red-400">*</span>
              Ulang Password Baru
            </Label>
            <Input
              id="confirm_new_password"
              disabled={processing}
              type={"password"}
              placeholder="ulang password baru"
              className="pr-10"
              value={data.confirm_new_password}
              onChange={(e) => setData("confirm_new_password", e.target.value)}
            />
            <InputError
              message={errors.confirm_new_password}
              className="mt-2"
            />
          </div>
          <div className="mt-4 flex w-full justify-end gap-4">
            <button
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
            <Button type="submit">Simpan Password</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassForm;
