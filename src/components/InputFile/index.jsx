import React from "react";
import PropTypes from "prop-types";
import './InputFile.css'
import UploadIcon from "../../assets/images/computing-cloud.svg";

const InputFile = ({ onChangeHandler }) => {

      return (
            <div className="upload-area__drop">
                <input
                    className="upload-area__drop__input"
                    type="file"
                    name="file"
                    onChange={onChangeHandler}
                />
                <img
                    className="upload-area__drop__icon"
                    src={UploadIcon}
                    alt="upload-icon"
                />
                <span className="upload-area__drop__text">
                    Drag and drop your files
                    <br />
                    or <br />
                    click to select
                </span>
            </div>
      )
  }

InputFile.propTypes = {
  onChangeHandler: PropTypes.func.isRequired
};

export default InputFile;
