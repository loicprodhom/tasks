import React, { useState, useEffect } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import { tableIcons } from "./Icons";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  const headers = [
    { title: "Firstname", field: "firstname" },
    { title: "Lastname", field: "lastname" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    { title: "City", field: "city" },
    { title: "Post Code", field: "postcode" },
    { title: "Street Address", field: "streetaddress" }
  ];

  useEffect(() => {
    updateList();
  }, []);

  const updateList = () => {
    Axios.get("https://customerrest.herokuapp.com/api/customers")
      .then(response => {
        console.log(response.data.content);
        setCustomers(response.data.content);
      })
      .catch(error => console.log(error));
  };

  const addCustomer = customer => {
    // Coming Soon...
    console.log("adding new customer...");
    console.log(customer);
  };

  const editCustomer = customer => {
    // Coming Soon...
    console.log("editing customer...");
    console.log(customer);
  };

  const deleteCustomer = customer => {
    // Coming Soon...
    console.log("deleting customer...");
    console.log(customer);
  };

  return (
    <MaterialTable
      title="Customer List"
      columns={headers}
      data={customers}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              addCustomer(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              editCustomer(newData);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              deleteCustomer(oldData);
            }, 600);
          })
      }}
      icons={tableIcons}
    />
  );
};

export default CustomerList;
