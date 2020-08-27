import React, { Component } from "react";
import PropTypes from "prop-types";
import './Stepper.css'

export default class Stepper extends Component {
  constructor() {
    super();
    this.state = {
      // Completed - to add a check mark
      // Selected - to fill step with color
      // Highlighted - to make text of selected step bold
      steps: [],
      step: {
        selected: true,
        completed: false,
      }
    };
  }


  render() {
      return (
        <div className="step-wrapper">
          <div className={`step-number ${this.state.step.selected ? "step-number-selected" : "step-number-disabled"}`}>
            {this.state.step.completed ? <span>&#10003;</span> : 1}
          </div>
          <div className={`divider-line`} />
          <div className={`step-number ${this.state.step.selected ? "step-number-selected" : "step-number-disabled"}`}>
            {this.state.step.completed ? <span>&#10003;</span> : 2}
          </div>
        </div>
      );
    }
}

Stepper.propTypes = {
  direction: PropTypes.string.isRequired,
  currentStepNumber: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  stepColor: PropTypes.string.isRequired
};
