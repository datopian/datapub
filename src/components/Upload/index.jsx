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
      selectedFiles: [],
      fileSize: 0,
      formattedSize: "0 KB",
      start: "",
      loaded: 0,
      success: false,
      error: false,
      fileExists: false,
      loading: false,
      timeRemaining: 0,
      uploadProgress: [],
    };
  }

  onChangeHandler = async (event) => {
    event.preventDefault();

    let { formattedSize, selectedFiles } = this.state;
    
    if (event.target.files.length) {
      [...event.target.files].forEach( file => {
        selectedFiles.push(file) 

        this.onClickHandler(file);
      });

      // const file = data.open(selectedFile);
      // try {
      //   const rowStream = await file.rows({size: 20, keyed: true});
      //   file.descriptor.sample = await toArray(rowStream);
      //   await file.addSchema();
      // } catch(e) {
      //   console.error(e);
      // }

      // const hash = await file.hashSha256();
      // this.props.metadataHandler(Object.assign(file.descriptor, {hash}))

      this.setState({
        selectedFiles,
        loaded: 0,
        success: false,
        error: false,
        // formattedSize,
      });
    }
  };

  onUploadProgress = (progressEvent, hash) => {
    console.log(progressEvent);
    console.log(hash);
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

  onClickHandler = async (file) => {

    const { client } = this.props;
    const { selectedFiles } = this.state;
    console.log(selectedFiles);
        const resource = data.open(file)
        const hashSha256 = await resource.hashSha256();
        resource.descriptor.hash = hashSha256
        client.pushBlob(resource, (event) => this.onUploadProgress(event, hashSha256))
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
              // .catch((error) => this.setState({ error: true, loading: false }));


    // const start = new Date().getTime();

    // this.setState({
    //   fileSize: resource.size,
    //   start,
    //   loading: true,
    // });   
  };

  render() {
    const {
      success,
      fileExists,
      error,
      timeRemaining,
      selectedFiles,
      formattedSize,
    } = this.state;
    return (
      <div className="upload-area">
        <Choose
          onChangeHandler={this.onChangeHandler}
          onChangeUrl={(event) => console.log("Get url:", event.target.value)}
        />
        <div className="upload-area__info">
          {selectedFiles && selectedFiles.map( (item, index) => 
            <div key={`upload-file-${index}`}>
              <ul className="upload-list">
                <li className="list-item">
                  <div className="upload-list-item">
                    <div>
                      <p className="upload-file-name">{selectedFiles[index].name}</p>
                      <p className="upload-file-size">{ onFormatBytes(selectedFiles[index].size)}</p>
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
              <h2 className="upload-message">{error && "Upload failed"}</h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Upload;
