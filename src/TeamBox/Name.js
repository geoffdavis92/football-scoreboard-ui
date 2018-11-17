import React from "react";
import { Team } from "../utils/types";

export default function Name(props) {
  let displayedText;
  switch (props.style) {
    case "city": {
      displayedText = props.city.abbv;
      break;
    }
    case "name":
    default: {
      displayedText = props.name;
    }
  }
  return (
    <div
      className={`team-box__name team-box__name--${props.name.toLowerCase()}`}
    >
      <h2 className="team-box__name-inner-container">
        {displayedText}
        {props.showRecord &&
          props.record.wins &&
          <span className="team-box__record">
            {props.record.wins}-{props.record.losses}
          </span>}
      </h2>
    </div>
  );
}

Name.propTypes = {
  city: Team.city,
  name: Team.name,
  record: Team.record
};
