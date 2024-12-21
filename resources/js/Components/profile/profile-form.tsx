"use client";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { RotateCcw } from "lucide-react";
import { useErrorNotifier } from "@/lib/useErrorNotifier";
import InputError from "../InputError";
import { Label } from "../ui/label";
import { useForm } from "@inertiajs/react";

// const formSchema = z.object({
//   username: z.string().optional(),
//   email: z.string().optional(),
//   fullname: z
//     .string()
//     .min(1, { message: "Nama Lengkap minimal mempunyai 1 karakter" }),
//   position: z.string().min(1, { message: "Jabatan tidak boleh kosong" }),
//   type_id: z.enum(["nip", "nidk", "nim", "nik"]).optional(),
//   id_number: z.string().optional(),
// });

type SettingProfileFormProps = {
  errorMessage?: string;
};

const SettingProfileForm: React.FC<SettingProfileFormProps> = ({
  errorMessage,
}) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    username: "",
    email: "",
    fullname: "",
  });

  const { resetErrorCount } = useErrorNotifier(
    "Gagal Ubah Profil",
    errorMessage
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("admin.login"), {
      onFinish: () => {
        resetErrorCount();
      },
    });
  };

  return (
    <>
      <div className="mt-4">
        <form className="flex flex-col gap-1" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="username" className="relative">
              {" "}
              <span className="absolute -right-2 -top-1 text-red-400">*</span>
              Username
            </Label>

            <Input
              id="username"
              disabled={processing}
              type="text"
              value={data.username}
              onChange={(e) => setData("username", e.target.value)}
              placeholder="username"
              readOnly
            />
            <InputError message={errors.username} className="mt-2" />
          </div>
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
            <Label htmlFor="fullname">Nama Lengkap</Label>
            <Input
              id="fullname"
              type="text"
              value={data.fullname}
              onChange={(e) => setData("fullname", e.target.value)}
              placeholder="Nama Lengkap"
              disabled={processing}
            />
            <InputError message={errors.fullname} className="mt-2" />
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
