//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useEffect } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
// import CustomTile from "./custom-tile";
import { useContextModal } from "../../common/modal-manager";
import Config from "./config/config";
import Calls from "../../calls";
import EntriesList from "../entriesList/entriesList";
// import Lsi from "../config/lsi.js";

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AircraftCard",
  //@@viewOff:statics
};

const CLASS_NAMES = {};

export const AircraftCard = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const [aircraft, setAircraft] = useState({});
    const [data, setData] = useState([]);

    const [open, close, showAlert, getConfirmRef] = useContextModal();
    useEffect(() => {
      const fetchData = async () => {
        const result = await Calls.aircraftGet({ id: props.params.aircraftId });
        await setAircraft(result);
        const newData = await Calls.logBookEntryList({ regNum: result.regNum });
        await setData(newData);
      };
      fetchData();
    }, [props.params]);

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <UU5.Bricks.Card width={700} className="uu5-common-padding-s">
        <UU5.Bricks.Image
          src="https://e3.365dm.com/21/07/1600x900/skynews-boeing-737-plane_5435020.jpg?20210702173340"
          type="thumbnail"
          width={200}
        />
        <UU5.Bricks.Header content={aircraft.regNum} level="5" />
        <UU5.Bricks.Header content={aircraft.model} level="5" />
        <UU5.Bricks.Text content={aircraft.state} />
        {/* <EntriesList data={data?.itemList} /> */}
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

export default AircraftCard;
