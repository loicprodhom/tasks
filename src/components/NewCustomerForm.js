import React, { useState } from "react";
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

const NewCustomerForm = props => {
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
    postcode: "",
    streetaddress: ""
  });

  const handleChange = event => {
    setCustomer({
      ...customer,
      [event.target.id]: event.target.value
    });
  };

  return (
    <Dialog open={props.open} onClose={props.closeForm}>
      <DialogTitle>Save Customer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form to save a new customer.
        </DialogContentText>
        {/*Firstname, Lastname, email, Phone, City, Postcode, Street address */}
        <TextField
          value={customer.firstname}
          onChange={handleChange}
          id="firstname"
          label="First name"
        />
        <TextField
          value={customer.lastname}
          onChange={handleChange}
          id="lastname"
          label="Last name"
        />
        <TextField
          value={customer.email}
          onChange={handleChange}
          id="email"
          label="Email"
        />
        <TextField
          value={customer.phone}
          onChange={handleChange}
          id="phone"
          label="Phone"
        />
        <TextField
          value={customer.city}
          onChange={handleChange}
          id="city"
          label="City"
        />
        <TextField
          value={customer.postcode}
          onChange={handleChange}
          id="postcode"
          label="Postcode"
        />
        <TextField
          value={customer.streetaddress}
          onChange={handleChange}
          id="streetaddress"
          label="Street Address"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.saveCustomer(customer);
            props.closeForm();
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            props.closeForm();
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCustomerForm;
