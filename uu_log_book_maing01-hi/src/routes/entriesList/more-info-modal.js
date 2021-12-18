//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useEffect } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";

import Config from "./config/config";
import Calls from "../../calls";

// import Lsi from "../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Entries",
  //@@viewOff:statics
};

const CLASS_NAMES = {};

export const MoreInfoModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const { data } = props;
    const [aircraft, setAircraft] = useState({});
    const [pilot, setPilot] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        const plane = await Calls.aircraftGet({ "regNum": data.regNum });
        await setAircraft(plane);
        const person = await Calls.personalPilotCardGet({ "id": data.coPilotIdentity });
        await setPilot(person);
        console.log(data)
      };
      fetchData();
    }, [props.data]);

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <UU5.Bricks.Div>
        <UU5.Bricks.Text>
          Depature date:
          <UU5.Bricks.DateTime value={data.departureDate} />
        </UU5.Bricks.Text>
        <UU5.Bricks.Text> Depature place: {data.departurePlace}</UU5.Bricks.Text>
        <UU5.Bricks.Text>
          Arrival date:
          <UU5.Bricks.DateTime value={data.arrivalDate} />
        </UU5.Bricks.Text>
        <UU5.Bricks.Text>Arrival place: {data.arrivalPlace}</UU5.Bricks.Text>
        <UU5.Bricks.Text> Reg num: {data.regNum}</UU5.Bricks.Text>
        <UU5.Bricks.Text> Aircraft model: {aircraft?.model}</UU5.Bricks.Text>
        <UU5.Bricks.Text> Pilot: {pilot?.name}</UU5.Bricks.Text>
        <UU5.Bricks.Text> State: {data.entryState}</UU5.Bricks.Text>
      </UU5.Bricks.Div>
    );
    //@@viewOff:render
  },
});

export default MoreInfoModal;
