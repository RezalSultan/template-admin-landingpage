import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import FormCreateTestimony from "./_components/FormCreateTestimony";

export default function CreateTestimony({
  errorMessage,
}: {
  errorMessage?: string;
}) {
  return (
    <AuthenticatedLayout
      label="Tambah Testimoni"
      previousPathname="/admin/testimony"
    >
      <Head title="Create Testimony" />

      <div className="p-4">
        <FormCreateTestimony errorMessage={errorMessage} />
      </div>
    </AuthenticatedLayout>
  );
}
