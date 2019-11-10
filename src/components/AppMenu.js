import React, { useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import CustomerList from "./CustomerList";
import TrainingList from "./TrainingList";
import TrainingCalendar from "./TrainingCalendar";

const AppMenu = () => {
  const [value, setValue] = useState("customerList");
  const [currCustomer, setCurrCustomer] = useState(null);
  const [currTrainings, setCurrTrainings] = useState(null);

  const handleChange = (event, value) => {
    setValue(value);
  };

  const goToCustomerTrainings = customer => {
    setCurrCustomer(customer);
    setValue("trainingList");
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="customerList" label="Customer List" />
          <Tab value="trainingList" label="Training List" />
          <Tab value="calendar" label="Calendar" />
        </Tabs>
      </AppBar>
      {value === "customerList" && (
        <CustomerList goToCustomerTrainings={goToCustomerTrainings} />
      )}
      {value === "trainingList" && (
        <TrainingList
          setCurrTrainings={setCurrTrainings}
          customer={currCustomer}
        />
      )}
      {value === "calendar" && (
        <TrainingCalendar
          customer={currCustomer}
          currTrainings={currTrainings}
        />
      )}
    </div>
  );
};

export default AppMenu;
