import React from "react";
import PropTypes from "prop-types";

import "./Metadata.css";
import encodeData from '../../db/encode.json';

const Metadata = (props) => {
  const { metadata, handleChange, handleSubmit } = props;
  const listOfFormat = ['xls','csv', 'html']
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="metadata-name">{metadata.path}</h3>
      <div className="metadata-input">
        <label className="metadata-label"  htmlFor="title">
          Title:
        </label>
        <input className="metadata-input__input" type="text" name="title" id="title" value={metadata.title} onChange={handleChange}/>
      </div>
      <div className="metadata-input">
        <label className="metadata-label" htmlFor="description">
          Description:
        </label>
        <input className="metadata-input__input" type="text" name="description" id="description" value={metadata.description} onChange={handleChange}/>
      </div>
      <div className="metadata-input">
        <label className="metadata-label" htmlFor="encoding">
          Encoding:
        </label>
        <select className="metadata-input__input" name="encoding" id="encoding" value={metadata.encoding || ""} onChange={handleChange}>
          <option value='' disabled>Encode</option>
          {encodeData.map(item => <option key={`format-${item.value}`} value={item.value} >{item.label}</option>)}
        </select>
      </div>
      <div className="metadata-input">
        <label className="metadata-label" htmlFor="format">
          Format:
        </label>
        <select className="metadata-input__input" name="format" value={metadata.format || ""} onChange={handleChange}>
          {listOfFormat.map(item => <option key={`format-${item}`} value={item} >{item}</option>)}
        </select>
      </div>
      <input type="submit" value="Save Metadata" />
    </form>
  );
};

Metadata.propTypes = {
  metadata: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Metadata;
