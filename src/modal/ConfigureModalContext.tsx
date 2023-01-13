import { ComponentType, createContext, ReactNode } from "react";

type ConfigureModal = {
  Modal: React.ComponentType<{ toggleModal: () => void }>;
};

export const ConfigureModalContext = createContext({} as ConfigureModal);

interface ProviderProps {
  modal: ComponentType<{ toggleModal: () => void }>;
  children: ReactNode;
}

export function ConfigureModalProvider({ modal, children }: ProviderProps) {
  return (
    <ConfigureModalContext.Provider value={{ Modal: modal }}>
      {children}
    </ConfigureModalContext.Provider>
  );
}
