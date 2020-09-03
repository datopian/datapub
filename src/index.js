import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


// Mount the ResourceEditor app explicitly
// (make sure you call the function after it's loaded)
function mountResourceEditorApp([elementId, datasetId] = ['root', undefined]) {
  if (!datasetId) {
    throw Error('Dataset id is required.')
  }

  ReactDOM.render(
    <React.StrictMode>
      <App datasetId={datasetId} />
    </React.StrictMode>,
    document.getElementById(elementId)
  );
};


// Automatically mount the app if an element with id='ResourceEditor' exists
const element = document.getElementById('ResourceEditor');
if (element) {
  ReactDOM.render(
    <React.StrictMode>
      <App
        datasetId={ element.getAttribute('data-dataset-id') }
        resource={ element.getAttribute('data-resource')}
      />
    </React.StrictMode>,
    element
  );
}


export { ResourceEditor } from './App';
