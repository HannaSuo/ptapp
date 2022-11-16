import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import "react-big-calendar/lib/css/react-big-calendar.css";

export default function CalendarPage() {

  const localizer = momentLocalizer(moment)
  const [trainings, setTrainings] = useState([]);

  const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
  }

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => {
        if (response.ok)
          return response.json();
        else
          alert("Something went wrong!");
      })
      .then(data => setTrainings(data))
      .catch(err => console.error(err))
  }

  const events = trainings.map((training) =>
    training =
    {
      title: training.activity + '/ ' + training.customer.firstname + ' ' + training.customer.lastname,
      start: new Date(training.date),
      end: addMinutes(new Date(training.date), training.duration)
    }
  );

  return (
    <div>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        step={30}
        defaultView="week"
        events={events}
        allDayAccessor='allDay'
        titleAccessor='title'
        startAccessor='start'
        endAccessor='end'
        style={{ height: "90vh" }}
      />
    </div>

  )
}