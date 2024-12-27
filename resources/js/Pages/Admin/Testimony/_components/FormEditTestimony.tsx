import { Button } from "@/Components/ui/button";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import { Textarea } from "@/Components/ui/textarea";
import { useErrorNotifier } from "@/lib/useErrorNotifier";
import {
  DataTestimonySchema,
  FormTestimonyRequest,
} from "@/types/TestimonyType";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

const FormEditTestimony = ({
  dataTestimony,
  errorMessage,
}: {
  dataTestimony: DataTestimonySchema;
  errorMessage?: string;
}) => {
  const { data, setData, post, processing, errors, reset } =
    useForm<FormTestimonyRequest>({
      testimoni_name: dataTestimony.testimoni_name,
      satisfaction: dataTestimony.satisfaction,
      expression: dataTestimony.expression,
      avatar_testimoni: dataTestimony.avatar_testimoni ?? null,
    });

  const { resetErrorCount } = useErrorNotifier(
    "Gagal Ubah Testimoni",
    errorMessage,
  );

  console.log(errorMessage);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("testimony.edit.request", { id: dataTestimony.id }), {
      onError: (errors) => {
        console.log("Error:", errors);
      },
      onFinish: () => {
        resetErrorCount();
      },
    });
  };

  return (
    <>
      <div className="mt-1 w-full">
        <form className="flex w-full flex-col gap-1" onSubmit={onSubmit}>
          <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
            <div className="flex-1">
              <Label htmlFor="testimoni_name" className="relative">
                <span className="absolute -right-2 -top-1 text-red-400">*</span>
                Nama Testimoni
              </Label>
              <Input
                id="testimoni_name"
                type="text"
                value={data.testimoni_name}
                onChange={(e) => setData("testimoni_name", e.target.value)}
                placeholder="nama testimoni"
                disabled={processing}
              />
              <InputError message={errors.testimoni_name} className="mt-2" />
            </div>
            <div className="flex-1">
              <Label htmlFor="avatar_testimoni" className="relative">
                Upload Avatar Testimoni
              </Label>
              <div className="flex items-center justify-center gap-2 overflow-hidden">
                <label
                  htmlFor="avatar_testimoni"
                  className={`inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground ${processing && "!pointer-events-none !opacity-50"}`}
                >
                  <Plus
                    size={16}
                    className="relative h-4 w-4 fill-foreground"
                  />
                  Tambah Foto
                  <Input
                    id="avatar_testimoni"
                    type="file"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        setData("avatar_testimoni", files[0]);
                      }
                    }}
                    placeholder="upload cover"
                    accept="image/png, image/jpeg, image/jpg"
                    disabled={processing}
                    className="hidden cursor-pointer"
                  />
                </label>
                <p className="line-clamp-1 w-full">
                  {data.avatar_testimoni &&
                  typeof data.avatar_testimoni !== "string" &&
                  "name" in data.avatar_testimoni
                    ? (data.avatar_testimoni as File).name
                    : typeof data.avatar_testimoni === "string"
                      ? data.avatar_testimoni.replace(
                          /^images\/testimonies\//,
                          "",
                        )
                      : "No file"}
                </p>
              </div>
              <InputError message={errors.avatar_testimoni} className="mt-2" />
            </div>
          </div>
          <div className="flex w-full flex-col-reverse gap-x-4 gap-y-2 md:flex-row">
            <div className="flex-1">
              <Label className="relative">
                <span className="absolute -right-2 -top-1 text-red-400">*</span>
                Tingkat Kepuasan
              </Label>
              <Select
                disabled={processing}
                value={data.satisfaction.toString()}
                onValueChange={(e: string) => {
                  const intValue = parseInt(e, 10);
                  setData("satisfaction", intValue);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipe">
                    {data.satisfaction
                      ? `Bintang ${data.satisfaction}`
                      : "satisfaction"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Bintang 1</SelectItem>
                  <SelectItem value="2">Bintang 2</SelectItem>
                  <SelectItem value="3">Bintang 3</SelectItem>
                  <SelectItem value="4">Bintang 4</SelectItem>
                  <SelectItem value="5">Bintang 5</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.satisfaction} className="mt-2" />
            </div>
            <div className="relative flex-1">
              {data.avatar_testimoni && (
                <>
                  <div
                    onClick={() => setData("avatar_testimoni", null)}
                    className="group absolute right-0 top-0 cursor-pointer rounded-full p-1.5 transition-all hover:bg-secondary/50"
                  >
                    <Trash2 size={18} className="text-destructive" />
                  </div>
                  <div className="mt-4 flex w-full flex-col items-center justify-center">
                    <img
                      src={
                        typeof data.avatar_testimoni === "string"
                          ? `/${data.avatar_testimoni}`
                          : URL.createObjectURL(data.avatar_testimoni as File)
                      }
                      alt="Preview Avatar Testimony"
                      className="w-8/12 rounded-sm object-cover xl:w-6/12"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
            <div className="flex-1">
              <Label htmlFor="expression" className="relative">
                <span className="absolute -right-2 -top-1 text-red-400">*</span>{" "}
                Ungkapan
              </Label>
              <Textarea
                id="expression"
                value={data.expression}
                onChange={(e) => setData("expression", e.target.value)}
                placeholder="ungkapan pemberi testimoni"
                disabled={processing}
              />
              <InputError message={errors.expression} className="mt-2" />
            </div>
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

export default FormEditTestimony;
