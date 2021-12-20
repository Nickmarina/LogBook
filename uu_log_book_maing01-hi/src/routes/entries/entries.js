import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "../config/config";
import EntriesLoader from "../../bricks/entriesList/entries-loader";
import EntriesContext from "../../bricks/entriesList/context/entries-context";
import DataListStateResolver from "../../common/data-list-state-resolver";
import EntriesList from "./entriesList";

const STATICS = {
  displayName: Config.TAG + "Entries",
};

export const Entries = createVisualComponent({
  ...STATICS,

  render(props) {
    return (
      <EntriesLoader>
        <EntriesContext.Consumer>
          {(dataListResult) => {
            return (
              <DataListStateResolver dataList={dataListResult}>
                <EntriesList pilot={props?.params?.pilotId}/>
              </DataListStateResolver>
            );
          }}
        </EntriesContext.Consumer>
      </EntriesLoader>
    )
  },
});

export default Entries;
