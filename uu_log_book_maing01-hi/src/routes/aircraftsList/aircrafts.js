//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";

import Config from "./config/config";
import AircraftsLoader from "./aircrafts-loader";
import AircraftsContext from "./context/aircrafts-context";
import DataListStateResolver from "../../common/data-list-state-resolver";
import AircraftsList from "./aircraftsList";
// import Lsi from "../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Aircrafts",
  //@@viewOff:statics
};

const CLASS_NAMES = {};

export const Aircrafts = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <AircraftsLoader>
        <AircraftsContext.Consumer>
          {(dataListResult) => {
            return (
              <DataListStateResolver dataList={dataListResult}>
                <AircraftsList />
              </DataListStateResolver>
            );
          }}
        </AircraftsContext.Consumer>
      </AircraftsLoader>
    );
    //@@viewOff:render
  },
});

export default Aircrafts;
