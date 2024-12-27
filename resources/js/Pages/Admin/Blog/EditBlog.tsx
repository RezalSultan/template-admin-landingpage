import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import FormEditBlog from "./_components/FormEditBlog";
import { AllBlogSchema } from "@/types/BlogType";

export default function EditBlog({
  dataBlog,
  errorMessage,
  currentTab,
}: {
  dataBlog: AllBlogSchema;
  errorMessage?: string;
  currentTab: string;
}) {
  return (
    <AuthenticatedLayout
      label={currentTab === "edit" ? "Edit Artikel" : "Lihat Artikel"}
      previousPathname="/admin/my-blog"
    >
      <Head title="Update My Blog" />

      <div className="p-4">
        <FormEditBlog
          dataBlog={dataBlog}
          errorMessage={errorMessage}
          currentTab={currentTab}
        />
      </div>
    </AuthenticatedLayout>
  );
}
