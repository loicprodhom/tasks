import React, { useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import CustomerList from "./CustomerList";
import TrainingList from "./TrainingList";

const AppMenu = () => {
  const [value, setValue] = useState("customerList");
  const [currCustomer, setCurrCustomer] = useState(null);

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
        </Tabs>
      </AppBar>
      {value === "customerList" && (
        <CustomerList goToCustomerTrainings={goToCustomerTrainings} />
      )}
      {value === "trainingList" && <TrainingList customer={currCustomer} />}
    </div>
  );
};

export default AppMenu;
