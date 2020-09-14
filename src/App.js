import React from 'react';
import Metadata from "./components/Metadata";
import TableSchema from "./components/TableSchema";
import Switcher from "./components/Switcher";
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

          <div className="upload-switcher">
            <Switcher
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
                schema={this.state.resource.schema || {fields: []}}
                data={
                  this.state.resource.sample ||
                  this.state.resource._values ||
                  this.state.resource.data || []
                }
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ResourceEditor;
