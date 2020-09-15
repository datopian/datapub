import React from 'react';
import { Client } from "ckanClient";
import PropTypes from "prop-types";

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
      },
      client: null
    };
    this.metadataHandler = this.metadataHandler.bind(this);
  }

  componentWillMount() {
    const { config } = this.props;
    const { authToken, api, organizationId, datasetId } = config;

    const client = new Client(
      `${authToken}`,
      `${organizationId}`,
      `${datasetId}`,
      `${api}`
    );
    this.setState({client})
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

    const { resource, client } = this.state;
    // create new resource variable and delete _values
    const newResource = resource
    delete newResource.sample

    client.push(newResource)
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

          <Upload client={this.state.client} resource={this.state.resource} metadataHandler={this.metadataHandler} />

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
                  this.state.resource.sample || []
                }
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * If the parent component doesn't specify a `config` and scope prop, then
 * the default values will be used.
 * */
 ResourceEditor.defaultProps = {
  config: {
    authToken: "be270cae-1c77-4853-b8c1-30b6cf5e9878",
    api: "http://localhost:5000",
    organizationId: "myorg",
    datasetId: "data-test-2",
  },
};

ResourceEditor.propTypes = {
  config: PropTypes.object.isRequired,
};

export default ResourceEditor;
