"use client";

import useStoreModal from "@/Hooks/use-store-modal";
import Modal from "./Modal";
import { useForm } from "@inertiajs/react";
import { Button } from "../ui/button";

const LogoutModal = () => {
  const storeModal = useStoreModal();

  const { post } = useForm();

  const handleLogout = () => {
    post(route("logout"));
    storeModal.onClose();
  };
  return (
    <Modal
      title="Apakah Anda Ingin Keluar?"
      description="Aksi ini tidak bisa dikembalikan setelah anda setuju"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="flex w-full items-center justify-center gap-2 sm:justify-end">
        <Button onClick={storeModal.onClose}>Batal</Button>
        <Button variant={"destructive"} onClick={handleLogout}>
          Keluar
        </Button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
