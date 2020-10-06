import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTable } from "react-table";
import types from "../../db/types.json";

import "./TableSchema.css";

const TableSchema = (props) => {
  const [schema, setSchema] = useState(props.schema);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = React.useMemo(() => [...props.data], [schema]);

  const columnsSchema = schema.fields.map((item, index) => {
    return { Header: item.name ? item.name : `column_${index + 1}`, accessor: item.name ? item.name : `column_${index + 1}`};
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = React.useMemo(() => [...columnsSchema], [schema]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const handleChange = (event, key, index) => {
    const newSchema = {...schema};
    newSchema.fields[index][key] = event.target.value;
    setSchema(newSchema);
  };

  //if the the user upload a new file, will update the state
  //and render with the new values
  useEffect( () => { 
    setSchema(props.schema);
  }, [ props.schema ] );

  const renderEditSchemaField = (key) => {
    if (key === "type") {
      return schema.fields.map((item, index) => (
        <td key={`schema-type-field-${key}-${index}`}>
          <select
            className="table-tbody-select"
            value={item[key] || ""}
            onChange={(event) => handleChange(event, key, index)}
          >
            {types.type.map((item, index) => {
              return (
                <option
                  key={`schema-type-field-option-${item}-${index}`}
                  value={item}
                >
                  {item}
                </option>
              );
            })}
          </select>
        </td>
      ));
    }
    return schema.fields.map((item, index) => (
      <td key={`schema-field-${key}-${index}`}>
        <input
          className="table-tbody-input"
          type="text"
          value={item[key]}
          onChange={(event) => handleChange(event, key, index)}
        />
      </td>
    ));
  };

  return (
    <>
      <div className="table-container">
        <div className="table-schema-help">
          <div className="table-schema-help_row">Title</div>
          <div className="table-schema-help_row">Description</div>
          <div className="table-schema-help_row">Type</div>
          <div className="table-schema-help_row">Format</div>
        </div>
        <div className="table-schema-info">
          <table className="table-schema-info_table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  className="table-thead-tr"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <th className="table-thead-th" {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              <tr className="table-tbody-tr-help">
                {renderEditSchemaField("title")}
              </tr>
              <tr className="table-tbody-tr-help">
                {renderEditSchemaField("description")}
              </tr>
              <tr>{renderEditSchemaField("type")}</tr>
              <tr>{renderEditSchemaField("format")}</tr>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className="table-tbody-td">
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

TableSchema.propTypes = {
  schema: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default TableSchema;
