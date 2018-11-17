import PropTypes from "prop-types";

export const Team = {
  city: {
    abbv: PropTypes.string.isRequired,
    full: PropTypes.string.isRequired
  },
  name: PropTypes.string.isRequired,
  record: {
    wins: PropTypes.number,
    losses: PropTypes.number
  }
};

export const TimeoutsRemaining = { remaining: PropTypes.number.isRequired };
export const ScoreValue = PropTypes.number.isRequired;
