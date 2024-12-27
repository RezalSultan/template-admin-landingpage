import { Button } from "@/Components/ui/button";
import { CalendarIcon, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import { useErrorNotifier } from "@/lib/useErrorNotifier";
import { FormGalleryRequest } from "@/types/GalleryType";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/Components/ui/calendar";

const FormCreateGallery = ({ errorMessage }: { errorMessage?: string }) => {
  const { data, setData, post, processing, errors, reset } =
    useForm<FormGalleryRequest>({
      name_url: null,
      title: "",
      description: "",
      event_date: null,
    });

  const { resetErrorCount } = useErrorNotifier(
    "Gagal Tambah Galeri",
    errorMessage,
  );

  console.log(errorMessage);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("gallery.create.request"), {
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
              <Label htmlFor="title">Judul Galeri</Label>
              <Input
                id="title"
                type="text"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
                placeholder="judul galeri"
                disabled={processing}
              />
              <InputError message={errors.title} className="mt-2" />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <Label htmlFor="event_date" className="relative mt-1.5 w-fit">
                Tanggal Galeri
              </Label>
              <div className="flex w-full gap-2">
                <Popover>
                  <PopoverTrigger asChild className="flex-1">
                    <Button
                      disabled={processing}
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !data.event_date && "text-muted-foreground",
                      )}
                    >
                      {data.event_date ? (
                        format(data.event_date, "dd MMMM yyyy", {
                          locale: id,
                        })
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        data.event_date ? new Date(data.event_date) : undefined
                      }
                      onSelect={(date) =>
                        setData(
                          "event_date",
                          date
                            ? format(new Date(date), "yyyy-MM-dd HH:mm:ss")
                            : null,
                        )
                      }
                      disabled={(date) => {
                        return date < new Date("1900-01-01");
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <InputError message={errors.event_date} className="mt-2" />
            </div>
          </div>
          <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
            <div className="flex-1">
              <Label htmlFor="name_url" className="relative">
                Upload Galeri
              </Label>
              <div className="flex items-center justify-center gap-2 overflow-hidden">
                <label
                  htmlFor="name_url"
                  className={`inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground ${processing && "!pointer-events-none !opacity-50"}`}
                >
                  <Plus
                    size={16}
                    className="relative h-4 w-4 fill-foreground"
                  />
                  Tambah Foto
                  <Input
                    id="name_url"
                    type="file"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        setData("name_url", files[0]);
                      }
                    }}
                    placeholder="upload cover"
                    accept="image/png, image/jpeg, image/jpg"
                    disabled={processing}
                    className="hidden cursor-pointer"
                  />
                </label>
                <p className="line-clamp-1 w-full">
                  {data.name_url &&
                  typeof data.name_url !== "string" &&
                  "name" in data.name_url
                    ? (data.name_url as File).name
                    : "No file"}
                </p>
              </div>
              <InputError message={errors.name_url} className="mt-2" />
            </div>
            <div className="flex-1">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={data.description as string}
                onChange={(e) => setData("description", e.target.value)}
                placeholder="deskripsi"
                disabled={processing}
              />
              <InputError message={errors.description} className="mt-2" />
            </div>
          </div>
          <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
            <div className="relative flex-1">
              {data.name_url && (
                <>
                  <div
                    onClick={() => setData("name_url", null)}
                    className="group absolute right-0 top-0 cursor-pointer rounded-full p-1.5 transition-all hover:bg-secondary/50"
                  >
                    <Trash2 size={18} className="text-destructive" />
                  </div>
                  <div className="mt-4 flex w-full flex-col items-center justify-center">
                    <img
                      src={URL.createObjectURL(data.name_url as File)}
                      alt="Preview Avatar Gallery"
                      className="w-10/12 rounded-sm object-cover"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="hidden flex-1 lg:block"></div>
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
              Tambah
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormCreateGallery;
