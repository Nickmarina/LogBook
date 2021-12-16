import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Calls from "../../calls";
import Config from "../config/config.js";
import AircraftsContext from "./context/aircrafts-context";

const STATICS = {
  displayName: Config.TAG + "AircraftsLoader",
};

export const AircraftsLoader = createComponent({
  ...STATICS,

  render(props) {
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.aircraftList,
      },
      itemHandlerMap: {
        // update: Calls.listUpdate,
        // delete: Calls.listDelete,
      },
    });

    return <AircraftsContext.Provider value={dataListResult}>{props.children}</AircraftsContext.Provider>;
  },
});

export default AircraftsLoader;
