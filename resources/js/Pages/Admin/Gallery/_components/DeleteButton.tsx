import AlertModal from "@/Components/modals/AlertModal";
import { Button } from "@/Components/ui/button";
import { useErrorNotifier } from "@/lib/useErrorNotifier";
import { DataGallerySchema } from "@/types/GalleryType";
import { Inertia } from "@inertiajs/inertia";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

const DeleteButton = ({
  dataGallery,
  errorMessage,
}: {
  dataGallery: DataGallerySchema;
  errorMessage?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetErrorCount } = useErrorNotifier(
    "Gagal Hapus Galeri",
    errorMessage,
  );

  const onConfirm = () => {
    Inertia.delete(route("gallery.delete", { id: dataGallery.id }), {
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
      <Button onClick={() => setOpen(true)} size={"sm"} variant={"outline"}>
        <Trash2 size={20} className="text-destructive" /> Hapus Data
      </Button>
    </>
  );
};

export default DeleteButton;
