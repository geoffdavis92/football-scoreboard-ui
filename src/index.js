import React from "react";
import ReactDOM from "react-dom";
import Container from "./Container";
import TeamBox from "./TeamBox";
import ClockBox from "./ClockBox";
import DriveBox from "./DriveBox";

import "./utils/sass/global.sass";

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

const PATRIOTS = {
  city: {
    abbv: "NE",
    full: "New England"
  },
  name: "Patriots",
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

const SAINTS = {
  city: {
    abbv: "NO",
    full: "New Orleans"
  },
  name: "Saints",
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

const scoreInput = {
  team1: React.createRef(),
  team2: React.createRef()
};

class App extends React.Component {
  constructor({ team1, team2 }) {
    super();
    this.team1 = team1;
    this.team2 = team2;
    this.state = {
      hasPossession: this.team1.name,
      showTeamRecords: true,
      score: {
        team1: 0,
        team2: 0
      },
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
            score={this.state.score.team1}
            timeoutsRemaining={this.state.timeoutsRemaining.team1}
            hasPossession={this.state.hasPossession === this.team1.name}
          />
          <TeamBox
            team={this.team2}
            showRecord={true}
            score={this.state.score.team2}
            timeoutsRemaining={this.state.timeoutsRemaining.team2}
            hasPossession={this.state.hasPossession === this.team2.name}
          />
          <ClockBox />
          <DriveBox />
        </Container>
        <br /><br />
        {[
          { key: "team1", team: this.team1 },
          { key: "team2", team: this.team2 }
        ].map(({ key, team }) => (
          <div>
            <h3>
              {team.name}
              {" "}
              <button
                onClick={() =>
                  this.setState(() => ({ hasPossession: this[key].name }))}
              >
                Give possession
              </button>
            </h3>
            <button
              onClick={() =>
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
            <br />
            <input
              ref={scoreInput[key]}
              placeholder="Score"
              type="text"
              onChange={e => {
                const teamScore = scoreInput[key].current.value.length
                  ? parseInt(scoreInput[key].current.value)
                  : this.state.score[key];
                this.setState(prevState => ({
                  score: {
                    ...prevState.score,
                    [key]: teamScore
                  }
                }));
              }}
            />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App team1={SAINTS} team2={BEARS} />,
  document.getElementById("root")
);
