import React from "react";
import { Team } from "../utils/types";
import LOGOS from "../logos.json";

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
      className={
        `team-box__name team-box__name--${props.city.abbv.toLowerCase()}${props.isAwayTeam ? `--away` : ""}`
      }
      style={props.showLogo ? LOGOS[props.city.abbv] : {}}
    >
      <h2
        className={
          `team-box__name-inner-container${props.showLogo ? " team-box__name-inner-container--show-logo" : ""}`
        }
      >
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
