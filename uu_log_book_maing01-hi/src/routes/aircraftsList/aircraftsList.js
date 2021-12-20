import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import "uu_plus4u5g01-bricks";
import CustomTile from "./custom-tile";

import Config from "./config/config";
import useAircrafts from "./context/use-aircrafts";

const STATICS = {
  displayName: Config.TAG + "AircraftsList",
};

export const AircraftsList = createVisualComponent({
  ...STATICS,

  render(props) {
    const { data } = useAircrafts();

    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <Uu5Tiles.ControllerProvider data={data}>
        <Uu5Tiles.Grid tileMinWidth={200} tileMaxWidth={400} tileSpacing={8} rowSpacing={8}>
          <CustomTile pilot={props.pilot}/>
        </Uu5Tiles.Grid>
      </Uu5Tiles.ControllerProvider>
    ) : null;
  },
});

export default AircraftsList;
