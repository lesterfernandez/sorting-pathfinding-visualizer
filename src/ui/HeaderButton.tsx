import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function HeaderButton({ children }: Props) {
  return <button>{children}</button>;
}
