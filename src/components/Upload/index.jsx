import React from "react";
import axios from "axios";

import { Uploader, FileAPI } from 'ckan3-js-sdk'

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
    };
  }

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      status: null,
    });

    // create an instance of a object
    const file = new FileAPI.HTML5File(event.target.files[0])
    const uploader = new Uploader('key', 'organization-name', 'dataset-name', 'api')

    console.log(event.target.files[0]);
    console.log(uploader)
    console.log(file)
  };

  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        this.setState({
          loaded: (progressEvent.loaded / progressEvent.total) * 100,
        });
      },
    };
    axios
      .put("http://localhost:3000/upload", data, config)
      .then((response) => {
        this.setState({
          status: response.status,
        });
      });
  };
  render() {
    return (
      <div className="uploader-wrapper">
        <input
          className="uploader-input"
          type="file"
          name="file"
          onChange={this.onChangeHandler}
        />
        <button
          className="uploader-btn"
          type="button"
          onClick={this.onClickHandler}
        >
          Upload
        </button>
        <h2>loaded: {Math.round(this.state.loaded)} %</h2>
        <h2>Status code: {this.state.status}</h2>
      </div>
    );
  }
}

export default Upload;
