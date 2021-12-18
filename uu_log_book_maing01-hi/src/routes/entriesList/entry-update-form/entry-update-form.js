//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useEffect } from "uu5g04-hooks";
import Config from "../config/config";
import Calls from "../../../calls";
import Lsi from "./entry-update-form-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "EntryUpdateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

const EntryUpdateForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { data, closeModal } = props;
    const [isLoading] = useState(false);
    const [listOfPlaces, setListOfPlaces] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await Calls.placeList();
        await setListOfPlaces(result?.itemList);
      };
      fetchData();
    }, []);

    async function handleUpdate(formData) {
      const { values, component } = formData;
      console.log(values.departureDate)
      const newObject = { id: data?.data.id, ...values };

      component.setPending();
      try {
        await data.handlerMap.update(newObject);
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
    const className = Config.Css.css``;

    return (
      <UU5.Forms.ContextForm
        onSave={handleUpdate}
        onCancel={closeModal}
        progressIndicator={<UU5.Bricks.Loading />}
        disabled={isLoading}
      >
        <UU5.Forms.DatePicker
          label="departureDate"
          name="departureDate"
          valueType="iso"
          value={data.data?.departureDate}
          size="m"
          required
        />
        <UU5.Forms.DatePicker
          label="arrivalDate"
          name="arrivalDate"
          value={data.data?.arrivalDate}
          valueType="iso"
          size="m"
          required
        />
        <UU5.Forms.Select name="departurePlace" label="departurePlace" size="m" value={data.data?.departurePlace} required>
          {listOfPlaces?.map((place) => (
            <UU5.Forms.Select.Option key={place?.id} value={place?.codeOfPlace} />
          ))}
        </UU5.Forms.Select>
        <UU5.Forms.Select name="arrivalPlace" label="arrivalPlace" size="m" value={data.data?.arrivalPlace} required>
          {listOfPlaces?.map((place) => (
            <UU5.Forms.Select.Option key={place?.id} value={place?.codeOfPlace} />
          ))}
        </UU5.Forms.Select>
        <UU5.Forms.Text label="regNum" name="regNum" value={data.data?.regNum} required/>
        <UU5.Forms.Text
          label="entryState"
          name="entryState"
          value={data.data?.entryState}
          placeholder={"APPROVED or DISAPPROVED or IN_PROGRESS"}
          required
        />
      </UU5.Forms.ContextForm>
    );
  },
});

//viewOn:helpers
const EntryUpdateHeader = () => {
  return (
    <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.header} />} info={<UU5.Bricks.Lsi lsi={Lsi.info} />} />
  );
};

const EntryUpdateControls = () => {
  return (
    <UU5.Forms.ContextControls
      buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.submit("Update")} /> }}
      buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.cancel} /> }}
    />
  );
};
//viewOff:helpers

//viewOn:exports
export { EntryUpdateForm, EntryUpdateHeader, EntryUpdateControls };
export default EntryUpdateForm;
//viewOff:exports
