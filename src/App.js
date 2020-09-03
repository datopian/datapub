import React from 'react';
import Metadata from "./components/Metadata";
import TableSchema from "./components/TableSchema";
import Stepper from "./components/Stepper";
import './App.css';

import Upload from './components/Upload'

export class ResourceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetId: this.props.datasetId,
      resource: this.props.resource || {},
      ui: {
        fileOrLink: '',
        uploadComplete: undefined,
        success: false,
        error: false,
        loading: false,
        metadataOrSchema: 'metadata'
      }
    };
    this.metadataHandler = this.metadataHandler.bind(this);
  }

  metadataHandler(resource) {
    this.setState({
      resource
    })
  }

  handleChangeMetadata = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const { resource } = this.state;

    this.setState({
      resource: {
        ...resource,
        [name]: value,
      },
    });
  };

  handleSubmitMetadata = (event, index) => {
    event.preventDefault();
    console.log("Metadata state: ", this.state.resource);
  };

  handleSubmitSchema = (schema, index) => {
    console.log("Schema state: ", schema);
  };

  switcher = (name) => {
    const ui = {...this.state.ui}
    ui.metadataOrSchema = name
    this.setState({ui});
  };

  render() {
    const {
      loading,
      success,
      metadataOrSchema,
    } = this.state.ui;
    return (
      <div className="App">
        <div className="upload-wrapper">
          <div className="upload-header">
            <h2 className="upload-header__title">Resource Editor</h2>
          </div>

          <Upload resource={this.state.resource} metadataHandler={this.metadataHandler} />

          <div className="upload-stepper">
            <Stepper
              metadataOrSchema={metadataOrSchema}
              switcher={this.switcher}
            />
          </div>

          <div className="upload-edit-area">
            {metadataOrSchema === 'metadata' && (
              <Metadata
                loading={loading}
                uploadSuccess={success}
                metadata={this.state.resource}
                handleSubmit={this.handleSubmitMetadata}
                handleChange={this.handleChangeMetadata}
              />
            )}
            {metadataOrSchema === 'schema' && (
              <TableSchema
                uploadSuccess={success}
                {...Mock}
                handleSubmitSchema={this.handleSubmitSchema}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

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

export default ResourceEditor;
