import React from "react";
import PropTypes from "prop-types";
import './Stepper.css'

const Stepper = (props) => {

  return (
    <div className="step-wrapper">
      <div onClick={() => props.switcher('metadata')}>
        <div className={`step-number ${props.metadataOrSchema === 'metadata' ? "step-number-selected" : "step-number-disabled"}`}>
          1
        </div>
        <p className={`step-description "step-description-active"}`}>
          Edit Metadata
        </p>
      </div>
      <div onClick={() => props.switcher('schema')}>
        <div className={`step-number ${props.metadataOrSchema === 'schema' ? "step-number-selected" : "step-number-disabled"}`}>
          2
        </div>
        <p className={`step-description "step-description-active"}`}>
          Edit Schema
        </p>
      </div>
      <div className={`divider-line`} />
    </div>
  )
}

Stepper.propTypes = {
  steps: PropTypes.array.isRequired,
};

export default Stepper;
