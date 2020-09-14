import React from "react";
import { Client, Open  } from "ckanClient";
import data from "data.js";
import toArray from "stream-to-array";
import PropTypes from "prop-types";
import ProgressBar from "../ProgressBar";
import { onFormatBytes } from '../../utils';
import Choose from "../Choose";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      fileSize: 0,
      formattedSize: "0 KB",
      start: "",
      loaded: 0,
      success: false,
      error: false,
      loading: false,
      timeRemaining: 0,
    };
  }

  onChangeHandler = async (event) => {
    let { formattedSize, selectedFile } = this.state;

    if (event.target.files.length > 0) {
      selectedFile = event.target.files[0];
      const file = data.open(selectedFile);
      try {
        const rowStream = await file.rows({size: 20, keyed: true});
        file.descriptor.sample = await toArray(rowStream);
        await file.addSchema();
      } catch(e) {
        console.error(e);
      }
      formattedSize = onFormatBytes(file.size);
      const hash = await file.hash();
      this.props.metadataHandler(Object.assign(file.descriptor, {hash}))
    }

    this.setState({
      selectedFile,
      loaded: 0,
      success: false,
      error: false,
      formattedSize,
    });
    
    this.onClickHandler();
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

  onClickHandler = async () => {
    const start = new Date().getTime();
    const { selectedFile } = this.state;
    const { scopes, config, authzUrl } = this.props;
    const { authToken, api, organizationId, datasetId } = config;

    // create an instance of a object
    const file = new Open.HTML5File(selectedFile);

    const client = new Client(
      `${authToken}`,
      `${organizationId}`,
      `${datasetId}`,
      `${api}`
    );

    this.setState({
      fileSize: file.size(),
      start,
      loading: true,
    });

    // Get the JWT token from authz and upload file to the storage
    client.ckanAuthz(`${authzUrl}`)
      .then((response) => client.push(file, response.result.token, this.onUploadProgress))
      .then((response) => this.setState({ success: response.success, loading: false }))
      .catch((error) => this.setState({ error: true, loading: false }));
  };


  render() {
    const {
      success,
      error,
      timeRemaining,
      selectedFile,
      formattedSize,
      loading,
    } = this.state;
    return (
      <div className="upload-area">
        <Choose onChangeHandler={this.onChangeHandler} onChangeUrl={(event) => console.log("Get url:", event.target.value)}/>
        <div className="upload-area__info">
          {selectedFile && (
            <>
              <ul className="upload-list">
                <li className="list-item">
                  <div className="upload-list-item">
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
                  </div>
                </li>
              </ul>
              <h2 className="upload-message">
                {success && "File upload success"}
              </h2>
              <h2 className="upload-message">{error && "Upload failed"}</h2>
            </>
          )}
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
  authzUrl: "http://localhost:5000",
};

Upload.propTypes = {
  config: PropTypes.object.isRequired,
  scopes: PropTypes.object.isRequired,
  authzUrl: PropTypes.string.isRequired,
};

export default Upload;
