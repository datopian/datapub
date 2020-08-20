import React from "react";
import PropTypes from "prop-types";

import "./Metadata.css";
import encodeData from "../../db/encode.json";
import formatData from "../../db/resource_formats.json";
import licenseData from "../../db/licenses.json";

const Metadata = (props) => {
  const { metadata, handleChange, handleSubmit, isUploaded } = props;

  return (
    <>
      <h3 className="metadata-name">{metadata.path}</h3>
      <form className="metadata-form" onSubmit={handleSubmit}>
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
              Encode
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
            value={metadata.format || ""}
            onChange={handleChange}
          >
            {formatData.map((item) => (
              <option key={`format-${item[0]}`} value={item[2]}>
                {item[0]}
              </option>
            ))}
          </select>
        </div>
        <div className="metadata-input">
          <label className="metadata-label" htmlFor="license">
            License:
          </label>
          <select
            className="metadata-input__input"
            name="license"
            value={metadata.license || ""}
            onChange={handleChange}
          >
            {licenseData.map((item) => (
              <option key={`format-${item.value}`} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <input disabled={!isUploaded} className="metadata-btn" type="submit" value="Save Metadata" />
      </form>
    </>
  );
};

Metadata.propTypes = {
  metadata: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isUploaded: PropTypes.bool.isRequired,
}

export default Metadata;
