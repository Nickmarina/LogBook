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
import useEntries from "../../bricks/entriesList/context/use-entries";
import CustomTile from "../../bricks/entriesList/custom-tile";
import {
  EntryCreateControls,
  EntryCreateHeader,
  EntryCreateForm,
} from "../../bricks/entriesList/entry-create-form/entry-create-form";
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
    const { data, handlerMap } = useEntries();
    const [aircraft, setAircraft] = useState({});
    const [img, setImg] = useState("");

    const [open, close, showAlert, getConfirmRef] = useContextModal();
    useEffect(() => {
      const fetchData = async () => {
        const result = await Calls.aircraftGet({ id: props.params.aircraftId });
        await handlerMap.load({ regNum: result.regNum });
        await setAircraft(result);
        // const newImg = await Calls.aircraftGetImageData({ image: result.image });
      };

      fetchData();
    }, [props?.params?.aircraftId]);

    //@@viewOn:private
    //@@viewOff:private
    function handleCreate() {
      open({
        header: <EntryCreateHeader />,
        content: <EntryCreateForm handlerMap={handlerMap} closeModal={close} />,
        footer: <EntryCreateControls isCreateForm={true} />,
      });
    }
    //@@viewOn:interface
    //@@viewOff:interface
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    //@@viewOn:render
    return currentNestingLevel ? (
      <Uu5Tiles.ControllerProvider data={data}>
        <UU5.Bricks.Card width={700} className="uu5-common-padding-s">
          <UU5.Bricks.Image
            src="https://e3.365dm.com/21/07/1600x900/skynews-boeing-737-plane_5435020.jpg?20210702173340"
            // src={img}
            authenticate
            type="thumbnail"
            width={200}
          />
          <UU5.Bricks.Header level="6" disabled>
            Registration number: {aircraft.regNum}
          </UU5.Bricks.Header>
          <UU5.Bricks.Header level="3" colorSchema="cyan">
            Model: {aircraft.model}
          </UU5.Bricks.Header>
          <UU5.Bricks.Text>Status: {aircraft.state}</UU5.Bricks.Text>
          <Uu5Tiles.AddButton onClick={handleCreate}>Add new entry</Uu5Tiles.AddButton>
          <Uu5Tiles.Grid tileMinWidth={500} tileMaxWidth={700} tileSpacing={8} rowSpacing={8}>
            <CustomTile closeModal={close} open={open} handlerMap={handlerMap} />
          </Uu5Tiles.Grid>
        </UU5.Bricks.Card>
      </Uu5Tiles.ControllerProvider>
    ) : null;
    //@@viewOff:render
  },
});

export default AircraftCard;
