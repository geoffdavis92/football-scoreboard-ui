import React from "react";
import ReactDOM from "react-dom";
import {
  faFootballBall as footballIcon,
  faAlarmClock as alarmClockIcon
} from "@fortawesome/pro-solid-svg-icons";
import {
  faExchangeAlt as exchangeIcon
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
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
};

const SCORES = {
  TOUCHDOWN: 6,
  PAT: 1,
  TWO_POINT_CONVERSION: 2,
  FIELD_GOAL: 3,
  SAFETY: 2
};

const scoreInput = {
  team1: React.createRef(),
  team2: React.createRef()
};

const Icon = props => (
  <span className={`icon icon--${props.name}`}>
    <FA icon={props.icon} />
  </span>
);

class App extends React.Component {
  constructor({ team1, team2 }) {
    super();
    this.state = {
      team1: team1,
      team2: team2,
      hasPossession: "team2",
      showLogos: true,
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
  swapTeams = () => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          team1: prevState.team2,
          team2: prevState.team1,
          hasPossession: prevState.hasPossession === "team1"
            ? "team2"
            : "team1",
          score: {
            team1: prevState.score.team2,
            team2: prevState.score.team1
          },
          timeoutsRemaining: {
            team1: prevState.timeoutsRemaining.team2,
            team2: prevState.timeoutsRemaining.team1
          }
        };
      },
      () => {
        REFS.team1.current.value = this.state.team1.name.toUpperCase();
        REFS.team2.current.value = this.state.team2.name.toUpperCase();
      }
    );
  };
  updateScore = (teamKey, scoreType, updateType = "ADD") => {
    const modifier = updateType === "ADD" ? 1 : -1;
    return () =>
      this.setState(prevState => {
        const newScore = prevState.score[teamKey] +
          SCORES[scoreType] * modifier;
        return {
          score: {
            ...prevState.score,
            [teamKey]: newScore > 0 ? newScore : 0
          }
        };
      });
  };
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
            showLogo={this.state.showLogos}
            isAwayTeam={true}
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
            showLogo={this.state.showLogos}
          />
          <ClockBox />
          <DriveBox />
        </Container>
        <br /><br />
        <div className="control-box">
          {["team1", "team2"].map(key => {
            return (
              <section>
                <div>
                  <select
                    ref={REFS[key]}
                    defaultValue={this.state[key].name.toUpperCase()}
                    onChange={e => {
                      this.setState(() => ({
                        [key]: TEAMS[REFS[key].current.value]
                      }));
                    }}
                  >
                    {Object.entries(TEAMS).sort().map(([teamId, teamData]) => {
                      const compareToKey = key === "team1" ? "team2" : "team1";
                      return teamId !==
                        this.state[compareToKey].name.toUpperCase() &&
                        <option key={teamId} value={teamId}>
                          {teamData.name}
                        </option>;
                    })}
                  </select>
                  {" "}
                  <button
                    className="control-box__button"
                    disabled={this.state.hasPossession === key}
                    onClick={() =>
                      this.setState(() => ({
                        hasPossession: key
                      }))}
                  >
                    Give possession <Icon name="football" icon={footballIcon} />
                  </button>
                </div>
                <hr />
                <button
                  className={
                    `control-box__button control-box__button--subtract`
                  }
                  onClick={e =>
                    this.state.timeoutsRemaining[key] > 0 &&
                    this.setState(prevState => ({
                      timeoutsRemaining: {
                        ...prevState.timeoutsRemaining,
                        [key]: prevState.timeoutsRemaining[key] - 1
                      }
                    }))}
                >
                  Use Timeout <Icon name="clock" icon={alarmClockIcon} />
                </button>
                <button
                  className={`control-box__button control-box__button--add`}
                  onClick={() =>
                    this.state.timeoutsRemaining[key] < 3 &&
                    this.setState(prevState => ({
                      timeoutsRemaining: {
                        ...prevState.timeoutsRemaining,
                        [key]: prevState.timeoutsRemaining[key] + 1
                      }
                    }))}
                >
                  Add Timeout <Icon name="clock" icon={alarmClockIcon} />
                </button>
                <hr />
                <React.Fragment>
                  {["ADD", "SUBTRACT"].map(action =>
                    Object.entries(SCORES).map(([scoreTypeKey]) => (
                      <button
                        className={
                          `control-box__button control-box__button--${action.toLowerCase()}`
                        }
                        onClick={this.updateScore(key, scoreTypeKey, action)}
                      >
                        {
                          `${action} ${scoreTypeKey
                            .replace(/\_/g, " ")
                            .toLowerCase()}`
                        }
                      </button>
                    )))}
                </React.Fragment>
              </section>
            );
          })}
          <section className="control-box__swapper">
            <button className="control-box__button" onClick={this.swapTeams}>
              Swap Teams <Icon name="swap" icon={exchangeIcon} />
            </button>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

window.TEAMS = TEAMS;

ReactDOM.render(
  <App team1={TEAMS.BEARS} team2={TEAMS.LIONS} />,
  document.getElementById("root")
);
