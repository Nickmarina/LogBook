import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import { EntryUpdateControls, EntryUpdateForm, EntryUpdateHeader } from "./entry-update-form/entry-update-form";

const STATICS = {
  displayName: Config.TAG + "CustomTile",
  nestingLevel: "bigBoxCollection",
};

export const CustomTile = createVisualComponent({
  ...STATICS,

  propTypes: {
    data: UU5.PropTypes.object,
  },

  render(props) {
    const { data: entry, closeModal, open, handlerMap } = props;
    console.log(handlerMap);

    function handleUpdate(data) {
      open({
        header: <EntryUpdateHeader />,
        content: <EntryUpdateForm data={data} closeModal={closeModal} />,
        footer: <EntryUpdateControls />,
      });
    }

    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Bricks.Div>
          <UU5.Bricks.Card width={300} className="uu5-common-padding-s">
            <UU5.Bricks.Text>
              Depature date:
              <UU5.Bricks.DateTime value={entry?.data?.departureDate || entry.departureDate} />
            </UU5.Bricks.Text>
            <UU5.Bricks.Text>
              Arrival date:
              <UU5.Bricks.DateTime value={entry?.data?.arrivalDate || entry.arrivalDate} />
            </UU5.Bricks.Text>
            <UU5.Bricks.Text> Depature place: {entry?.data?.departurePlace || entry.departurePlace}</UU5.Bricks.Text>
            <UU5.Bricks.Text>Arrival place: {entry?.data?.arrivalPlace || entry.arrivalPlace}</UU5.Bricks.Text>
            <UU5.Bricks.Text> Reg num:{entry?.data?.regNum || entry.regNum}</UU5.Bricks.Text>
            <UU5.Bricks.Button colorSchema="cyan" bgStyle="outline" onClick={() => handleUpdate(entry?.data || entry)}>
              <UU5.Bricks.Icon icon="plus4u5-pencil" />
            </UU5.Bricks.Button>
          </UU5.Bricks.Card>
        </UU5.Bricks.Div>
      </div>
    ) : null;
  },
});

export default CustomTile;
