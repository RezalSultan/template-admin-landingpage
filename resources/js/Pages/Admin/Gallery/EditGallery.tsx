import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteButton from "./_components/DeleteButton";
import { DataGallerySchema } from "@/types/GalleryType";
import FormEditGallery from "./_components/FormEditGallery";

export default function EditGallery({
  dataGallery,
  errorMessage,
}: {
  dataGallery: DataGallerySchema;
  errorMessage?: string;
}) {
  return (
    <AuthenticatedLayout
      label="Edit Galeri"
      previousPathname="/admin/my-gallery"
    >
      <Head title="Edit Gallery" />

      <div className="p-4">
        <div className="flex w-full items-center justify-end">
          <DeleteButton dataGallery={dataGallery} />
        </div>
        <FormEditGallery
          dataGallery={dataGallery}
          errorMessage={errorMessage}
        />
      </div>
    </AuthenticatedLayout>
  );
}
