import React, { useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import CustomerList from "./CustomerList";
import TrainingList from "./TrainingList";

const AppMenu = () => {
  const [value, setValue] = useState("customerList");

  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="customerList" label="Customer List" />
          <Tab value="trainingList" label="Training List" />
        </Tabs>
      </AppBar>
      {value === "customerList" && <CustomerList />}
      {value === "trainingList" && <TrainingList />}
    </div>
  );
};

export default AppMenu;
