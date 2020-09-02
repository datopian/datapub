import React from "react";
import { Uploader, FileAPI } from "ckan3-js-sdk";
import PropTypes from "prop-types";
import ProgressBar from "../ProgressBar";
import Metadata from "../Metadata";
import Stepper from "../Stepper";
import TableSchema from "../TableSchema";
import { getFileExtension, onFormatTitle, onFormatName, onFormatBytes } from '../../utils'
import Choose from "../Choose";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      fileSize: 0,
      formattedSize: "0 KB",
      metadata: {
        name: "",
        path: "",
        title: "",
        encoding: "",
        description: "",
        format: "",
        bytes: 0,
        mediatype: "",
        hash: "",
      },
      start: "",
      loaded: 0,
      success: false,
      error: false,
      loading: false,
      timeRemaining: 0,
      currentStep: 1,
      steps: [
        {
          class: "step-one",
          stepNumber: 1,
          description: "Edit Metadata",
          completed: false,
        },
        {
          class: "step-two",
          stepNumber: 2,
          description: "Edit Schema",
          completed: false,
        },
      ],
    };
  }

  onChangeHandler = async (event) => {
    let { formattedSize, metadata, selectedFile } = this.state;
    let { name, title, path, hash, format } = metadata;

    if (event.target.files.length > 0) {
      formattedSize = onFormatBytes(event.target.files[0].size);
      format = getFileExtension(event.target.files[0].name);
      title = onFormatTitle(event.target.files[0].name);
      name = onFormatName(event.target.files[0].name);
      path = event.target.files[0].name;
      selectedFile = event.target.files[0];
      const file = new FileAPI.HTML5File(selectedFile);
      hash = await file.sha256();
    }
    this.setState({
      selectedFile,
      loaded: 0,
      success: false,
      error: false,
      formattedSize,
      metadata: {
        name,
        path,
        title,
        encoding: "",
        description: "",
        format,
        bytes: selectedFile.size,
        mediatype: selectedFile.type,
        hash: `SHA256:${hash}`,
      },
      steps: [
        {
          class: "step-one",
          stepNumber: 1,
          description: "Edit Metadata",
          completed: false,
        },
        {
          class: "step-two",
          stepNumber: 2,
          description: "Edit Schema",
          completed: false,
        },
      ],
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
    const { selectedFile, metadata } = this.state;
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

    this.setState({
      metadata: { ...metadata },
      fileSize: file.size(),
      start,
      loading: true,
    });

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
      .then((response) =>
        this.setState({ success: response.success, loading: false })
      )
      .catch((error) => this.setState({ error: true, loading: false }));
  };


  handleChangeMetadata = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const { metadata } = this.state;

    this.setState({
      metadata: {
        ...metadata,
        [name]: value,
      },
    });
  };

  handleSubmitMetadata = (event, index) => {
    this.handleSaveStep(index);
    event.preventDefault();
    console.log("Metadata state: ", this.state.metadata);
  };

  handleSubmitSchema = (schema, index) => {
    this.handleSaveStep(index);
    console.log("Schema state: ", schema);
  };

  onChangeStep = (step) => {
    this.setState({ currentStep: step });
  };

  handleSaveStep = (index) => {
    let newSteps = [...this.state.steps];
    newSteps[index].completed = true;

    this.setState({ steps: newSteps });
  };

  render() {
    const {
      success,
      error,
      timeRemaining,
      selectedFile,
      formattedSize,
      metadata,
      loading,
      currentStep,
      steps,
    } = this.state;
    return (
      <div className="upload-wrapper">
        <div className="upload-header">
          <h2 className="upload-header__title">Datapub Upload</h2>
        </div>

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

        <div className="upload-stepper">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onChangeStep={this.onChangeStep}
          />
        </div>

        <div className="upload-edit-area">
          {currentStep === 1 && (
            <Metadata
              loading={loading}
              uploadSuccess={success}
              selectedFile={selectedFile}
              metadata={metadata}
              handleSubmit={this.handleSubmitMetadata}
              handleChange={this.handleChangeMetadata}
            />
          )}
          {currentStep === 2 && (
            <TableSchema
              uploadSuccess={success}
              {...Mock}
              handleSubmitSchema={this.handleSubmitSchema}
            />
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
  authzUrl: "http://localhost:5000/api/action/authz_authorize",
};

Upload.propTypes = {
  config: PropTypes.object.isRequired,
  scopes: PropTypes.object.isRequired,
  authzUrl: PropTypes.string.isRequired,
};

const Mock = {
  schema: {
    fields: [
      {
        title: "",
        name: "name",
        type: "string",
        description: "",
        format: "",
      },
      {
        title: "",
        name: "age",
        type: "integer",
        description: "",
        format: "",
      },
      {
        title: "",
        name: "address",
        type: "string",
        description: "",
        format: "",
      },
    ],
  },
  data: [
    { name: "Eathan Pritchard", age: 25, address: "1201 Tompkins Dr Madison" },
    { name: "Zidan Berg", age: 22, address: "1309 Tompkins Dr Madison" },
    { name: "Raisa Kinney", age: 32, address: "1497 Tompkins Dr Madison" },
    { name: "Cara Woodley", age: 30, address: "1197  Buckeye Rd  Madison" },
    { name: "Komal Robbins", age: 42, address: "1192  Buckeye Rd  Madison" },
    { name: "Deacon Childs", age: 28, address: "1027 Tompkins Dr Madison" },
    { name: "Ayse Shaw", age: 21, address: "1233 Buckeye Rd Madison" },
  ],
};

export default Upload;
