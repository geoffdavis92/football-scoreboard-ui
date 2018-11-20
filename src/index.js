import React from "react";
import ReactDOM from "react-dom";
import Container from "./Container";
import TeamBox from "./TeamBox";
import ClockBox from "./ClockBox";
import DriveBox from "./DriveBox";

import "./utils/sass/global.sass";

const REFS = {
  team1: React.createRef(),
  team2: React.createRef()
};

const TEAMS = {
  CARDINALS: { city: { abbv: "ARI" }, name: "Cardinals" },
  FALCONS: { city: { abbv: "ATL" }, name: "Falcons" },
  RAVENS: { city: { abbv: "BAL" }, name: "Ravens" },
  BILLS: { city: { abbv: "BUF" }, name: "Bills" },
  PANTHERS: { city: { abbv: "CAR" }, name: "Panthers" },
  BEARS: { city: { abbv: "CHI" }, name: "Bears" },
  BENGALS: { city: { abbv: "CIN" }, name: "Bengals" },
  BROWNS: { city: { abbv: "CLE" }, name: "Browns" },
  COWBOYS: { city: { abbv: "DAL" }, name: "Cowboys" },
  BRONCOS: { city: { abbv: "DEN" }, name: "Broncos" },
  LIONS: { city: { abbv: "DET" }, name: "Lions" },
  PACKERS: { city: { abbv: "GB" }, name: "Packers" },
  TEXANS: { city: { abbv: "HOU" }, name: "Texans" },
  COLTS: { city: { abbv: "IND" }, name: "Colts" },
  JAGUARS: { city: { abbv: "JAX" }, name: "Jaguars" },
  CHIEFS: { city: { abbv: "KC" }, name: "Chiefs" },
  RAMS: { city: { abbv: "LA" }, name: "Rams" },
  CHARGERS: { city: { abbv: "LAC" }, name: "Chargers" },
  DOLPHINS: { city: { abbv: "MIA" }, name: "Dolphins" },
  VIKINGS: { city: { abbv: "MIN" }, name: "Vikings" },
  PATRIOTS: { city: { abbv: "NE" }, name: "Patriots" },
  SAINTS: { city: { abbv: "NO" }, name: "Saints" },
  GIANTS: { city: { abbv: "NYG" }, name: "Giants" },
  JETS: { city: { abbv: "NYJ" }, name: "Jets" },
  RAIDERS: { city: { abbv: "OAK" }, name: "Raiders" },
  EAGLES: { city: { abbv: "PHI" }, name: "Eagles" },
  STEELERS: { city: { abbv: "PIT" }, name: "Steelers" },
  _CHARGERS: { city: { abbv: "SD" }, name: "_chargers" },
  SEAHAWKS: { city: { abbv: "SEA" }, name: "Seahawks" },
  FORTYNINERS: { city: { abbv: "SF" }, name: "Fortyniners" },
  BUCCANEERS: { city: { abbv: "TB" }, name: "Buccaneers" },
  TITANS: { city: { abbv: "TEN" }, name: "Titans" },
  REDSKINS: { city: { abbv: "WAS" }, name: "Redskins" }
  // BEARS: {
  //   city: {
  //     abbv: "CHI",
  //     full: "Chicago"
  //   },
  //   name: "Bears",
  //   record: {
  //     wins: 4,
  //     losses: 1
  //   }
  // },
  // PATRIOTS: {
  //   city: {
  //     abbv: "NE",
  //     full: "New England"
  //   },
  //   name: "Patriots",
  //   record: {
  //     wins: 3,
  //     losses: 2
  //   }
  // },
  // SAINTS: {
  //   city: {
  //     abbv: "NO",
  //     full: "New Orleans"
  //   },
  //   name: "Saints",
  //   record: {
  //     wins: 3,
  //     losses: 2
  //   }
  // },
  // STEELERS: {
  //   city: {
  //     abbv: "PIT",
  //     full: "Pittsburgh"
  //   },
  //   name: "Steelers",
  //   record: {
  //     wins: 4,
  //     losses: 3
  //   }
  // }
};
const scoreInput = {
  team1: React.createRef(),
  team2: React.createRef()
};

class App extends React.Component {
  constructor({ team1, team2 }) {
    super();
    this.state = {
      team1: team1,
      team2: team2,
      hasPossession: "team1",
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
            team={this.state.team1}
            showRecord={false}
            score={this.state.score.team1}
            timeoutsRemaining={this.state.timeoutsRemaining.team1}
            hasPossession={
              this.state[this.state.hasPossession].name ===
                this.state.team1.name
            }
          />
          <TeamBox
            team={this.state.team2}
            showRecord={false}
            score={this.state.score.team2}
            timeoutsRemaining={this.state.timeoutsRemaining.team2}
            hasPossession={
              this.state[this.state.hasPossession].name ===
                this.state.team2.name
            }
          />
          <ClockBox />
          <DriveBox />
        </Container>
        <br /><br />
        <div className="control-box">
          {["team1", "team2"].map(key => (
            <section>
              <div>
                <select
                  ref={REFS[key]}
                  defaultValue={this.state[key].name.toUpperCase()}
                  onChange={e => {
                    this.setState(() => {
                      console.log(TEAMS[REFS[key].current.value]);
                      return {
                        [key]: TEAMS[REFS[key].current.value]
                      };
                    });
                  }}
                >
                  {Object.entries(TEAMS).map(([teamId, teamData]) => (
                    <option key={teamId} value={teamId}>
                      {teamData.name}
                    </option>
                  ))}
                </select>
                {" "}
                <button
                  onClick={() =>
                    this.setState(() => ({
                      hasPossession: key
                    }))}
                >
                  Give possession
                </button>
              </div>
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
            </section>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

window.TEAMS = TEAMS;

ReactDOM.render(
  <App team1={TEAMS.STEELERS} team2={TEAMS.PATRIOTS} />,
  document.getElementById("root")
);
