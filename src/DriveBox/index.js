import React from "react";
import "./drivebox.sass";

export default class DriveBox extends React.Component {
  render() {
    return (
      <section className="drive-box">
        <div className="drive-box__play-clock">:40</div>
        <div className="drive-box__drive-info">1st & 10</div>
      </section>
    );
  }
}
