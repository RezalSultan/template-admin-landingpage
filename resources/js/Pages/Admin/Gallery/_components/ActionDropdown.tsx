import { Edit, Eye, Trash2 } from "lucide-react";
import AlertModal from "@/Components/modals/AlertModal";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useErrorNotifier } from "@/lib/useErrorNotifier";
import { Link } from "@inertiajs/react";
import { DataGallerySchema } from "@/types/GalleryType";
import ModalCarouselView from "@/Components/ModalCarouselView";

type CellActionProps = {
  dataGallery: DataGallerySchema;
  errorMessage?: string;
};

const ActionDropdown: React.FC<CellActionProps> = ({
  dataGallery,
  errorMessage,
}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const handleCloseModal = () => {
    setIsModal(false);
  };

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
      onSuccess: () => {
        Inertia.reload();
      },
      onFinish: () => {
        resetErrorCount();
        setLoading(false);
      },
    });
  };

  return (
    <>
      {isModal && (
        <ModalCarouselView
          indexImage={0}
          galleries={[dataGallery]}
          handleClose={handleCloseModal}
        />
      )}
      <AlertModal
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        onConfrim={onConfirm}
        loading={loading}
      />
      <div className="flex items-center justify-start">
        <div
          onClick={() => setIsModal(true)}
          className="group cursor-pointer rounded-full p-1.5 transition-all hover:bg-secondary/50"
        >
          <Eye size={18} className="text-foreground" />
        </div>
        <Link
          href={`/admin/my-gallery/${dataGallery.id}/edit`}
          className="group cursor-pointer rounded-full p-1.5 transition-all hover:bg-secondary/50"
        >
          <Edit size={18} className="text-primary" />
        </Link>
        <div
          onClick={() => setOpenAlert(true)}
          className="group cursor-pointer rounded-full p-1.5 transition-all hover:bg-secondary/50"
        >
          <Trash2 size={18} className="text-destructive" />
        </div>
      </div>
    </>
  );
};

export default ActionDropdown;
