import React, { useState } from "react";
import PropTypes from "prop-types";
import InputFile from "../InputFile";
import InputUrl from "../InputUrl";
import './Choose.css'

const Choose = ({ onChangeUrl, onChangeHandler }) => {
  const [uploadOption, setUploadOption] = useState(false);

  return (
    <div className="upload-choose">
      {uploadOption ? (
        <>
          {uploadOption === "file" && (
            <InputFile onChangeHandler={onChangeHandler} />
          )}
          {uploadOption === "url" && <InputUrl onChangeUrl={onChangeUrl} />}
        </>
      ) : (
        <div>
          <button className="choose-btn" onClick={() => setUploadOption("file")}>Choose a file to Upload </button>
          <p className="choose-text">OR</p>
          <button className="choose-btn" onClick={() => setUploadOption("url")}>Link a file already online</button>
        </div>
      )}
    </div>
  );
};

Choose.propTypes = {
  onChangeUrl: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default Choose;
