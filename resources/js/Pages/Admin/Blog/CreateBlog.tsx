import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import FormCreateBlog from "./_components/FormCreateBlog";

export default function CreateBlog({
  errorMessage,
}: {
  errorMessage?: string;
}) {
  return (
    <AuthenticatedLayout
      label="Tambah Artikel"
      previousPathname="/admin/my-blog"
    >
      <Head title="Create My Blog" />

      <div className="p-4">
        <FormCreateBlog errorMessage={errorMessage} />
      </div>
    </AuthenticatedLayout>
  );
}
