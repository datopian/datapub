import React from "react";
import data from "data.js";
import frictionlessCkanMapper from "frictionless-ckan-mapper-js";
import toArray from "stream-to-array";
import ProgressBar from "../ProgressBar";
import { onFormatBytes } from "../../utils";
import Choose from "../Choose";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetId: props.datasetId,
      selectedFile: null,
      fileSize: 0,
      formattedSize: "0 KB",
      start: "",
      loaded: 0,
      success: false,
      error: false,
      fileExists: false,
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
        const rowStream = await file.rows({ size: 20, keyed: true });
        file.descriptor.sample = await toArray(rowStream);
        await file.addSchema();
      } catch (e) {
        console.error(e);
      }
      formattedSize = onFormatBytes(file.size);
      const hash = await file.hashSha256();
      this.props.metadataHandler(Object.assign(file.descriptor, { hash }));
    }

    this.setState({
      selectedFile,
      loaded: 0,
      success: false,
      fileExists: false,
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
    const { client } = this.props;

    const resource = data.open(selectedFile);

    this.setState({
      fileSize: resource.size,
      start,
      loading: true,
    });

    this.props.handleUploadStatus({
      loading: true,
      error: false,
      success: false,
    });

    // Use client to upload file to the storage and track the progress
    client
      .pushBlob(resource, this.onUploadProgress)
      .then((response) => {
        this.setState({
          success: response.success,
          loading: false,
          fileExists: response.fileExists,
          loaded: 100
        });
        this.props.handleUploadStatus({
          loading: false,
          success: response.success,
        });
      })
      .catch((error) => {
        this.setState({ error: true, loading: false });
        this.props.handleUploadStatus({
          loading: false,
          success: false,
          error: true,
        });
      });
  };

  render() {
    const {
      success,
      fileExists,
      error,
      timeRemaining,
      selectedFile,
      formattedSize,
    } = this.state;
    return (
      <div className="upload-area">
        <Choose
          onChangeHandler={this.onChangeHandler}
          onChangeUrl={(event) => console.log("Get url:", event.target.value)}
        />
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
                {success && !fileExists && !error && "File uploaded successfully"}
                {fileExists && "File uploaded successfully"}
                {error && "Upload failed"}
              </h2>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Upload;
