import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteButton from "./_components/DeleteButton";
import { DataTestimonySchema } from "@/types/TestimonyType";
import FormEditTestimony from "./_components/FormEditTestimony";

export default function EditTestimony({
  dataTestimony,
  errorMessage,
}: {
  dataTestimony: DataTestimonySchema;
  errorMessage?: string;
}) {
  return (
    <AuthenticatedLayout
      label="Edit Testimoni"
      previousPathname="/admin/testimony"
    >
      <Head title="Edit Testimony" />

      <div className="p-4">
        <div className="flex w-full items-center justify-end">
          <DeleteButton dataTestimony={dataTestimony} />
        </div>
        <FormEditTestimony
          dataTestimony={dataTestimony}
          errorMessage={errorMessage}
        />
      </div>
    </AuthenticatedLayout>
  );
}
