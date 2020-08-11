import React from "react";
import { Uploader, FileAPI } from 'ckan3-js-sdk'

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      success: null
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
    this.setState({
      loaded: (progressEvent.loaded / progressEvent.total) * 100
    })
  }

  onClickHandler = () => {
    const { selectedFile } = this.state
    const { scopes, config, authzUrl } = this.props
    const { authToken, api,organizationId, datasetId } = config

    // create an instance of a object
    const file = new FileAPI.HTML5File(selectedFile)
    const uploader = new Uploader(`${authToken}`, `${organizationId}`, `${datasetId}`, `${api}`)

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
      .catch(error => console.log('error: ', error))
  
    console.log("uploader:", uploader)
    console.log("File:", file)
  };
  render() {
    const { success } = this.state
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
        <h2>{success === true && "File upload success"}</h2>
        <h2>{success === false && "Upload failed"}</h2>
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
    datasetId: 'new-sample',
  },
  scopes: {
    "scopes": [`obj:myorg/new-sample/*:read,write`]
  },
  authzUrl: 'http://localhost:5000/api/action/authz_authorize'
}

export default Upload;
