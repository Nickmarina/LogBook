import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import EntriesLoader from "../../bricks/entriesList/entries-loader";
import EntriesContext from "../../bricks/entriesList/context/entries-context";
import DataListStateResolver from "../../common/data-list-state-resolver";
import AircraftCard from "./aircraft-card";

import Config from "./config/config";

const STATICS = {
  displayName: Config.TAG + "Aircraft",
};


export const Aircraft = createVisualComponent({
  ...STATICS,


  render(props) {
    return (
      <EntriesLoader>
        <EntriesContext.Consumer>
          {(dataListResult) => {
            return (
              <DataListStateResolver dataList={dataListResult}>
                <AircraftCard params={props.params} />
              </DataListStateResolver>
            );
          }}
        </EntriesContext.Consumer>
      </EntriesLoader>
    );
  },
});

export default Aircraft;
