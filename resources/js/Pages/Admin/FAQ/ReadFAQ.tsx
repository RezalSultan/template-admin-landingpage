import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { DataFAQSchema } from "@/types/FAQType";
import DeleteButton from "./_components/DeleteButton";
import { Button } from "@/Components/ui/button";
import { Edit } from "lucide-react";

export default function ReadFAQ({ dataFAQ }: { dataFAQ: DataFAQSchema }) {
  return (
    <AuthenticatedLayout label="Lihat FAQ" previousPathname="/admin/my-faq">
      <Head title="Read FAQ" />

      <div className="w-full p-4">
        <div className="mt-4 flex w-full items-center justify-end gap-4">
          <Link href={`/admin/my-faq/${dataFAQ.id}/edit`}>
            <Button size={"sm"} variant={"secondary"}>
              <Edit size={20} className="text-secondary-foreground" /> Edit Data
            </Button>
          </Link>

          <DeleteButton dataFAQ={dataFAQ} />
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
            <div className="flex-1">
              <p className="text-normal font-semibold">
                Pertanyaan yang Sering Ditanyakan :
              </p>
              <p className="mt-1">{dataFAQ.question}</p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
            <div className="flex-1">
              <p className="text-normal font-semibold">Jawaban :</p>
              <p className="mt-1">{dataFAQ.answer}</p>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
