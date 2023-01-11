import { createContext } from "react";

type ConfigureModal = {
  Modal: React.ComponentType<{ toggleModal: () => void }>;
};

export const ConfigureModalContext = createContext({} as ConfigureModal);
