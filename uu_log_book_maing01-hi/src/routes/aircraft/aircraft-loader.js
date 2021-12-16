import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Calls from "../../calls";
import Config from "../config/config.js";
import AircraftContext from "./context/aircraft-context";

const STATICS = {
  displayName: Config.TAG + "AircraftLoader",
};

export const AircraftLoader = createComponent({
  ...STATICS,

  render(props) {
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.aircraftList,
      },
      itemHandlerMap: {},
    });

    return <AircraftContext.Provider value={dataListResult}>{props.children}</AircraftContext.Provider>;
  },
});

export default AircraftLoader;
