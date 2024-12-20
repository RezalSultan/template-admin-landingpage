import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useErrorNotifier = (
  toastMessage: string,
  errorMessage?: string
) => {
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    if (errorMessage) {
      setErrorCount((prev) => prev + 1);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(`${toastMessage}`, {
        description: `${errorMessage}`,
        position: "top-center",
      });
    }
  }, [errorCount]);

  const resetErrorCount = () => setErrorCount(0);

  return { errorCount, resetErrorCount };
};
