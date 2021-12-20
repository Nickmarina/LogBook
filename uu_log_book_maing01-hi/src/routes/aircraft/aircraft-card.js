import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useEffect } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import "uu_plus4u5g01-bricks";
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
import {
  AircraftStateUpdateControls,
  AircraftStateUpdateHeader,
  AircraftStateUpdateForm,
} from "./aircraft-state-update-form/aircraft-state-update-form";

const STATICS = {
  displayName: Config.TAG + "AircraftCard",
};

export const AircraftCard = createVisualComponent({
  ...STATICS,

  render(props) {
    const { params } = props;
    const { data, handlerMap } = useEntries();
    const [aircraft, setAircraft] = useState({});
    const [aircraftStatus, setAircraftStatus] = useState(aircraft?.state);

    const [open, close] = useContextModal();
    useEffect(() => {
      const fetchData = async () => {
        const result = await Calls.aircraftGet({ id: props.params.aircraftId });
        await handlerMap.load({ regNum: result.regNum });
        await setAircraft(result);
        await setAircraftStatus(result.state);
      };

      fetchData();
    }, [params?.aircraftId]);

    function handleCreate() {
      open({
        header: <EntryCreateHeader />,
        content: <EntryCreateForm handlerMap={handlerMap} closeModal={close} />,
        footer: <EntryCreateControls />,
      });
    }

    function handleSetState(plain) {
      open({
        header: <AircraftStateUpdateHeader />,
        content: (
          <AircraftStateUpdateForm
            data={plain}
            currentState={aircraftStatus}
            closeModal={close}
            setAircraftStatus={setAircraftStatus}
          />
        ),
        footer: <AircraftStateUpdateControls />,
      });
    }
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
          <UU5.Bricks.Text>
            Status: {aircraftStatus}
            {!params.pilotId ? (
              <UU5.Bricks.Button onClick={() => handleSetState(aircraft)}>
                <UU5.Bricks.Icon icon="plus4u5-pencil" />
              </UU5.Bricks.Button>
            ) : null}
          </UU5.Bricks.Text>
          {aircraft.state !== "closed" ? (
            <div>
              {params.pilotId ? <Uu5Tiles.AddButton onClick={handleCreate}>Add new entry</Uu5Tiles.AddButton> : null}
              <Uu5Tiles.Grid tileMinWidth={500} tileMaxWidth={700} tileSpacing={8} rowSpacing={8}>
                <CustomTile closeModal={close} open={open} handlerMap={handlerMap} pilot={params.pilotId} />
              </Uu5Tiles.Grid>
            </div>
          ) : null}
        </UU5.Bricks.Card>
      </Uu5Tiles.ControllerProvider>
    ) : null;
  },
});

export default AircraftCard;
