import React, { useState, useEffect } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import { tableIcons } from "./Icons";
import { Button, Grid } from "@material-ui/core";
import NewCustomerForm from "./NewCustomerForm";

const customerEndpoint = "https://customerrest.herokuapp.com/api/customers";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

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
        console.log(response.data.content);
        setCustomers(response.data.content);
      })
      .catch(error => console.log(error));
  };

  const addCustomer = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  const saveCustomer = customer => {
    console.log("saving new customer...");
    console.log(customer);
    Axios.post(customerEndpoint, customer)
      .then(() => {
        updateList();
      })
      .catch(error => {
        console.log("Failed to post item", error);
      });
  };

  const editCustomer = customer => {
    // Coming Soon...
    console.log("editing customer...");
    console.log(`using link`);
    console.log(customer.links[0].href);
    console.log("replacing with:");
    console.log(customer);
    Axios.put(customer.links[0].href, customer)
      .then(() => {
        updateList();
      })
      .catch(error => {
        console.log("Error updating customer", error);
      });
  };

  const deleteCustomer = customer => {
    // Coming Soon...
    console.log("deleting customer...");
    console.log(customer);
    Axios.delete(customer.links[0].href)
      .then(() => {
        updateList();
      })
      .catch(error => {
        console.log("Error deleting customer", error);
      });
  };

  return (
    <Grid container direction="column">
      <Grid item>
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
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addCustomer();
          }}
        >
          Add Customer
        </Button>
      </Grid>
      <NewCustomerForm
        open={formOpen}
        closeForm={closeForm}
        saveCustomer={saveCustomer}
      />
    </Grid>
  );
};

export default CustomerList;
