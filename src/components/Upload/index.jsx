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
    super(props);
    this.state = {
      datasetId: props.datasetId,
      selectedFiles: [],
      fileSize: 0,
      formattedSize: "0 KB",
      uploadProgress: [],
    };
  }

  onChangeHandler = async (event) => {
    // event.preventDefault();

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

    const fileProgress = {
      id: uuidv4(),
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

    this.props.metadataHandler(Object.assign(resource.descriptor, { hash }));

    client
      .pushBlob(resource, (event) =>
        this.onUploadProgress(event, fileProgress.id)
      )
      .then((response) => console.log(response))
      // .then(() => {
      //   // Once upload is done, create a resource
      //   const ckanResource = frictionlessCkanMapper.resourceFrictionlessToCkan(
      //     resource.descriptor
      //   )
      //   delete ckanResource.sample
      //   client.action('resource_create', Object.assign(ckanResource, {
      //     package_id: this.state.datasetId
      //   }))
      // })
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
          {uploadProgress.map((item, index) => (
            <div key={`upload-file-${index}`}>
              <ul className="upload-list">
                <li className="list-item">
                  <div className="upload-list-item">
                    <div>
                      <p className="upload-file-name">{item.name}</p>
                      <p className="upload-file-size">
                        {onFormatBytes(item.size)}
                      </p>
                    </div>
                    <div>
                      {item.error && "Upload failed"}
                      {!item.error && !item.success && (
                        <ProgressBar
                          progress={Math.round(item.loaded)}
                          size={50}
                          strokeWidth={5}
                          circleOneStroke="#d9edfe"
                          circleTwoStroke={"#7ea9e1"}
                          timeRemaining={item.timeRemaining}
                        />
                      )}
                      {item.success && "Upload success"}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Upload;
