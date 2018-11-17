import React from "react";
import Name from "./Name";
import Timeouts from "./Timeouts";
import Score from "./Score";
import { Team } from "../utils/types";
import "./teambox.sass";

export default class TeamBox extends React.Component {
  static propTypes = Team;
  render = () => {
    const { showRecord, team, score, timeoutsRemaining } = this.props;
    const { city, name, record } = team;
    return (
      <section className="team-box">
        <Name
          city={city}
          name={name}
          record={record}
          showRecord={showRecord}
          style="name"
        />
        <Score name={name} value={score} />
        <Timeouts remaining={timeoutsRemaining} />
      </section>
    );
  };
}