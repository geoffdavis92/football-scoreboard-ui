import React from "react";
import { Team, ScoreValue } from "../utils/types";

// export default function Score({ name, value }) {
//   const safeValue = value >= 0 ? value : 0;
//   return (
//     <div className={`team-box__score team-box__score--${name.toLowerCase()}`}>
//       {safeValue}
//     </div>
//   );
// }

export default class Score extends React.Component {
  constructor({ city, value }) {
    super();
    this.value = value;
    this.state = {
      city: city,
      animationClass: "",
      score: this.value
    };
  }
  componentDidUpdate(prevProps) {
    const { value: prevScore } = prevProps;
    const { value: currScore } = this.props;
    if (currScore !== prevScore) {
      this.setState(
        () => ({
          animationClass: "rotate-half"
        }),
        () =>
          setTimeout(
            () => {
              this.setState(
                () => ({
                  animationClass: "rotate-full",
                  score: currScore
                }),
                () => this.setState(() => ({ animationClass: "" }))
              );
            },
            500
          )
      );
    }
  }
  render() {
    const { score } = this.state;
    const safeValue = score >= 0 ? score : 0;
    return (
      <div
        className={
          `team-box__score team-box__score--${this.props.city.abbv.toLowerCase()}${this.props.isAwayTeam ? `--away` : ""}`
        }
      >
        <span
          className={
            `score${this.state.animationClass.length ? ` score--${this.state.animationClass}` : ""}`
          }
        >
          {safeValue}
        </span>
      </div>
    );
  }
}

Score.propTypes = { name: Team.name, value: ScoreValue };
