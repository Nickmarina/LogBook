import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "./config/config";
import AircraftsLoader from "./aircrafts-loader";
import AircraftsContext from "./context/aircrafts-context";
import DataListStateResolver from "../../common/data-list-state-resolver";
import AircraftsList from "./aircraftsList";

const STATICS = {
  displayName: Config.TAG + "Aircrafts",
};


export const Aircrafts = createVisualComponent({
  ...STATICS,


  render(props) {

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
  },
});

export default Aircrafts;
