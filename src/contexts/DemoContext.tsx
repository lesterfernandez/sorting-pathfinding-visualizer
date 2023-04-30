import { ReactNode, createContext } from "react";

export const DemoContext = createContext({} as () => Promise<void>);

interface Props {
  children: ReactNode;
  visualize: () => Promise<void>;
}

export const DemoProvider = ({ children, visualize }: Props) => (
  <DemoContext.Provider value={visualize}>{children}</DemoContext.Provider>
);
