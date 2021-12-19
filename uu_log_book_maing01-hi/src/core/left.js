//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";

import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:static
  displayName: Config.TAG + "Left",
  //@@viewOff:static
};

export const Left = createVisualComponent({
  ...STATICS,


  render(props) {
    const [pilotMenu, setPilotMenu] = useState(false);
    const [text, setText] = useState("It's the menu for operators");
    function handleChangeMenu() {
      if (pilotMenu === false) {
        setPilotMenu(true);
        setText("It's the menu for pilots");
        UU5.Environment.setRoute({
          url: { useCase: "entriesList", parameters: { pilotId: "61bc8752acaa882ed4acfdca" } },
        });
      } else {
        setPilotMenu(false);
        setText("It's the menu for operators");
        UU5.Environment.setRoute({
          url: { useCase: "entriesList" },
        });
      }
    }
    return (
      <Plus4U5.App.Left
        {...props}
        logoProps={{
          backgroundColor: UU5.Environment.colors.blue.c700,
          backgroundColorTo: UU5.Environment.colors.blue.c500,
          title: "uuLogBook",
          companyLogo: Plus4U5.Environment.basePath + "assets/img/unicorn-logo.svg",
          generation: "1",
        }}
        aboutItems={[{ content: <UU5.Bricks.Lsi lsi={Lsi.left.about} />, href: "about" }]}
        helpHref={null}
      >
        <UU5.Bricks.Button
          colorSchema="cyan"
          bgStyle="transparent"
          size="l"
          content={text}
          onClick={() => handleChangeMenu()}
        />
        {pilotMenu ? (
          <Plus4U5.App.MenuTree
            borderBottom
            items={[
              {
                id: "entriesList",
                href: `entriesList?pilotId=61bc8752acaa882ed4acfdca`,
                content: <UU5.Bricks.Lsi lsi={Lsi.left.entriesList} />,
              },
              {
                id: "aircrafts",
                href: `aircrafts?pilotId=61bc8752acaa882ed4acfdca`,
                content: <UU5.Bricks.Lsi lsi={Lsi.left.aircrafts} />,
              },
            ]}
          />
        ) : (
          <Plus4U5.App.MenuTree
            borderBottom
            items={[
              { id: "entriesList", href: "entriesList", content: <UU5.Bricks.Lsi lsi={Lsi.left.entriesList} /> },
              { id: "aircrafts", href: "aircrafts", content: <UU5.Bricks.Lsi lsi={Lsi.left.aircrafts} /> },
            ]}
          />
        )}
      </Plus4U5.App.Left>
    );
  },
});

export default Left;
