//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";

import Config from "./config/config";
import useAircrafts from "./context/use-aircrafts";
// import Lsi from "../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AircraftsList",
  //@@viewOff:statics
};

const CLASS_NAMES = {};

export const AircraftsList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const {data, handlerMap} = useAircrafts()
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div> Hello {JSON.stringify(data)}</div>
    );
    //@@viewOff:render
  },
});

export default AircraftsList;