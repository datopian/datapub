import React from "react";
import PropTypes from "prop-types";
import './Stepper.css'

const Stepper = (props) => {

      return (
        <div className="step-wrapper">
          {props.steps.map((item, index) => {
            return (
              <div onClick={() => props.onChangeStep(index + 1)} key={`stepper-${item.class}`}>
                <div className={`step-number ${item.class} ${props.currentStep === item.stepNumber ? "step-number-selected" : "step-number-disabled"}`}>
                  {item.completed ? <span>&#10003;</span> : item.stepNumber}
                </div>
                <p
                    className={`step-description "step-description-active"}`}
                  >
                  {item.description}
                </p>
            </div>
            )
          })}
          <div className={`divider-line`} />
        </div>
      )
  }

Stepper.propTypes = {
  steps: PropTypes.array.isRequired,
};

export default Stepper;
