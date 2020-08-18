import React from "react";
import { Uploader, FileAPI } from "ckan3-js-sdk";
import PropTypes from "prop-types";
import UploadIcon from "../../assets/computing-cloud.svg";
import ProgressBar from "../ProgressBar";
import Metadata from "../Metadata";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      fileSize: 0, 
      formattedSize: '0 KB',
      metadata: {
        path: "",
        title: "",
        encode: "",
        description: "",
        format: ""
      },
      start: "",
      loaded: 0,
      success: false,
      error: false,
      timeRemaining: 0,
    };
  }

  onChangeHandler = (event) => {
    let { formattedSize, metadata } = this.state
    let {title, encode, description} = metadata

    if (event.target.files.length > 0) {
      formattedSize = this.onFormatBytes(event.target.files[0].size)
      encode = this.getFileExtension(event.target.files[0].name)
      title = this.onFormatTitle(event.target.files[0].name)
    }
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      success: false,
      error: false,
      formattedSize,
      metadata: {
        path: event.target.files[0].name,
        title,
        encode,
        description,
        format: encode
      }
    });
  };

  onUploadProgress = (progressEvent) => {
    this.onTimeRemaining(progressEvent.loaded);
    this.setState({
      loaded: (progressEvent.loaded / progressEvent.total) * 100,
    });
  };

  onTimeRemaining = (progressLoaded) => {
    const end = new Date().getTime();
    const duration = (end - this.state.start) / 1000;
    const bps = progressLoaded / duration;
    const kbps = bps / 1024;
    const timeRemaining = (this.state.fileSize - progressLoaded) / kbps;

    this.setState({
      timeRemaining: timeRemaining / 1000,
    });
  };

  onFormatBytes = (bytes, decimals = 1) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  onClickHandler = () => {
    const start = new Date().getTime();
    const { selectedFile } = this.state;
    const { scopes, config, authzUrl } = this.props;
    const { authToken, api, organizationId, datasetId } = config;

    // create an instance of a object
    const file = new FileAPI.HTML5File(selectedFile);
    const uploader = new Uploader(
      `${authToken}`,
      `${organizationId}`,
      `${datasetId}`,
      `${api}`
    );

    this.setState({ fileSize: file.size(), start });

    // Get the JWT token from authz and upload file to the storage
    fetch(`${authzUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify(scopes),
    })
      .then((response) => response.json())
      .then((response) =>
        uploader.push(file, response.result.token, this.onUploadProgress)
      )
      .then((response) => this.setState({ success: response.success }))
      .catch((error) => this.setState({ error: true }));
  };

  getFileExtension = (filename) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
  }

  onFormatTitle = (name) => {
    return name.replace(/\.[^/.]+$/, "").replace(/_/g, ' ').replace(/-/g, ' ');
  }

  handleChangeMetadata = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const {metadata} = this.state

    this.setState({
      metadata: {
        ...metadata,
        [name]: value
      }
    });
  }

  handleSubmitMetadata = (event) => {
    event.preventDefault();
    console.log('Seu sabor favorito é: ', this.state.metadata);
  }

  render() {
    const { success, error, timeRemaining, selectedFile, formattedSize, metadata} = this.state;
    return (
      <div className="upload-wrapper">
        <div className="upload-drop-area">
          <input
            className="upload-input"
            type="file"
            name="file"
            onChange={this.onChangeHandler}
          />
          <img className="upload-icon" src={UploadIcon} alt="upload-icon" />
          <span className="upload-text">
            Drag and drop your files
            <br />
            or <br />
            click to select
          </span>
        </div>
        <div className="upload-info">
        {selectedFile && (
          <>
          <ul className="upload-list">
           
              <li className="upload-list-item">
                <div>
                  <p className="upload-file-name">{selectedFile.name}</p>
                  <p className="upload-file-size">{formattedSize}</p>
                </div>
                <div>
                  <ProgressBar
                    progress={Math.round(this.state.loaded)}
                    size={50}
                    strokeWidth={5}
                    circleOneStroke="#d9edfe"
                    circleTwoStroke={"#7ea9e1"}
                    timeRemaining={timeRemaining}
                  />
                </div>
              </li>
          </ul>
          <Metadata metadata={metadata} handleSubmit={this.handleSubmitMetadata} handleChange={this.handleChangeMetadata}/>
          </>
          )}
        </div>
        <div>
          <h2 className="upload-message">{success && "File upload success"}</h2>
          <h2 className="upload-message">{error && "Upload failed"}</h2>
          <button
            className="upload-btn"
            type="button"
            onClick={this.onClickHandler}
          >
            Upload
          </button>
        </div>
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
    authToken: "be270cae-1c77-4853-b8c1-30b6cf5e9878",
    api: "http://localhost:9419",
    organizationId: "myorg",
    datasetId: "data-test-2",
  },
  scopes: {
    scopes: [`obj:myorg/data-test-2/*:read,write`],
  },
  authzUrl: "http://localhost:5000/api/action/authz_authorize",
};

Upload.propTypes = {
  config: PropTypes.object.isRequired,
  scopes: PropTypes.object.isRequired,
  authzUrl: PropTypes.string.isRequired,
};

export default Upload;
