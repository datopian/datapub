import React from "react";
import axios from "axios";

class Uploader extends React.Component {
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
    console.log(event.target.files[0]);
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

export default Uploader;
