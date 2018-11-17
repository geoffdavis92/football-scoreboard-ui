import React from "react";
import { Team, ScoreValue } from "../utils/types";

export default function Score({ name, value }) {
  const safeValue = value >= 0 ? value : 0;
  return (
    <div className={`team-box__score team-box__score--${name.toLowerCase()}`}>
      {safeValue}
    </div>
  );
}

Score.propTypes = { name: Team.name, value: ScoreValue };
