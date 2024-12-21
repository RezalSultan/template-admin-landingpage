import { DataTable } from "@/Components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { columns } from "./_components/DataBlogColums";

export const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com" },
];

export default function Dashboard({ success }: { success?: string }) {
  // useEffect(() => {
  //   if (success) {
  //     toast.success("Berhasil Login", {
  //       description: `${success}`,
  //       position: "top-center",
  //     });
  //   }
  // }, [success]);

  return (
    <AuthenticatedLayout label="Blog Saya">
      <Head title="My Blog" />

      <div className="w-full bg-card p-4">
        <DataTable
          data={users ? users : []}
          columns={columns}
          searchKeys={["fullname"]}
        ></DataTable>
      </div>
    </AuthenticatedLayout>
  );
}
