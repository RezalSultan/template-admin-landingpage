"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button } from "../ui/button";

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfrim: () => void;
  loading: boolean;
};

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfrim,
  loading,
}) => {
  const [isMoundted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMoundted) {
    return null;
  }
  return (
    <>
      <Modal
        title="Apakah anda yakin menghapus data ini?"
        description="Aksi ini tidak dapat dikembalikan"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex w-full items-center justify-center gap-2 sm:justify-end">
          <Button disabled={loading} onClick={onClose} variant={"outline"}>
            Batal
          </Button>
          <Button
            disabled={loading}
            onClick={onConfrim}
            variant={"destructive"}
          >
            Lanjutkan
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AlertModal;
