import React from "react";
import { TimeoutsRemaining } from "../utils/types";

export default function Timeouts({ remaining }) {
  const timeoutItems = new Array(3)
    .fill(0)
    .map((_, i) => (
      <span
        key={i}
        className={
          `timeout${i + 1 > remaining ? " timeout--hide" : " timeout--show"}`
        }
      />
    ));
  console.log(timeoutItems);
  return (
    <div className={`team-box__timeouts team-box__timeouts--${remaining}`}>
      {timeoutItems}
    </div>
  );
}

Timeouts.propTypes = TimeoutsRemaining;
