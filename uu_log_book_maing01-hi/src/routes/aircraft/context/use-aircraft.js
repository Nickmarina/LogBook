import { useContext } from "uu5g04-hooks";
import Context from "./aircraft-context";

export function useAircraft() {
  return useContext(Context);
}

export default useAircraft;
