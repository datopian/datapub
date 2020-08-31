import React from "react";
import PropTypes from "prop-types";
import './InputUrl.css'

const InputUrl = ({ onChangeUrl }) => {

      return (
            <div className="upload-area__url">
                <label className="upload-area__url__label" htmlFor="input-url">URL:</label>
                <input
                    className="upload-area__url__input"
                    id="input-url"
                    type="url"
                    name="input-url"
                    onChange={onChangeUrl}
                    placeholder="https://www.data.com/sample.csv"
                />
            </div>
      )
  }

InputUrl.propTypes = {
  onChangeUrl: PropTypes.func.isRequired
};

export default InputUrl;
