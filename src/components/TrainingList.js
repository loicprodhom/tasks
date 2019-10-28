import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Axios from "axios";
import { tableIcons } from "./Icons";
import * as moment from "moment";
import { Button, Grid } from "@material-ui/core";

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);

  const updateList = () => {
    let newData = [];
    Axios.get("https://customerrest.herokuapp.com/api/trainings")
      .then(response => {
        console.log(response.data.content);

        response.data.content.forEach(element => {
          Axios.get(element.links[2].href)
            .then(responseCustomer => {
              newData.push({
                ...element,
                customer: responseCustomer.data,
                date: moment(element.date).format("MMMM Do YYYY, hh:mm")
              });
              setTrainings([...newData]);
            })
            .catch(error => {
              console.log(error);
            });
        });
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    updateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTraining = () => {
    //Coming Soon...
    updateList();
  };

  const editTraining = () => {
    //Coming Soon...
  };

  const removeTraining = () => {
    //Coming Soon...
  };

  const headers = [
    { title: "Activity", field: "activity" },
    { title: "Date", field: "date" },
    { title: "Duration", field: "duration" },
    {
      title: "Customer",
      field: "customer",
      render: rowData => {
        return (
          <div>
            {rowData.customer.firstname} {rowData.customer.lastname}
          </div>
        );
      }
    },
    {
      title: "Actions",
      render: rowData => (
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                editTraining();
              }}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                removeTraining();
              }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      )
    }
  ];

  return (
    <Grid container direction="column">
      <Grid item>
        <MaterialTable
          title="Training List"
          icons={tableIcons}
          columns={headers}
          data={trainings}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addTraining();
          }}
        >
          Add Training
        </Button>
      </Grid>
    </Grid>
  );
};

export default TrainingList;
