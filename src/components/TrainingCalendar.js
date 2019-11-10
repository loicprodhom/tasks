import React from "react";
import FullCalendar from "@fullcalendar/react";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment";
import { Typography, Grid } from "@material-ui/core";

const TrainingCalendar = props => {
  const events = [];
  if (props.currTrainings !== null) {
    props.currTrainings.forEach(element => {
      events.push({
        ...element,
        start: moment(element.date).format(),
        end: moment(element.date)
          .add(element.duration, "minutes")
          .format(),
        title: `${element.activity} (from ${moment(element.date).format(
          "LT"
        )} to ${moment(element.date)
          .add(element.duration, "minutes")
          .format("LT")})`
      });
    });
  }

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
        {props.customer !== null ? (
          <FullCalendar
            displayEventTime={false}
            events={events}
            plugins={[dayGridPlugin]}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default TrainingCalendar;
