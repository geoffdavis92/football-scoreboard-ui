import React from "react";
import ReactDOM from "react-dom";
import Container from "./Container";
import TeamBox from "./TeamBox";

const STEELERS = {
  city: {
    abbv: "PIT",
    full: "Pittsburgh"
  },
  name: "Steelers",
  record: {
    wins: 3,
    losses: 2
  },
  colors: {
    pri: "black",
    sec: "gold",
    ter: "white"
  }
};

const BEARS = {
  city: {
    abbv: "CHI",
    full: "Chicago"
  },
  name: "Bears",
  record: {
    wins: 4,
    losses: 1
  },
  colors: {
    pri: "navy",
    sec: "orange",
    ter: "white"
  }
};

class App extends React.Component {
  constructor({ team1, team2 }) {
    super();
    this.team1 = team1;
    this.team2 = team2;
    this.state = {
      showTeamRecords: true,
      timeoutsRemaining: {
        team1: 3,
        team2: 3
      }
    };
  }
  render() {
    return (
      <React.Fragment>
        <Container>
          <TeamBox
            team={this.team1}
            showRecord={true}
            timeoutsRemaining={this.state.timeoutsRemaining.team1}
          />
          <TeamBox
            team={this.team2}
            showRecord={true}
            timeoutsRemaining={this.state.timeoutsRemaining.team2}
          />
        </Container>
        <br /><br />
        {[
          { key: "team1", team: this.team1 },
          { key: "team2", team: this.team2 }
        ].map(({ key, team }) => (
          <div>
            <h3>{team.name}</h3>
            <button
              onClick={e =>
                this.state.timeoutsRemaining[key] < 3 &&
                this.setState(prevState => ({
                  timeoutsRemaining: {
                    ...prevState.timeoutsRemaining,
                    [key]: prevState.timeoutsRemaining[key] + 1
                  }
                }))}
            >
              Add Timeout
            </button>
            <button
              onClick={e =>
                this.state.timeoutsRemaining[key] > 0 &&
                this.setState(prevState => ({
                  timeoutsRemaining: {
                    ...prevState.timeoutsRemaining,
                    [key]: prevState.timeoutsRemaining[key] - 1
                  }
                }))}
            >
              Use Timeout
            </button>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App team1={STEELERS} team2={BEARS} />,
  document.getElementById("root")
);
