export function getAppointmentsForDay(state, day) {
  const appointmentDay = state.days.filter((days) => days.name === day);
  if (appointmentDay.length === 0) {
    return [];
  }

  const dayArr = appointmentDay[0].appointments.map(
    (id) => state.appointments[id]
  );
  return dayArr;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewResult = {};

  const id = interview.interviewer;
  interviewResult.student = interview.student;

  interviewResult.interviewer = {
    id: id,
    name: state.interviewers[id].name,
    avatar: state.interviewers[id].avatar,
  };
  return interviewResult;
}
