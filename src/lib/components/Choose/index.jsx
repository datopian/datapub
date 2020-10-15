import React, { useState } from "react";
import PropTypes from "prop-types";
import InputFile from "../InputFile";
import InputUrl from "../InputUrl";
import "./Choose.css";

class Choose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadOption: false,
    };
  }

  handleOption = (type) => {
    this.setState({ uploadOption: type });
  };

  render() {
    return (
      <div className="upload-choose">
        {this.state.uploadOption ? (
          <>
            {this.state.uploadOption === "file" && (
              <InputFile onChangeHandler={this.props.onChangeHandler} />
            )}
            {this.state.uploadOption === "url" && (
              <InputUrl onChangeUrl={this.props.onChangeUrl} />
            )}
          </>
        ) : (
          <div>
            <button
              className="choose-btn"
              onClick={() => this.handleOption("file")}
            >
              Choose a file to Upload{" "}
            </button>
            <p className="choose-text">OR</p>
            <button
              className="choose-btn"
              onClick={() => this.handleOption("url")}
            >
              Link a file already online
            </button>
          </div>
        )}
      </div>
    );
  }
}

Choose.propTypes = {
  onChangeUrl: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default Choose;
