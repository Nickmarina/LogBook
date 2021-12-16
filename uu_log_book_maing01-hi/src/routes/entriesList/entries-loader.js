import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Calls from "../../calls";
import Config from "../config/config.js";
import EntriesContext from "./context/entries-context";

const STATICS = {
  displayName: Config.TAG + "EntriesLoader",
};

export const EntriesLoader = createComponent({
  ...STATICS,

  render(props) {
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.logBookEntryList,
        loadByPilt: Calls.logBookEntryListByPilot,
        create: Calls.logBookEntryCreate,
      },
      itemHandlerMap: {
        update: Calls.logBookEntryUpdate,
        delete: Calls.logBookEntryDelete,
        get: Calls.logBookEntryGet,
      },
    });

    return <EntriesContext.Provider value={dataListResult}>{props.children}</EntriesContext.Provider>;
  },
});

export default EntriesLoader;
