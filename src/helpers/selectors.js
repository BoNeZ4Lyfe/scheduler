export function getAppointmentsForDay(state, day) {
  const appointmentDay = state.days.filter((days) => days.name === day);
  if (appointmentDay.length === 0) {
    return [];
  }

  const dayArr = appointmentDay[0].appointments.map(
    (id) => state.appointments[id]
  );
  console.log(" Appointment day", appointmentDay[0].appointments);
  return dayArr;
}
