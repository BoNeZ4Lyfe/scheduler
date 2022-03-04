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

export function getInterviewersForDay(state, day) {
  const interviewerDay = state.days.filter((days) => days.name === day)[0];
  if (!interviewerDay) {
    return [];
  }

  return interviewerDay.interviewers.map((id) => {
    return state.interviewers[id];
  });
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const interviewId = interview.interviewer;
  return {
    student: interview.student,
    interviewer: { ...state.interviewers[interviewId] },
  };
}
