import React from "react";
import "./clockbox.sass";

export default function ClockBox({ quarter, gameTimer }) {
  return (
    <div className="clock-box">
      <span className="clock-box__quarter">{quarter}</span>
      <span className="clock-box__timer">{gameTimer}</span>
    </div>
  );
}

ClockBox.defaultProps = { quarter: "1st", gameTimer: "15:00" };
