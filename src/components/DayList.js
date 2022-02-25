import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  const days = props.days;
  const listItems = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });
  return <ul>{listItems}</ul>;
};

export default DayList;
