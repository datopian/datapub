import React from "react";
import PropTypes from "prop-types";

import "./Metadata.css";
import encodeData from "../../db/encode.json";
import formatData from "../../db/resource_formats.json";

const Metadata = ({ metadata, handleChange, handleSubmit, uploadSuccess }) => {
  return (
    <>
      <h3 className="metadata-name">{metadata.path}</h3>
      <form className="metadata-form" onSubmit={(event) => handleSubmit(event, 0)}>
        <div className="metadata-input">
          <label className="metadata-label" htmlFor="title">
            Title:
          </label>
          <input
            className="metadata-input__input"
            type="text"
            name="title"
            id="title"
            value={metadata.title}
            onChange={handleChange}
          />
        </div>
        <div className="metadata-input">
          <label className="metadata-label" htmlFor="description">
            Description:
          </label>
          <input
            className="metadata-input__input"
            type="text"
            name="description"
            id="description"
            value={metadata.description}
            onChange={handleChange}
          />
        </div>
        <div className="metadata-input">
          <label className="metadata-label" htmlFor="encoding">
            Encoding:
          </label>
          <select
            className="metadata-input__input"
            name="encoding"
            id="encoding"
            value={metadata.encoding || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select...
            </option>
            {encodeData.map((item) => (
              <option key={`format-${item.value}`} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="metadata-input">
          <label className="metadata-label" htmlFor="format">
            Format:
          </label>
          <select
            className="metadata-input__input"
            name="format"
            id="format"
            value={metadata.format || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select...
            </option>
            {formatData.map((item) => (
              <option key={`format-${item[0]}`} value={item[0].toLowerCase()}>
                {item[0]}
              </option>
            ))}
          </select>
        </div>
        <button  disabled={!uploadSuccess} className="metadata-btn">Save and Publish</button>
      </form>
    </>
  );
};

Metadata.propTypes = {
  metadata: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  uploadSuccess: PropTypes.bool.isRequired,
};

export default Metadata;
