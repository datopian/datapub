import React from 'react';
import { Client } from "ckanClient";
import PropTypes from "prop-types";
import frictionlessCkanMapper from "frictionless-ckan-mapper-js";
import { v4 as uuidv4 } from 'uuid';
import data from "data.js";

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
        metadataOrSchema: 'metadata'
      },
      client: null,
      isResourceEdit: null,
    };
    this.metadataHandler = this.metadataHandler.bind(this);
  }

 async componentWillMount() {
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
      let resource;
      let schema;
      let sample;
      let sampleCopy = []
      try {
        // try to parse to json the schema and sample to be able to use in tableschema component
        resource = await client.action('resource_show', {id: resourceId});
        schema = JSON.parse(resource.result.schema.replace(/u'?'/g, "'").replace(/'/g,'"').replace(/\W"\W/g, '[]'))
        sample = JSON.parse(resource.result.sample.replace(/u'?'/g, "'").replace(/'/g,'"').replace(/\W"\W/g, '[]'))
        // push the values to an array
        for (const property in sample) {
          sampleCopy.push(sample[property])
        }
        // push converted values to schema and sample
        resource.result.schema = schema
        resource.result.sample = sampleCopy
      } catch (e) {
        console.error(e);
        //generate an empty values not to break the tableschema component
        resource.result.schema = {fields: []}
        resource.result.sample = []
      }

      return this.setState({
        client,
        resourceId,
        resource: resource.result,
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
    const { organizationId, datasetId } = config;

    const ckanResource = frictionlessCkanMapper.resourceFrictionlessToCkan(
        resource
      );
    
    //create a valid format from sample
    let data = {...ckanResource.sample}
    //delete sample because is an invalid format
    delete ckanResource.sample;    
    //generate an unique id for bq_table_name property
    let bqTableName = uuidv4()
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

    await  client.action("resource_create", ckanResourceCopy).then(response => {
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
