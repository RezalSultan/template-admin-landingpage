import { Edit, Eye, Trash2 } from "lucide-react";
import AlertModal from "@/Components/modals/AlertModal";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useErrorNotifier } from "@/lib/useErrorNotifier";
import { DataFAQSchema } from "@/types/FAQType";
import { Link } from "@inertiajs/react";

type CellActionProps = {
  dataFAQ: DataFAQSchema;
  errorMessage?: string;
};

const ActionDropdown: React.FC<CellActionProps> = ({
  dataFAQ,
  errorMessage,
}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const { resetErrorCount } = useErrorNotifier("Gagal Hapus FAQ", errorMessage);

  const onConfirm = () => {
    Inertia.delete(route("faq.delete", { id: dataFAQ.id }), {
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
      <AlertModal
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        onConfrim={onConfirm}
        loading={loading}
      />
      <div className="flex items-center justify-start">
        <Link
          href={`/admin/my-faq/${dataFAQ.id}`}
          className="group cursor-pointer rounded-full p-1.5 transition-all hover:bg-secondary/50"
        >
          <Eye size={18} className="text-foreground" />
        </Link>
        <Link
          href={`/admin/my-faq/${dataFAQ.id}/edit`}
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
