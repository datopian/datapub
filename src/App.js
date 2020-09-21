import React from 'react';
import { Client } from "ckanClient";
import PropTypes from "prop-types";
import frictionlessCkanMapper from "frictionless-ckan-mapper-js";
import { v4 as uuidv4 } from 'uuid';

import Metadata from "./components/Metadata";
import TableSchema from "./components/TableSchema";
import Switcher from "./components/Switcher";
import Upload from './components/Upload'
import './App.css';
import { removeHyphen } from './utils';

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
      },
      client: null,
      isResourceEdit: false,
    };
    this.metadataHandler = this.metadataHandler.bind(this);
  }

 async componentDidMount() {
    const { config } = this.props;
    const { authToken, api, lfs, organizationId, datasetId, resourceId } = config;

    const client = new Client(
      `${authToken}`,
      `${organizationId}`,
      `${datasetId}`,
      `${api}`,
      `${lfs}`
    );

    //Check if the user is editing resource
    if (resourceId) {
      const resource = await client.action('resource_show', {id: resourceId});
      const resourceSchema = await client.action('resource_schema_show', {id: resourceId});
      const resourceSample = await client.action('resource_sample_show', {id: resourceId});
      
      let resourceCopy = resource.result
      let sampleCopy = []
     
      try {
        // push the values to an array
        for (const property in resourceSample.result) {
          sampleCopy.push(resourceSample.result[property])
        }
        // push sample as an array to be able to render in tableschema component
        resourceCopy.sample = sampleCopy
        resourceCopy.schema = resourceSchema.result
      } catch (e) {
        console.error(e);
        //generate empty values not to break the tableschema component
        resourceCopy.schema = {fields: []}
        resourceCopy.sample = []
      }

      return this.setState({
        client,
        resourceId,
        resource: resourceCopy,
        isResourceEdit: true
      })
    }

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
    let resourceCopy =  this.state.resource
    resourceCopy[name] = value

    this.setState({
      resource: resourceCopy,
    });
  };

  handleSubmitMetadata = async (index) => {

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
      let result = datasetMetadata.result;

      if (result.state == 'draft') {
        result.state = 'active';
        await client.action('package_update', result)
      }
    }

    // Redirect to dataset page
    return window.location.href=`/dataset/${this.state.datasetId}`; 
  };


  createResource = async (resource) => {
    const { client } = this.state;
    const { config } = this.props;
    const { organizationId, datasetId, resourceId } = config;

    const ckanResource = frictionlessCkanMapper.resourceFrictionlessToCkan(
        resource
      );
    
    //create a valid format from sample
    let data = {...ckanResource.sample}
    //delete sample because is an invalid format
    delete ckanResource.sample;    
    //generate an unique id for bq_table_name property
    let bqTableName = ckanResource.bq_table_name ? ckanResource.bq_table_name : uuidv4()
    // create a copy from ckanResource to add package_id, name, url, sha256,size, lfs_prefix, url, url_type
    // without this properties ckan-blob-storage doesn't work properly
    let ckanResourceCopy = {
      ...ckanResource,
      package_id: this.state.datasetId,
      name: resource.name || resource.title,
      sha256: resource.hash,
      size: resource.size,
      lfs_prefix: `${organizationId}/${datasetId}`,
      url: resource.name,
      url_type: "upload",
      bq_table_name: removeHyphen(bqTableName),
      sample: data
    }

    //Check if the user is editing resource, call resource_update and redirect to the dataset page
    if (resourceId) {
      ckanResourceCopy = {
        ...ckanResourceCopy,
        id: resourceId
      }
      await client.action("resource_update", ckanResourceCopy)

      return window.location.href=`/dataset/${datasetId}`
    }
    await client.action("resource_create", ckanResourceCopy).then(response => {
          this.onChangeResourceId(response.result.id)
        })
  }

  deleteResource = async () => {
    const { resource, client, datasetId } = this.state
    if (window.confirm("Are you sure to delete this resource?")) {
      await client.action("resource_delete", {id: resource.id})

      return window.location.href=`/dataset/${datasetId}`
    }
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

          <div className="upload-edit-area">
              <Metadata
                loading={loading}
                uploadSuccess={success}
                metadata={this.state.resource}
                handleChange={this.handleChangeMetadata}
                isResourceEdit={this.state.isResourceEdit}
                deleteResource={this.deleteResource}
                updateResource={this.createResource}
              />
              <TableSchema
                schema={this.state.resource.schema || {fields: []}}
                data={
                  this.state.resource.sample || []
                }
              />
              <button  disabled={!success} className="btn" onClick={this.handleSubmitMetadata}>Save and Publish</button>
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
