import React from "react";
import PropTypes from "prop-types";
import './Switcher.css'

const Switcher = (props) => {

  return (
    <div className="switch-wrapper">
      <div onClick={() => props.switcher('metadata')}>
        <div className={`switch-number ${props.metadataOrSchema === 'metadata' ? "switch-number-selected" : "switch-number-disabled"}`}>
          1
        </div>
        <p className={`switch-description "switch-description-active"}`}>
          Edit Metadata
        </p>
      </div>
      <div onClick={() => props.switcher('schema')}>
        <div className={`switch-number ${props.metadataOrSchema === 'schema' ? "switch-number-selected" : "switch-number-disabled"}`}>
          2
        </div>
        <p className={`switch-description "switch-description-active"}`}>
          Edit Schema
        </p>
      </div>
      <div className={`divider-line`} />
    </div>
  )
}

Switcher.propTypes = {
  metadataOrSchema: PropTypes.string.isRequired
};

export default Switcher;
