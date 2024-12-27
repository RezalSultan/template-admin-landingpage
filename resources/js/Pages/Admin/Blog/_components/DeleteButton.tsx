import AlertModal from "@/Components/modals/AlertModal";
import { Button } from "@/Components/ui/button";
import { useErrorNotifier } from "@/lib/useErrorNotifier";
import { AllBlogSchema } from "@/types/BlogType";
import { Inertia } from "@inertiajs/inertia";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

const DeleteButton = ({
  dataBlog,
  errorMessage,
}: {
  dataBlog: AllBlogSchema;
  errorMessage?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetErrorCount } = useErrorNotifier(
    "Gagal Hapus Artikel",
    errorMessage,
  );

  const onConfirm = () => {
    Inertia.delete(route("blog.delete", { id: dataBlog.id }), {
      onBefore: () => {
        setLoading(true);
      },
      onError: (errors) => {
        console.log("Error:", errors);
      },
      onFinish: () => {
        resetErrorCount();
        setLoading(false);
      },
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfrim={onConfirm}
        loading={loading}
      />
      <div className="flex flex-1 items-center justify-end">
        <Button onClick={() => setOpen(true)} size={"sm"} variant={"outline"}>
          <Trash2 size={20} className="text-destructive" /> Hapus Data
        </Button>
      </div>
    </>
  );
};

export default DeleteButton;
