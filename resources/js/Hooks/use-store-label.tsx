import { create } from "zustand";

type NavbarStore = {
  labels: Record<string, { currentLabel: string; previousPathname?: string }>;
  setLabel: (
    pathname: string,
    currentLabel: string,
    previousPathname?: string,
  ) => void;
};

export const useStoreLabel = create<NavbarStore>((set) => ({
  labels: {},
  setLabel: (pathname, currentLabel, previousPathname) =>
    set((state) => ({
      labels: {
        ...state.labels,
        [pathname]: {
          currentLabel,
          ...(previousPathname && { previousPathname }), // Pathname sebelumnya opsional
        },
      },
    })),
}));
