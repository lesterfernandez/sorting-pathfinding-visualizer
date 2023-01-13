interface Props {
  onSubmit: () => void;
}

export function ConfigureModalFooter({ onSubmit }: Props) {
  return (
    <div className="flex h-14 w-full items-center border-t-2 px-4">
      <button
        type="button"
        className="my-2 ml-auto select-none rounded-md bg-blue-200 p-2 px-4 hover:bg-blue-300"
        onClick={() => void onSubmit()}
      >
        Ok
      </button>
    </div>
  );
}
