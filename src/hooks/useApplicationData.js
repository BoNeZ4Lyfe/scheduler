import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day: day }));

  // const getSpotsForDay = function (day, appointments) {
  //   let spot = 0;

  //   for (const id of day.appointments) {
  //     const appointment = appointments[id];
  //     if (!appointment.interview) {
  //       spot++;
  //     }
  //   }
  //   return spot;
  // };

  // const updateSpots = function (state, appointments, id) {
  //   const dayObj = state.days.find((day) => day.name === state.day);
  //   const spots = getSpotsForDay(dayObj, appointments);

  //   const day = { ...dayObj, spots };

  //   const newDays = state.days.map((theDay) =>
  //     theDay.name === state.day ? day : theDay
  //   );

  //   return newDays;
  // };

  const getSpotsForDay = function (state, appointments) {
    let spot = 0;

    const foundDay = state.days.filter(d => d.name === state.day)[0];

    foundDay.appointments.forEach(appointmentId => {
      const appointment = appointments[appointmentId] ;
      if(!appointment.interview) {
        spot++;
      }
    })
    return spot;
    }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = state.days.map(day => {
      if(day.name === state.day) {
        return {...day, spots: getSpotsForDay(state, appointments)}
      }
      else {
        return day;
      }
    })

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState({
        ...state,
        appointments,
         days,
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = state.days.map(day => {
      if(day.name === state.day) {
        return {...day, spots: getSpotsForDay(state, appointments)}
      }
      else {
        return day;
      }
    })

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments,
        days
      });
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
