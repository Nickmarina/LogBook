import UU5 from "uu5g04";
import { createVisualComponent, useState, useEffect } from "uu5g04-hooks";
import Config from "../config/config";
import Calls from "../../../calls";
import Lsi from "./entry-update-form-lsi";

const STATICS = {
  displayName: Config.TAG + "EntryUpdateForm",
  nestingLevel: "bigBoxCollection",
};

const EntryUpdateForm = createVisualComponent({
  ...STATICS,
  propTypes: {
    data: UU5.PropTypes.object,
    closeModal: UU5.PropTypes.func,
  },

  defaultProps: {},

  render(props) {
    const { data, closeModal } = props;
    const [isLoading] = useState(false);
    const [listOfPlaces, setListOfPlaces] = useState([]);
    const [listOfRegsNums, setListOfRegsNums] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await Calls.placeList();
        await setListOfPlaces(result?.itemList);
        const aircraft = await Calls.aircraftList();
        setListOfRegsNums(aircraft.itemList);
      };
      fetchData();
    }, []);

    async function handleUpdate(formData) {
      const { values, component } = formData;
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

    return (
      <UU5.Forms.ContextForm
        onSave={handleUpdate}
        onCancel={closeModal}
        progressIndicator={<UU5.Bricks.Loading />}
        disabled={isLoading}
      >
        <UU5.Forms.Datetimepicker
          label="departureDate"
          value={data.data?.departureDate}
          placeholderTime="12:30"
          size="m"
          name="departureDate"
          valueType="iso"
          required
        />
        <UU5.Forms.Select
          name="departurePlace"
          label="departurePlace"
          size="m"
          value={data.data?.departurePlace}
          required
        >
          {listOfPlaces?.map((place) => (
            <UU5.Forms.Select.Option key={place?.id} value={place.codeOfPlace} />
          ))}
        </UU5.Forms.Select>

        <UU5.Forms.Datetimepicker
          label="arrivalDate"
          placeholder="1/1/2022"
          arrivalTime="12:30"
          size="m"
          name="arrivalDate"
          valueType="iso"
          value={data.data?.arrivalDate}
          required
        />
        <UU5.Forms.Select name="arrivalPlace" label="arrivalPlace" size="m" value={data.data?.arrivalPlace} required>
          {listOfPlaces?.map((place) => (
            <UU5.Forms.Select.Option key={place?.id} value={place.codeOfPlace} />
          ))}
        </UU5.Forms.Select>
        <UU5.Forms.Select name="regNum" label="regNum" size="m" value={data.data.regNum} required>
          {listOfRegsNums?.map((aircraft) => (
            <UU5.Forms.Select.Option key={aircraft?.id} value={aircraft?.regNum} />
          ))}
        </UU5.Forms.Select>
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

export { EntryUpdateForm, EntryUpdateHeader, EntryUpdateControls };
export default EntryUpdateForm;
