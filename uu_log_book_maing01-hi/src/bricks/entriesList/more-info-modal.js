import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useEffect } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "./config/config";
import Calls from "../../calls";

const STATICS = {
  displayName: Config.TAG + "More info",
};

export const MoreInfoModal = createVisualComponent({
  ...STATICS,

  render(props) {
    const { data } = props;
    const [aircraft, setAircraft] = useState({});
    const [pilot, setPilot] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        const plane = await Calls.aircraftGet({ regNum: data.regNum });
        setAircraft(plane);
        const person = await Calls.personalPilotCardGet({ id: data.coPilotIdentity });
        setPilot(person);
      };
      fetchData();
    }, [data]);

    return (
      <UU5.Bricks.Div>
        <UU5.Bricks.Text>
          Depature date:
          <UU5.Bricks.DateTime value={data?.departureDate} />
        </UU5.Bricks.Text>
        <UU5.Bricks.Text> Depature place: {data?.departurePlace}</UU5.Bricks.Text>
        <UU5.Bricks.Text>
          Arrival date:
          <UU5.Bricks.DateTime value={data?.arrivalDate} />
        </UU5.Bricks.Text>
        <UU5.Bricks.Text>Arrival place: {data?.arrivalPlace}</UU5.Bricks.Text>
        <UU5.Bricks.Text> Reg num: {data?.regNum}</UU5.Bricks.Text>
        <UU5.Bricks.Text> Aircraft model: {aircraft?.model}</UU5.Bricks.Text>
        <UU5.Bricks.Text> Pilot: {pilot?.name}</UU5.Bricks.Text>
        <UU5.Bricks.Text> State: {data?.entryState}</UU5.Bricks.Text>
      </UU5.Bricks.Div>
    );
  },
});

export default MoreInfoModal;
