import React from 'react';
import ReactDOM from 'react-dom';
import App from './lib/App';

// Mount the ResourceEditor app explicitly
// (make sure you call the function after it's loaded)
function mountResourceEditorApp([elementId, config, resource] = ['root', {
  authToken: null,
  api: null,
  lfs: null,
  organizationId: null,
  datasetId: null,
  resourceId: null,
}, {}]) {
  ReactDOM.render(
    <React.StrictMode>
      <App config={config} resource={resource} />
    </React.StrictMode>,
    document.getElementById(elementId)
  );
};


// Automatically mount the app if an element with id='ResourceEditor' exists
const element = document.getElementById('ResourceEditor');
if (element) {
  const config = {
    datasetId: element.getAttribute('data-dataset-id'),
    api: element.getAttribute('data-api'),
    lfs: element.getAttribute('data-lfs'),
    authToken: element.getAttribute('data-auth-token'),
    organizationId: element.getAttribute('data-organization-id'),
    resourceId: element.getAttribute('data-resource-id')
  }

  ReactDOM.render(
    <React.StrictMode>
        <App
          config={config}
          resource={ element.getAttribute('data-resource')}
        />
    </React.StrictMode>,
    element
  );
}


export { ResourceEditor } from './lib/App';
