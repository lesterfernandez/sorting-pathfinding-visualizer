import { createContext } from "react";

type ConfigureModal = React.ComponentType<{ toggleModal: () => void }>;

export const ConfigureModalContext = createContext({} as ConfigureModal);

interface ProviderProps {
  modal: ConfigureModal;
  children: React.ReactNode;
}

export function ConfigureModalProvider({ modal, children }: ProviderProps) {
  return <ConfigureModalContext.Provider value={modal}>{children}</ConfigureModalContext.Provider>;
}
