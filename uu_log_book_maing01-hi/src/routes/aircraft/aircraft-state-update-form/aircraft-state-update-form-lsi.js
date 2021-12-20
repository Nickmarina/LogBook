const Lsi = {
    header: {
      en: "Update the entry",
    },
    info: {
      en:
        "<uu5string/>On this form you can change the status of the aircraft. For more information see <UU5.Bricks.Link href='%s' target='_blank' content='documentation'/>.",
    },
    submit: (param)=>{
        return{
            "en":`${param}`
        }
    },
    cancel: {
      en: "Cancel",
    },
    state: {
      en: "State",
    },
    description: {
      en: "Description",
    },
    saveError: {
      en: "Saving was failed. Please check the status field",
    },
    saveSuccess: {
      en: "Saved=)",
    },
    wrongDescLength: {
      en: "Value should be not longer then 5000 symbols.",
    },
  };
  
  //viewOn:exports
  export default Lsi;
  //viewOff:exports