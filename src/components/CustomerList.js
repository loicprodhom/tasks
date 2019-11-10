import React, { useState, useEffect } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import { tableIcons } from "./Icons";

const customerEndpoint = "https://customerrest.herokuapp.com/api/customers";

const CustomerList = props => {
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
    Axios.get(customerEndpoint)
      .then(response => {
        setCustomers(response.data.content);
      })
      .catch(error => console.log(error));
  };

  const addCustomer = customer => {
    Axios.post(customerEndpoint, customer)
      .then(() => {
        updateList();
      })
      .catch(error => {
        console.log("Failed to post item", error);
      });
  };

  const editCustomer = customer => {
    Axios.put(customer.links[0].href, customer)
      .then(() => {
        updateList();
      })
      .catch(error => {
        console.log("Error updating customer", error);
      });
  };

  const deleteCustomer = customer => {
    Axios.delete(customer.links[0].href)
      .then(() => {
        updateList();
      })
      .catch(error => {
        console.log("Error deleting customer", error);
      });
  };

  return (
    <MaterialTable
      title="Customer List"
      columns={headers}
      data={customers}
      onRowClick={(event, rowData) => {
        props.goToCustomerTrainings(rowData);
      }}
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
