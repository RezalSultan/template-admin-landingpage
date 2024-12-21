import { Button } from "@/Components/ui/button";

import { Edit, MoreHorizontal, Trash2, User as UserIcon } from "lucide-react";
import AlertModal from "@/Components/modals/AlertModal";
import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/Components/ui/separator";
import { User } from "@/types";
import { Inertia } from "@inertiajs/inertia";

type CellActionProps = {
  dataUser: User;
};

const ActionDropdown: React.FC<CellActionProps> = ({ dataUser }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    // fungsi nya
  };

  return (
    <>
      <AlertModal
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        onConfrim={onConfirm}
        loading={loading}
      />
      <div className="flex justify-start items-center gap-1">
        <div
          onClick={() => Inertia.visit(`/admin/blog/${dataUser.id}`)}
          className="cursor-pointer"
        >
          <UserIcon size={16} className="mr-2" />
        </div>
        <div
          onClick={() => Inertia.visit(`/admin/blog/edit/${dataUser.id}`)}
          className="cursor-pointer"
        >
          <Edit size={16} className="mr-2" />
        </div>
        <div onClick={() => setOpenAlert(true)} className="cursor-pointer">
          <Trash2 size={16} className="mr-2" />
        </div>
      </div>
    </>
  );
};

export default ActionDropdown;
