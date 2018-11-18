import React from "react";
import { TimeoutsRemaining } from "../utils/types";

export default function Timeouts({ children, remaining }) {
  return new Array(3)
    .fill(0)
    .map((_, i) => (
      <span
        key={i}
        className={
          `timeout${i + 1 > remaining ? " timeout--hide" : " timeout--show"}`
        }
      />
    ));
}

Timeouts.propTypes = TimeoutsRemaining;
