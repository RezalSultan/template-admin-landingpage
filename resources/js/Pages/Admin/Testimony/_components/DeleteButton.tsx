import AlertModal from "@/Components/modals/AlertModal";
import { Button } from "@/Components/ui/button";
import { useErrorNotifier } from "@/lib/useErrorNotifier";
import { DataTestimonySchema } from "@/types/TestimonyType";
import { Inertia } from "@inertiajs/inertia";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

const DeleteButton = ({
  dataTestimony,
  errorMessage,
}: {
  dataTestimony: DataTestimonySchema;
  errorMessage?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetErrorCount } = useErrorNotifier(
    "Gagal Hapus Testimony",
    errorMessage,
  );

  const onConfirm = () => {
    Inertia.delete(route("testimony.delete", { id: dataTestimony.id }), {
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
