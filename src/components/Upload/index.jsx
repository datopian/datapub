import React from "react";
import data from "data.js";
import frictionlessCkanMapper from "frictionless-ckan-mapper-js";
import toArray from "stream-to-array";
import { v4 as uuidv4 } from "uuid";

import ProgressBar from "../ProgressBar";
import { onFormatBytes } from "../../utils";
import Choose from "../Choose";

class Upload extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedFiles: [],
      uploadProgress: [],
    };
  }

  onChangeHandler = async (event) => {
    event.preventDefault();

    let { selectedFiles } = this.state;

    if (event.target.files.length) {
      [...event.target.files].forEach((file) => {
        selectedFiles.push(file);

        this.onClickHandler(file);
      });

      this.setState({
        ...this.state,
        selectedFiles,
      });
    }
  };

  onUploadProgress = (progressEvent, id) => {
    const { uploadProgress } = this.state;
    const checkUploadProgress = uploadProgress.find((item) => item.id === id);

    if (checkUploadProgress) {
      const newUploadProgressState = uploadProgress.map((obj) =>
        obj.id === id
          ? {
              ...obj,
              loaded: (progressEvent.loaded / progressEvent.total) * 100,
              timeRemaining: this.onTimeRemaining(
                progressEvent.loaded,
                obj.start,
                obj.size
              ),
            }
          : obj
      );
      this.setState({ uploadProgress: newUploadProgressState });
    }
  };

  onTimeRemaining = (progressLoaded, start, size) => {
    const end = new Date().getTime();
    const duration = (end - start) / 1000;
    const bps = progressLoaded / duration;
    const kbps = bps / 1024;
    const timeRemaining = (size - progressLoaded) / kbps;

    return timeRemaining / 1000;
  };

  onClickHandler = async (file) => {
    const { client } = this.props;
    const start = new Date().getTime();
    let newState = this.state.uploadProgress;

    const uploadId = uuidv4()
    const fileProgress = {
      id: uploadId,
      loaded: 0,
      size: file.size,
      start: start,
      name: file.name,
      error: false,
      success: false,
      fileExists: false,
    };

    newState.push(fileProgress);

    this.setState({
      uploadProgress: newState,
    });

    const resource = data.open(file);
    const hash = await resource.hashSha256();

    try {
      const rowStream = await resource.rows({ size: 20, keyed: true });
      resource.descriptor.sample = await toArray(rowStream);
      await resource.addSchema();
    } catch (e) {
      console.error(e);
    }

    this.props.metadataHandler(Object.assign(resource.descriptor, { hash, uploadId }));

    client
      .pushBlob(resource, (event) =>
        this.onUploadProgress(event, fileProgress.id)
      )
      .then((response) => { 
        if (response.fileExists) {
          return this.handleStatus(newState, fileProgress.id, true, "fileExists")
        }
        return this.handleStatus(newState, fileProgress.id, true, "success")
      })
      .catch((error) =>
        this.handleStatus(newState, fileProgress.id, true, "error")
      );
  };

  handleStatus = (state, id, value, name) => {
    state.map((item) => {
      if (item.id === id) {
        return (item[name] = value);
      }
      return item;
    });
    this.setState({ uploadProgress: state });
  };

  render() {
    const { uploadProgress } = this.state;
    return (
      <div className="upload-area">
        <Choose
          onChangeHandler={this.onChangeHandler}
          onChangeUrl={(event) => console.log("Get url:", event.target.value)}
        />
        <div className="upload-area__info">
              <ul className="upload-list">
              {uploadProgress.map((item, index) => (
                <li className="list-item"  key={`upload-file-${index}`} onClick={() => this.props.handleEditResource(item.id)}>
                  <div className="upload-list-item">
                    <div>
                      <p className="upload-file-name">{item.name}</p>
                      <p className="upload-file-size">
                        {onFormatBytes(item.size)}
                      </p>
                    </div>
                    <div>
                      {item.error && "Upload failed"}
                      {!item.error && !item.success && !item.fileExists && (
                        <ProgressBar
                          progress={Math.round(item.loaded)}
                          size={50}
                          strokeWidth={5}
                          circleOneStroke="#d9edfe"
                          circleTwoStroke={"#7ea9e1"}
                          timeRemaining={item.timeRemaining}
                        />
                      )}
                      {(item.success || item.fileExists) && "Upload successfully"}
                    </div>
                  </div>
                </li>
              ))}
              </ul>
        </div>
      </div>
    );
  }
}

export default Upload;
