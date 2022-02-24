import React from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss";

const InterviewerListItem = (props) => {
  const interviewerClass = classNames("interviewers_item", {
    "interviewers_item--selected": props.selected
  });
  return (
    <li onClick={() => props.setInterviewer(props.id)} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};
export default InterviewerListItem;


//ask mentor about unselected state in storybook