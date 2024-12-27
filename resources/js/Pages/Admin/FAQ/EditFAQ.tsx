import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DataFAQSchema } from "@/types/FAQType";
import FormEditFAQ from "./_components/FormEditFAQ";
import DeleteButton from "./_components/DeleteButton";

export default function EditFAQ({
  dataFAQ,
  errorMessage,
}: {
  dataFAQ: DataFAQSchema;
  errorMessage?: string;
}) {
  return (
    <AuthenticatedLayout label="Edit FAQ" previousPathname="/admin/my-faq">
      <Head title="Edit FAQ" />

      <div className="p-4">
        <div className="flex w-full items-center justify-end">
          <DeleteButton dataFAQ={dataFAQ} />
        </div>
        <FormEditFAQ dataFAQ={dataFAQ} errorMessage={errorMessage} />
      </div>
    </AuthenticatedLayout>
  );
}
