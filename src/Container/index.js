import React from "react";
import "./container.sass";

export default function Container(props) {
  return (
    <div className="container">
      {props.children}
    </div>
  );
}
