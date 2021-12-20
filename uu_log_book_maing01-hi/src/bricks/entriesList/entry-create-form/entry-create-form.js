import UU5 from "uu5g04";
import { createVisualComponent, useState, useEffect } from "uu5g04-hooks";
import Config from "../config/config";
import Calls from "../../../calls";
import Lsi from "./entry-create-form-lsi";

const STATICS = {
  displayName: Config.TAG + "EntryCreateForm",
  nestingLevel: "bigBoxCollection",
};

const EntryCreateForm = createVisualComponent({
  ...STATICS,

  propTypes: {},

  defaultProps: {},

  render(props) {
    const { closeModal, handlerMap, pilot } = props;
    const [isLoading] = useState(false);
    const [listOfPlaces, setListOfPlaces] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await Calls.placeList();
        await setListOfPlaces(result?.itemList);
      };
      fetchData();
    }, []);

    async function handleCreate(formData) {
      const { values, component } = formData;

      component.setPending();
      try {
        await handlerMap.create({ ...values, coPilotIdentity: pilot });
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveSuccess} />} />,
          colorSchema: "success",
        });

        closeModal();
      } catch {
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveError} />} />,
          colorSchema: "danger",
        });
      }
      component.setReady();
    }
    return (
      <UU5.Forms.ContextForm
        onSave={handleCreate}
        onCancel={closeModal}
        progressIndicator={<UU5.Bricks.Loading />}
        disabled={isLoading}
      >
        <UU5.Forms.DatePicker
          label="departureDate"
          valueType="iso"
          placeholder={UU5.Common.Tools.getDateString("1990-11-21", { country: "cs-cz" })}
          name="departureDate"
          size="m"
          required
        />
        <UU5.Forms.DatePicker
          label="arrivalDate"
          valueType="iso"
          name="arrivalDate"
          placeholder={UU5.Common.Tools.getDateString("1990-11-21", { country: "cs-cz" })}
          size="m"
          required
        />
        <UU5.Forms.Select name="departurePlace" required label="departurePlace" size="m">
          {listOfPlaces?.map((place) => (
            <UU5.Forms.Select.Option key={place?.id} value={place?.codeOfPlace} />
          ))}
        </UU5.Forms.Select>
        <UU5.Forms.Select name="arrivalPlace" required label="arrivalPlace" size="m">
          {listOfPlaces?.map((place) => (
            <UU5.Forms.Select.Option key={place?.id} value={place?.codeOfPlace} />
          ))}
        </UU5.Forms.Select>
        <UU5.Forms.Text required label="regNum" name="regNum" value="" />
      </UU5.Forms.ContextForm>
    );
  },
});

const EntryCreateHeader = () => {
  return (
    <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.header} />} info={<UU5.Bricks.Lsi lsi={Lsi.info} />} />
  );
};

const EntryCreateControls = () => {
  return (
    <UU5.Forms.ContextControls
      buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.submit("Create")} /> }}
      buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.cancel} /> }}
    />
  );
};

export { EntryCreateForm, EntryCreateHeader, EntryCreateControls };
export default EntryCreateForm;
