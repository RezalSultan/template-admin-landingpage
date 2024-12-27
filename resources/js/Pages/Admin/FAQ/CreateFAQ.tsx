import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import FormCreateFAQ from "./_components/FormCreateFAQ";

export default function CreateFAQ({ errorMessage }: { errorMessage?: string }) {
  return (
    <AuthenticatedLayout label="Tambah FAQ" previousPathname="/admin/my-faq">
      <Head title="Create FAQ" />

      <div className="p-4">
        <FormCreateFAQ errorMessage={errorMessage} />
      </div>
    </AuthenticatedLayout>
  );
}
