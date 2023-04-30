import { useMemo } from "react";
import { useSortingStore } from "../stores/sorting-store";

export default () => {
  const amount = useSortingStore(store => store.amount);
  return useMemo(() => Array.from({ length: amount }, () => ~~(Math.random() * 101)), [amount]);
};
