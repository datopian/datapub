import React from "react";
import { Uploader, FileAPI } from 'ckan3-js-sdk'
import PropTypes from "prop-types";

import ProgressBar from '../ProgressBar';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      success: false,
      error: false,
      fileSize: 0,
      timeRemaining: 0,
      start: ''
    };
  }

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      success: null,
    });
  };
  
  onUploadProgress = (progressEvent) => {
    this.onTimeRemaining(progressEvent.loaded)
    this.setState({
      loaded: (progressEvent.loaded / progressEvent.total) * 100,
    })
  }

  onTimeRemaining = (progressLoaded) => {
    const end = new Date().getTime()
    const duration = (end - this.state.start) / 1000
    const bps = progressLoaded / duration
    const kbps = bps / 1024
    const timeRemaining = ((this.state.fileSize - progressLoaded) / kbps)

    this.setState({
      timeRemaining: timeRemaining / 1000
    })
  }

  onClickHandler = () => {
    const start = new Date().getTime()
    const { selectedFile } = this.state
    const { scopes, config, authzUrl } = this.props
    const { authToken, api,organizationId, datasetId } = config

    // create an instance of a object
    const file = new FileAPI.HTML5File(selectedFile)
    const uploader = new Uploader(`${authToken}`, `${organizationId}`, `${datasetId}`, `${api}`)

    this.setState({fileSize: file.size(), start})

    // Get the JWT token from authz and upload file to the storage
    fetch(`${authzUrl}`,{
        method: 'POST',
        headers: {  
          'Content-Type':'application/json',
          Authorization: authToken,
        },
        body: JSON.stringify(scopes)
      })
      .then(response => response.json())
      .then(response => uploader.push(file, response.result.token, this.onUploadProgress))
      .then(response => this.setState({success: response.success}))
      .catch(error => this.setState({error: true}))
  };
  
  render() {
    const { success, error, timeRemaining } = this.state
    return (
      <div className="uploader-wrapper">
        <div className="uploader-info">
          <input
            className="uploader-input"
            type="file"
            name="file"
            onChange={this.onChangeHandler}
          />
          <ProgressBar 
            progress={Math.round(this.state.loaded)}
            size={50}
            strokeWidth={5}
            circleOneStroke='#d9edfe'
            circleTwoStroke={"#7ea9e1"}
            timeRemaining={timeRemaining}
          /> 
        </div>
        <h2>{success && "File upload success"}</h2>
        <h2>{error && "Upload failed"}</h2>
        <button
          className="uploader-btn"
          type="button"
          onClick={this.onClickHandler}
        >
          Upload
        </button>
      </div>
    );
  }
}

/** 
 * If the parent component doesn't specify a `config` and scope prop, then
 * the default values will be used.
 * */ 
Upload.defaultProps = {
  config: {
    authToken: 'be270cae-1c77-4853-b8c1-30b6cf5e9878',
    api: 'http://localhost:9419',
    organizationId: 'myorg',
    datasetId: 'data-test',
  },
  scopes: {
    "scopes": [`obj:myorg/data-test/*:read,write`]
  },
  authzUrl: 'http://localhost:5000/api/action/authz_authorize'
}

Upload.propTypes = {
  config: PropTypes.object.isRequired,
  scopes: PropTypes.object.isRequired,
  authzUrl: PropTypes.string.isRequired,
};

export default Upload;
