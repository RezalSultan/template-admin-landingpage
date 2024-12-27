import { DataTable } from "@/Components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { DataGallerySchema } from "@/types/GalleryType";
import { columns } from "./_components/DataGalleryColums";

export default function Gallery({
  successAddMessage,
  successEditMessage,
  successDeleteMessage,
  successProfileMessage,
  successPassMessage,
  errorMessage,
  dataGalleries,
}: {
  successAddMessage?: string;
  successEditMessage?: string;
  successDeleteMessage?: string;
  successProfileMessage?: string;
  successPassMessage?: string;
  errorMessage?: string;
  dataGalleries: DataGallerySchema[];
}) {
  useEffect(() => {
    if (successAddMessage) {
      toast.success("Berhasil Tambah Galeri", {
        description: `${successAddMessage}`,
        position: "top-center",
      });
    }
  }, [successAddMessage]);

  useEffect(() => {
    if (successEditMessage) {
      toast.success("Berhasil Ubah Galeri", {
        description: `${successEditMessage}`,
        position: "top-center",
      });
    }
  }, [successEditMessage]);

  useEffect(() => {
    if (successDeleteMessage) {
      toast.success("Berhasil Hapus Galeri", {
        description: `${successDeleteMessage}`,
        position: "top-center",
      });
    }
  }, [successDeleteMessage]);

  return (
    <AuthenticatedLayout
      label="Galeri Saya"
      successProfileMessage={successProfileMessage}
      successPassMessage={successPassMessage}
      errorMessage={errorMessage}
    >
      <Head title="My Gallery" />

      <div className="w-full bg-card p-4">
        <DataTable
          data={dataGalleries ? dataGalleries : []}
          columns={columns(errorMessage)}
          searchKeys={["title"]}
        >
          <div className="flex items-center justify-between">
            <Link href="/admin/my-gallery/create">
              <Button size={"sm"}>
                <Plus size={28} className="text-primary-foreground" />
                Tambah Galeri
              </Button>
            </Link>
          </div>
        </DataTable>
      </div>
    </AuthenticatedLayout>
  );
}
