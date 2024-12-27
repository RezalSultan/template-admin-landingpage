import { DataTable } from "@/Components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { columns } from "./_components/DataTestimonyColums";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { Inertia } from "@inertiajs/inertia";
import { DataTestimonySchema } from "@/types/TestimonyType";

export default function Testimony({
  successAddMessage,
  successEditMessage,
  successDeleteMessage,
  successProfileMessage,
  successPassMessage,
  errorMessage,
  dataTestimonies,
}: {
  successAddMessage?: string;
  successEditMessage?: string;
  successDeleteMessage?: string;
  successProfileMessage?: string;
  successPassMessage?: string;
  errorMessage?: string;
  dataTestimonies: DataTestimonySchema[];
}) {
  useEffect(() => {
    if (successAddMessage) {
      toast.success("Berhasil Tambah Testimoni", {
        description: `${successAddMessage}`,
        position: "top-center",
      });
    }
  }, [successAddMessage]);

  useEffect(() => {
    if (successEditMessage) {
      toast.success("Berhasil Ubah Testimoni", {
        description: `${successEditMessage}`,
        position: "top-center",
      });
    }
  }, [successEditMessage]);

  useEffect(() => {
    if (successDeleteMessage) {
      toast.success("Berhasil Hapus Testimoni", {
        description: `${successDeleteMessage}`,
        position: "top-center",
      });
    }
  }, [successDeleteMessage]);

  return (
    <AuthenticatedLayout
      label="Testimoni"
      successProfileMessage={successProfileMessage}
      successPassMessage={successPassMessage}
      errorMessage={errorMessage}
    >
      <Head title="Testimony" />

      <div className="w-full bg-card p-4">
        <DataTable
          data={dataTestimonies ? dataTestimonies : []}
          columns={columns(errorMessage)}
          searchKeys={["testimoni_name"]}
        >
          <div className="flex items-center justify-between">
            <Link href="/admin/testimony/create">
              <Button size={"sm"}>
                <Plus size={28} className="text-primary-foreground" />
                Tambah Testimoni
              </Button>
            </Link>
          </div>
        </DataTable>
      </div>
    </AuthenticatedLayout>
  );
}
