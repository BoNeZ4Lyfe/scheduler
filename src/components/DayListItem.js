import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";


  export default function DayListItem(props) {
    const dayListClass = classNames(
      'day-list__item', 
      {'day-list__item--selected': props.spots === 0,
      'day-list__item--full': props.selected,
    });

    const formatSpots = () => {
      if(props.spots > 1) {
        return `${props.spots} spots remaining`;
      } else if (props.spots === 1) {
        return `1 spot remaining`;
      } else {
        return `no spots remaining`;
      }
    }
  
    return (
      <li onClick={() => props.setDay(props.name)} className={dayListClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>

    )
  };
  
  