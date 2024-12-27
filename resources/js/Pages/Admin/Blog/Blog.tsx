import { DataTable } from "@/Components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { columns } from "./_components/DataBlogColums";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { Inertia } from "@inertiajs/inertia";
import { DataBlogSchema } from "@/types/BlogType";

export default function Blog({
  succesLogin,
  successAddMessage,
  successEditMessage,
  successDeleteMessage,
  successProfileMessage,
  successPassMessage,
  errorMessage,
  dataBlogs,
}: {
  succesLogin?: string;
  successAddMessage?: string;
  successEditMessage?: string;
  successDeleteMessage?: string;
  successProfileMessage?: string;
  successPassMessage?: string;
  errorMessage?: string;
  dataBlogs: DataBlogSchema[];
}) {
  useEffect(() => {
    if (succesLogin) {
      toast.success("Berhasil Login", {
        description: `${succesLogin}`,
        position: "top-center",
      });
    }
  }, [succesLogin]);

  useEffect(() => {
    if (successAddMessage) {
      toast.success("Berhasil Tambah Artikel", {
        description: `${successAddMessage}`,
        position: "top-center",
      });
    }
  }, [successAddMessage]);

  useEffect(() => {
    if (successEditMessage) {
      toast.success("Berhasil Edit Artikel", {
        description: `${successEditMessage}`,
        position: "top-center",
      });
    }
  }, [successEditMessage]);

  useEffect(() => {
    if (successDeleteMessage) {
      toast.success("Berhasil Hapus Artikel", {
        description: `${successDeleteMessage}`,
        position: "top-center",
      });
    }
  }, [successDeleteMessage]);

  return (
    <AuthenticatedLayout
      label="Artikel Saya"
      successProfileMessage={successProfileMessage}
      successPassMessage={successPassMessage}
      errorMessage={errorMessage}
    >
      <Head title="My Blog" />

      <div className="w-full bg-card p-4">
        <DataTable
          data={dataBlogs ? dataBlogs : []}
          columns={columns(errorMessage)}
          searchKeys={["title"]}
        >
          <div className="flex items-center justify-between">
            <Link href="/admin/my-blog/create">
              <Button size={"sm"}>
                <Plus size={28} className="text-primary-foreground" />
                Tambah Artikel
              </Button>
            </Link>
          </div>
        </DataTable>
      </div>
    </AuthenticatedLayout>
  );
}
