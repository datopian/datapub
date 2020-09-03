import React from 'react';
import './App.css';

import Upload from './components/Upload'

export class ResourceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetId: this.props.datasetId
    };
  }

  render() {
    return (
      <div className="App">
        <Upload/>
      </div>
    );
  }
}

export default ResourceEditor;
