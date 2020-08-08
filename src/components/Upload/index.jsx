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

    /**
     * Push stuff
     */
    const config = {
      authToken: 'be270cae-1c77-4853-b8c1-30b6cf5e9878',
      api: 'http://localhost:5000',
      organizationId: 'myorg',
      datasetId: 'new-test-3',
    }

    const scopes = {
      "scopes": [`obj:${config.organizationId}/${config.datasetId}/*:read,write`]
    }

    // create an instance of a object
    const file = new FileAPI.HTML5File(event.target.files[0])
    const uploader = new Uploader(`${config.authToken}`, `${config.organizationId}`, `${config.datasetId}`, `${config.api}`)


    // authz path
    const path = '/api/action/authz_authorize'

    // Get the JWT token from authz
    fetch(`${path}`,{
        method: 'POST',
        headers: {  
          'Content-Type':'application/json',
          Authorization: config.authToken,
        },
        body: JSON.stringify(scopes)
      })
      .then(response => response.json())
      .then(response => console.log(response))
    
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
