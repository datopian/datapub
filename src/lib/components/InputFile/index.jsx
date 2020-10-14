import React from "react";
import PropTypes from "prop-types";
import './InputFile.css'

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
                    src="https://www.shareicon.net/data/256x256/2015/09/05/96087_cloud_512x512.png"
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
