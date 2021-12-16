import { useContext } from "uu5g04-hooks";
import Context from "./aircrafts-context";

export function useAircrafts() {
  return useContext(Context);
}

export default useAircrafts;
