import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import DeleteButton from "./_components/DeleteButton";
import { Button } from "@/Components/ui/button";
import { Edit } from "lucide-react";
import { DataTestimonySchema } from "@/types/TestimonyType";
import RenderStars from "@/Components/RenderStarts";

export default function ReadTestimony({
  dataTestimony,
}: {
  dataTestimony: DataTestimonySchema;
}) {
  return (
    <AuthenticatedLayout
      label="Lihat Testimoni"
      previousPathname="/admin/testimony"
    >
      <Head title="Read Testimony" />

      <div className="w-full p-4">
        <div className="mt-4 flex w-full items-center justify-end gap-4">
          <Link href={`/admin/testimony/${dataTestimony.id}/edit`}>
            <Button size={"sm"} variant={"secondary"}>
              <Edit size={20} className="text-secondary-foreground" /> Edit Data
            </Button>
          </Link>

          <DeleteButton dataTestimony={dataTestimony} />
        </div>
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
            <div className="flex-1">
              <p className="text-normal font-semibold">Avatar Testimoni</p>
              {dataTestimony.avatar_testimoni ? (
                <div className="mt-4 flex w-full flex-col items-center justify-center">
                  <img
                    src={`/${dataTestimony.avatar_testimoni}`}
                    alt="Preview Avatar Testimony"
                    className="w-1/2 rounded-sm object-cover md:w-10/12 xl:w-8/12"
                  />
                </div>
              ) : (
                "-"
              )}
            </div>
            <div className="mt-8 flex flex-1 flex-col items-start justify-start gap-3">
              <div className="w-full">
                <p className="text-normal font-semibold">Nama Testimoni</p>
                <p className="mt-1">{dataTestimony.testimoni_name}</p>
              </div>
              <div className="w-full">
                <p className="text-normal font-semibold">Tingkat Kepuasan</p>
                <p className="mt-1">
                  <RenderStars count={dataTestimony.satisfaction} />
                </p>
              </div>
              <div className="w-full">
                <p className="text-normal font-semibold">Ungkapan</p>
                <p className="mt-1">{dataTestimony.expression}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
