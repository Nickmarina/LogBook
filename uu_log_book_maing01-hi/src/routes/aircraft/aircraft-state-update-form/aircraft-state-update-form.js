//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "../config/config";
import Calls from "../../../calls";
import Lsi from "./aircraft-state-update-form-lsi";

const STATICS = {
  displayName: Config.TAG + "AircraftUpdateForm",
  nestingLevel: "bigBoxCollection",
};

const AircraftStateUpdateForm = createVisualComponent({
  ...STATICS,
  propTypes: {
    data: UU5.PropTypes.object,
    closeModal: UU5.PropTypes.func,
  },

  defaultProps: {},

  render(props) {
    const { data, closeModal, setAircraftStatus, currentState } = props;
    const [isLoading] = useState(false);

    async function handleUpdate(formData) {
      const { values, component } = formData;

      component.setPending();
      try {
        await Calls.aircraftSetState({ id: data.id, ...values });
        setAircraftStatus(values.state);
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
        <UU5.Forms.Select name="state" label="Status of the plain" size="xl" value={currentState} required>
          <UU5.Forms.Select.Option value="active" />
          <UU5.Forms.Select.Option value="closed" />
          <UU5.Forms.Select.Option value="open" />
          <UU5.Forms.Select.Option value="tested" />
        </UU5.Forms.Select>
      </UU5.Forms.ContextForm>
    );
  },
});

const AircraftStateUpdateHeader = () => {
  return (
    <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.header} />} info={<UU5.Bricks.Lsi lsi={Lsi.info} />} />
  );
};

const AircraftStateUpdateControls = () => {
  return (
    <UU5.Forms.ContextControls
      buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.submit("Update status")} /> }}
      buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.cancel} /> }}
    />
  );
};

export { AircraftStateUpdateForm, AircraftStateUpdateHeader, AircraftStateUpdateControls };
export default AircraftStateUpdateForm;

