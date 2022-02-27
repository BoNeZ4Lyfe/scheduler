export function getAppointmentsForDay(state, day) {
  let dayArr = [];
  state.days.filter((days) => {
    if (days.name === day) {
      dayArr = days.appointments.map((id) => state.appointments[id]);
    }
  });
  return dayArr;
}
 //ask mentor about tests/file problem