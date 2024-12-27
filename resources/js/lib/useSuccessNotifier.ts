import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useSuccessNotifier = (
  toastMessage: string,
  successMessage?: string,
) => {
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    if (successMessage) {
      setSuccessCount((prev) => prev + 1);
    }
  }, [successMessage]);

  useEffect(() => {
    if (successMessage) {
      toast.success(`${toastMessage}`, {
        description: `${successMessage}`,
        position: "top-center",
      });
    }
  }, [successCount]);

  const resetSuccessCount = () => setSuccessCount(0);

  return { successCount, resetSuccessCount };
};
