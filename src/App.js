import React from 'react';
import { Client } from "ckanClient";
import PropTypes from "prop-types";
import frictionlessCkanMapper from "frictionless-ckan-mapper-js";

import Metadata from "./components/Metadata";
import TableSchema from "./components/TableSchema";
import Switcher from "./components/Switcher";
import './App.css';

import Upload from './components/Upload'

export class ResourceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetId: this.props.config.datasetId,
      resourceId: "",
      resource: this.props.resource || {},
      ui: {
        fileOrLink: '',
        uploadComplete: undefined,
        success: false,
        error: false,
        loading: false,
        metadataOrSchema: 'metadata'
      },
      client: null,
      redirect: false
    };
    this.metadataHandler = this.metadataHandler.bind(this);
  }

  componentWillMount() {
    const { config } = this.props;
    const { authToken, api, lfs, organizationId, datasetId } = config;

    const client = new Client(
      `${authToken}`,
      `${organizationId}`,
      `${datasetId}`,
      `${api}`,
      `${lfs}`
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

  handleSubmitMetadata = async (event, index) => {
    event.preventDefault();

    const { resource, client } = this.state;

    await this.createResource(resource)
  
    // Change state of dataset to active if draft atm
    // this relates to how CKAN v2 has a phased dataset creation. See e.g.
    // https://github.com/ckan/ckan/blob/master/ckan/controllers/package.py#L917

    // only need to do this test if in resource create mode if editing a
    // resource this is unnecessary
    // TODO: update this in future to check for edit mode
    const isResourceCreate = true;
    if (isResourceCreate) {
      const datasetMetadata = await client.action('package_show', {id: this.state.datasetId});
      if (datasetMetadata.state == 'draft') {
        datasetMetadata.state = 'active';
        await client.action('package_update', datasetMetadata)
      }
    }

    // TODO: redirect to dataset page
  };


  createResource = async (resource) => {
    const { client } = this.state;

    const ckanResource = frictionlessCkanMapper.resourceFrictionlessToCkan(
        resource
      );

    delete ckanResource.sample;

    await  client.action(
        "resource_create",
        Object.assign(ckanResource, {
          package_id: this.state.datasetId,
        })).then(response => {
          this.onChangeResourceId(response.result.id)
        })
    
  }

  switcher = (name) => {
    const ui = {...this.state.ui}
    ui.metadataOrSchema = name
    this.setState({ui});
  };

  handleUploadStatus = (status) => {
    const { ui } = this.state;
    const newUiState = {
      ...ui,
      success: status.success,
      error: status.error,
      loading: status.loading,
    }

    this.setState({ui: newUiState})
  }

  onChangeResourceId = (resourceId) => {
    this.setState({resourceId})
  }
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

          <Upload
            client={this.state.client}
            resource={this.state.resource}
            metadataHandler={this.metadataHandler}
            datasetId={this.state.datasetId}
            handleUploadStatus={this.handleUploadStatus}
            onChangeResourceId={this.onChangeResourceId}
          />

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
    lfs: "http://localhost:5001", // Feel free to modify this
    organizationId: "myorg",
    datasetId: "data-test-2",
  },
};

ResourceEditor.propTypes = {
  config: PropTypes.object.isRequired,
};

export default ResourceEditor;
