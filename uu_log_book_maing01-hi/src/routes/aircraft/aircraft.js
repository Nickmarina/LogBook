//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import useAircrafts from "../aircraftsList/context/use-aircrafts";
import AircraftCard from "./aircraft-card";

import Config from "./config/config";
// import Lsi from "../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Aircraft",
  //@@viewOff:statics
};

const CLASS_NAMES = {};

export const Aircraft = createVisualComponent({

  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    // const {data, handlerMap} = useAircrafts()
    // console.log(handlerMap)
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <AircraftCard params={props.params} />
    );
    //@@viewOff:render
  },
});

export default Aircraft;
