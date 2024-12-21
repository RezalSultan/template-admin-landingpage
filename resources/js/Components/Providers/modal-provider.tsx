import { useEffect, useState } from "react";
import LogoutModal from "../modals/LogoutModal";

const ModalLogoutProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LogoutModal />
    </>
  );
};

export default ModalLogoutProvider;
