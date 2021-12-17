import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";

const STATICS = {
  displayName: Config.TAG + "AircraftsCustomTile",
  nestingLevel: "bigBoxCollection",
};

export const CustomTile = createVisualComponent({
  ...STATICS,

  propTypes: {
    data: UU5.PropTypes.object,
  },

  render(props) {
    const { data: aircraft } = props;

    function handleOpenAircraft(data) {
      UU5.Environment.setRoute({
        url: { useCase: "aircraft", parameters: { aircraftId: data.id } },
      });
    }

    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Bricks.Link key={aircraft.data.id} onClick={() => handleOpenAircraft(aircraft.data)}>
          <UU5.Bricks.Card width={300} key={aircraft.data.id} className="uu5-common-padding-s">
            <UU5.Bricks.Text content={aircraft.data.model} />
            <UU5.Bricks.Text content={aircraft.data.regNum} />
          </UU5.Bricks.Card>
        </UU5.Bricks.Link>
      </div>
    ) : null;
  },
});

export default CustomTile;
