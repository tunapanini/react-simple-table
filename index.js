/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import ReactDOM from "react-dom";
import TableBox from "./TableBox";

const App = () => {
  const [table, setTable] = React.useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ]);
  const [tableString, setTableString] = React.useState(JSON.stringify(table));
  const updateTable = React.useCallback(
    tableStr => {
      try {
        const newTable = JSON.parse(tableStr);
        setTable(newTable);
      } catch (err) {
        console.error(err);
        setTableString(JSON.stringify(table));
      }
    },
    [setTable]
  );
  return (
    <div>
      <h1>TableBox</h1>
      <div
        css={css`
          display: flex;
          & > * {
            margin-right: 16px;
          }
        `}
      >
        <TableBox table={table} />
        <div>
          <textarea
            css={css`
              width: 120px;
              height: 120px;
            `}
            value={tableString}
            onChange={({ target: { value } }) => setTableString(value)}
          />
          <button onClick={() => updateTable(tableString)}>Update</button>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
