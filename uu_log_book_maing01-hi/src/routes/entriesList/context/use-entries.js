import { useContext } from "uu5g04-hooks";
import Context from "./entries-context";

export function useEntries() {
  return useContext(Context);
}

export default useEntries;
