import UU5 from "uu5g04";
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import { EntryUpdateControls, EntryUpdateForm, EntryUpdateHeader } from "./entry-update-form/entry-update-form";
import MoreInfoModal from "./more-info-modal";

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
    const modalRef = useRef();
    const { data: entry, closeModal, open, pilot } = props;

    function handleUpdate(data) {
      console.log(entry);
      console.log(pilot);
      data.data.coPilotIdentity === pilot
        ? open({
            header: <EntryUpdateHeader />,
            content: <EntryUpdateForm data={data} closeModal={closeModal} />,
            footer: <EntryUpdateControls />,
          })
        : alert("You cannot change this flight");
    }

    function handleOpenMoreInfoModal(data) {
      modalRef.current.open({
        header: data.regNum,
        content: <MoreInfoModal data={data} />,
        footer: (
          <UU5.Bricks.Button content="Close" onClick={modalRef.current.close} colorSchema="cyan" bgStyle="outline" />
        ),
      });
    }

    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Bricks.Div>
          <UU5.Bricks.Card className="uu5-common-padding-m">
            <UU5.Bricks.Icon icon="uubml-airplane" />
            <UU5.Bricks.Header content="Depature information" level="5" />
            <UU5.Bricks.Text>
              Depature date:
              <UU5.Bricks.DateTime value={entry?.data?.departureDate} />
            </UU5.Bricks.Text>
            <UU5.Bricks.Text> Depature place: {entry?.data?.departurePlace}</UU5.Bricks.Text>
            <UU5.Bricks.Header content="Arrival information" level="5" />
            <UU5.Bricks.Text>
              Arrival date:
              <UU5.Bricks.DateTime value={entry?.data?.arrivalDate} />
            </UU5.Bricks.Text>
            <UU5.Bricks.Text>Arrival place: {entry?.data?.arrivalPlace}</UU5.Bricks.Text>
            <UU5.Bricks.Button colorSchema="cyan" bgStyle="outline" onClick={() => handleOpenMoreInfoModal(entry.data)}>
              <UU5.Bricks.Icon icon="plus4u-visible" />
            </UU5.Bricks.Button>
            {pilot ? (
              <UU5.Bricks.Button colorSchema="cyan" bgStyle="outline" onClick={() => handleUpdate(entry)}>
                <UU5.Bricks.Icon icon="plus4u5-pencil" />
              </UU5.Bricks.Button>
            ) : null}
          </UU5.Bricks.Card>
          <UU5.Bricks.Modal ref_={modalRef} />
        </UU5.Bricks.Div>
      </div>
    ) : null;
  },
});

export default CustomTile;
