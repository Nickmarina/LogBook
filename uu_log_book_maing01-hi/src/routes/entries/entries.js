//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";

import Config from "../config/config";
import EntriesLoader from "../../bricks/entriesList/entries-loader";
import EntriesContext from "../../bricks/entriesList/context/entries-context";
import DataListStateResolver from "../../common/data-list-state-resolver";
import EntriesList from "./entriesList"
// import Lsi from "../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Entries",
  //@@viewOff:statics
};

const CLASS_NAMES = {};

export const Entries = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

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
    //@@viewOff:render
  },
});

export default Entries;
