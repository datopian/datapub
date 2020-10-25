import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


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


export { ResourceEditor } from './App';