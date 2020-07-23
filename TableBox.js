/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

function usePrevious(value) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const TableBox = ({ table = [] }) => {
  const rows = table.length;
  const columns = table.reduce((prev, row) => Math.max(prev, row.length), 0);
  const tableBox = new Array(rows)
    .fill(1)
    .map((_, i) =>
      new Array(columns)
        .fill(1)
        .map((_, j) => (table[i][j] !== undefined ? table[i][j] : null))
    );

  const isUpdated = React.useCallback(
    (row, column) => {
      if (previousTable !== null) {
        return table[row][column] !== previousTable[row][column];
      }
      return false;
    },
    [table, previousTable]
  );

  const previousTable = usePrevious(table);
  const updatedStyle = css`
    background-color: pink;
    transition: background-color 400ms;
  `;

  return (
    <section
      css={css`
        display: grid;
        grid-template-columns: ${new Array(rows).fill("30px").join(" ")};
        grid-template-rows: ${new Array(columns).fill("30px").join(" ")};
        grid-gap: 3px;
      `}
    >
      {tableBox.map((row, rowId) =>
        row.map((value, columnId) => (
          <div
            key={`${rowId}-${columnId}]`}
            css={[
              css`
                border: solid black;
                border-width: 1px;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                  height: 16px;
                  font-size: 16px;
                }
              `,
              isUpdated(rowId, columnId) ? updatedStyle : null
            ]}
          >
            <span>{value}</span>
          </div>
        ))
      )}
    </section>
  );
};

export default TableBox;
