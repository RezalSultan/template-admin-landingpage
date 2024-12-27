import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import FormCreateGallery from "./_components/FormCreateGallery";

export default function CreateGallery({
  errorMessage,
}: {
  errorMessage?: string;
}) {
  return (
    <AuthenticatedLayout
      label="Tambah Galeri"
      previousPathname="/admin/my-gallery"
    >
      <Head title="Create Gallery" />

      <div className="p-4">
        <FormCreateGallery errorMessage={errorMessage} />
      </div>
    </AuthenticatedLayout>
  );
}
