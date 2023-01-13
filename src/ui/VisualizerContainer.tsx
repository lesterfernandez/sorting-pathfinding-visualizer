interface Props {
  children: React.ReactNode;
}

export const VisualizerContainer = ({ children }: Props) => (
  <div className="rounded-x-xl flex-1 overflow-hidden rounded-b-xl border-4 border-amber-100 sm:rounded-t-xl">
    {children}
  </div>
);
