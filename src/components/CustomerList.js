import React, { useState, useEffect, forwardRef } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from "@material-ui/icons";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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
    console.log("adding new customer...");
    console.log(customer);
  };

  const editCustomer = customer => {
    console.log("editing customer...");
    console.log(customer);
  };

  const deleteCustomer = customer => {
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
