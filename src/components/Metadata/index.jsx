import React from "react";
import PropTypes from "prop-types";

import "./Metadata.css";

const Metadata = (props) => {
  const { metadata, handleChange, handleSubmit } = props;
  const listOfFormat = ['xls','csv', 'html']
  
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="metadata-label">{metadata.path}</h3>
      <label className="metadata-label">
        Title:
        <input type="text" name="title" id="title" value={metadata.title} onChange={handleChange}/>
      </label>
      <br />
      <label className="metadata-label">
        Description:
        <input type="text" name="description" id="description" value={metadata.description} onChange={handleChange}/>
      </label>
      <br />

      <label className="metadata-label">
        Encoding:
        <input type="text" name="encoding" id="encoding" value={metadata.encode} onChange={handleChange}/>
      </label>
      <br />

      <label className="metadata-label">
        Format:
        <select name="format" value={metadata.format || ""} onChange={handleChange}>
          {listOfFormat.map(item => <option key={`format-${item}`} value={item} >{item}</option>)}
        </select>
      </label>
      <br/>
      <input type="submit" value="send" />
    </form>
  );
};

Metadata.propTypes = {
  metadata: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Metadata;
