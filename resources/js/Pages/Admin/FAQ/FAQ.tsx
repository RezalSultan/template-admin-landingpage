import { DataTable } from "@/Components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { columns } from "./_components/DataFAQColums";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { Inertia } from "@inertiajs/inertia";
import { DataFAQSchema } from "@/types/FAQType";

export default function FAQ({
  successAddMessage,
  successEditMessage,
  successDeleteMessage,
  successProfileMessage,
  successPassMessage,
  errorMessage,
  dataFAQs,
}: {
  successAddMessage?: string;
  successEditMessage?: string;
  successDeleteMessage?: string;
  successProfileMessage?: string;
  successPassMessage?: string;
  errorMessage?: string;
  dataFAQs: DataFAQSchema[];
}) {
  useEffect(() => {
    if (successAddMessage) {
      toast.success("Berhasil Tambah FAQ", {
        description: `${successAddMessage}`,
        position: "top-center",
      });
    }
  }, [successAddMessage]);

  useEffect(() => {
    if (successEditMessage) {
      toast.success("Berhasil Edit FAQ", {
        description: `${successEditMessage}`,
        position: "top-center",
      });
    }
  }, [successEditMessage]);

  useEffect(() => {
    if (successDeleteMessage) {
      toast.success("Berhasil Hapus FAQ", {
        description: `${successDeleteMessage}`,
        position: "top-center",
      });
    }
  }, [successDeleteMessage]);

  return (
    <AuthenticatedLayout
      label="Frequently Asked Questions"
      successProfileMessage={successProfileMessage}
      successPassMessage={successPassMessage}
      errorMessage={errorMessage}
    >
      <Head title="FAQ" />

      <div className="w-full bg-card p-4">
        <DataTable
          data={dataFAQs ? dataFAQs : []}
          columns={columns(errorMessage)}
          searchKeys={["question"]}
        >
          <div className="flex items-center justify-between">
            <Link href="/admin/my-faq/create">
              <Button size={"sm"}>
                <Plus size={28} className="text-primary-foreground" />
                Tambah FAQ
              </Button>
            </Link>
          </div>
        </DataTable>
      </div>
    </AuthenticatedLayout>
  );
}
