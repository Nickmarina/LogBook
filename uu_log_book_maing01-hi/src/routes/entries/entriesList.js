//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";

import Config from "../config/config";
import { useContextModal } from "../../common/modal-manager";
import useEntries from "../../bricks/entriesList/context/use-entries";
import CustomTile from "../../bricks/entriesList/custom-tile";
import {
  EntryCreateControls,
  EntryCreateHeader,
  EntryCreateForm,
} from "../../bricks/entriesList/entry-create-form/entry-create-form";

// import Lsi from "../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "EntiriesList",
  //@@viewOff:statics
};

const CLASS_NAMES = {};

export const EntriesList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const { pilot } = props;
    const { data, handlerMap } = useEntries();
    const [open, close, showAlert, getConfirmRef] = useContextModal();


    //@@viewOn:private
    //@@viewOff:private
   
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    function handleCreate() {
      open({
        header: <EntryCreateHeader />,
        content: <EntryCreateForm handlerMap={handlerMap} closeModal={close} />,
        footer: <EntryCreateControls isCreateForm={true} />,
      });
    }
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    return currentNestingLevel ? (
      <Uu5Tiles.ControllerProvider data={data || data.itemList}>
        <Uu5Tiles.AddButton onClick={handleCreate}>Add new entry</Uu5Tiles.AddButton>
        <Uu5Tiles.Grid tileMinWidth={700} tileMaxWidth={1100} tileSpacing={8} rowSpacing={8}>
          <CustomTile closeModal={close} open={open} handlerMap={handlerMap} />
        </Uu5Tiles.Grid>
      </Uu5Tiles.ControllerProvider>
    ) : null;
    // }
  },
});

export default EntriesList;