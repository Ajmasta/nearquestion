import React from "react";
import PropTypes from "prop-types";
import Big from "big.js";

export default function Form({ onSubmit, currentUser }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Ask your question {currentUser.accountId}!</p>
        <p className="highlight">
          <label htmlFor="message">Question:</label>
          <input autoComplete="off" autoFocus id="message" required />
        </p>
        <p>
          <label htmlFor="donation">Rewards:</label>
          <input
            autoComplete="off"
            defaultValue={"0"}
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0"
            step="0.01"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p>
        <button type="submit">Ask</button>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
};
