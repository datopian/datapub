import React from "react";
import PropTypes from "prop-types";

import "./Metadata.css";
import encodeData from "../../db/encode.json";
import formatData from "../../db/resource_formats.json";

//TODO: add the custom fields as a props and render it in metadata component
const customFields = [
  {
    label: "Access Restriction",
    name: "restricted",
    input_type: "select",
    values: ['{"level": "public"}', '{"level": "private"}'],
    options: ["Public", "Private"],
  },
];

const Metadata = ({ metadata, handleChange }) => {
  return (
    <>
      <h3 className="metadata-name">{metadata.path || ""}</h3>
      <div className="metadata-form">
        <div className="metadata-input">
          <label className="metadata-label" htmlFor="title">
            Title:
          </label>
          <input
            className="metadata-input__input"
            type="text"
            name="title"
            id="title"
            value={metadata.title || metadata.name || ""}
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
            value={metadata.description || ""}
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
            required
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
            value={(metadata.format || "").toLowerCase()}
            onChange={handleChange}
            required
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
        {customFields &&
          customFields.map((item) => (
            <div key={`metadata-custom-${item.name}`} className="metadata-input">
              <label className="metadata-label" htmlFor="format">
                {item.label}:
              </label>
              <select
                className="metadata-input__input"
                name={item.name}
                id={item.name}
                value={metadata[item.name] || ""}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select...
                </option>
                {item.options.map((option, index) => (
                  <option
                    key={`${item.name}-${index}`}
                    value={item.values[index]}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
      </div>
    </>
  );
};

Metadata.propTypes = {
  metadata: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Metadata;
