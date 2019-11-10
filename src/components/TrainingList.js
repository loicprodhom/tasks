import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Axios from "axios";
import { tableIcons } from "./Icons";
import * as moment from "moment";
import { Typography, Grid } from "@material-ui/core";

const trainingEndpoint = "https://customerrest.herokuapp.com/api/trainings";

const TrainingList = props => {
  const [trainings, setTrainings] = useState([]);

  const updateList = () => {
    let newData = [];
    Axios.get(trainingEndpoint)
      .then(response => {
        response.data.content.forEach(element => {
          Axios.get(element.links[2].href)
            .then(responseCustomer => {
              if (
                props.customer !== null &&
                props.customer.links[0].href ===
                  responseCustomer.data.links[0].href
              ) {
                newData.push({
                  ...element,
                  customer: responseCustomer.data,
                  date: moment(element.date).format()
                });
                setTrainings([...newData]);
                props.setCurrTrainings([...newData]);
              }
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

  const addTraining = training => {
    training.customer = props.customer.links[0].href;
    training.date = moment(training.date).format();
    Axios.post(trainingEndpoint, training)
      .then(() => {
        updateList();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteTraining = training => {
    Axios.delete(training.links[0].href)
      .then(() => {
        updateList();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const headers = [
    { title: "Activity", field: "activity" },
    {
      title: "Date",
      field: "date",
      type: "date"
    },
    { title: "Duration", field: "duration" }
  ];

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h4">
          {props.customer !== null
            ? `Trainings scheduled for customer ${props.customer.firstname} ${props.customer.lastname}`
            : "No customer selected"}
        </Typography>
      </Grid>
      <Grid item>
        {props.customer === null ? null : (
          <MaterialTable
            title="Training List"
            icons={tableIcons}
            columns={headers}
            data={trainings}
            editable={
              props.customer === null
                ? {}
                : {
                    onRowAdd: newData =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          resolve();
                          addTraining(newData);
                        }, 600);
                      }),
                    onRowDelete: oldData =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          resolve();
                          deleteTraining(oldData);
                        }, 600);
                      })
                  }
            }
          />
        )}
      </Grid>
    </Grid>
  );
};

export default TrainingList;
