import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const Matrix = ({
  numRows,
  numColumns,
  isInput,
  isDisabled,
  vals,
  updateVals,
  m,
  n,
  mString,
  nString,
  setM,
  setN,
  setMString,
  setNString,
}: {
  numRows: number;
  numColumns: number;
  isInput: boolean;
  isDisabled: boolean;
  vals: string[][];
  updateVals: (newVals: string[][]) => void;
  m: number;
  n: number;
  mString: string;
  nString: string;
  setM: (newVal: number) => void;
  setN: (newVal: number) => void;
  setMString: (newVal: string) => void;
  setNString: (newVal: string) => void;
}) => {
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);
  // const [vals, setVals] = useState<string[][]>([]);

  const [fillChar, setFillChar] = useState<string>("0");

  const updateRows = useCallback(
    (newRows: number) => {
      setRows(newRows);
    },
    [setRows]
  );

  const updateColumns = useCallback(
    (newColumns: number) => {
      setColumns(newColumns);
    },
    [setColumns]
  );

  const changeItem = (
    newItem: string,
    targetRowIndex: number,
    targetColumnIndex: number
  ) => {
    if (
      Number(newItem) ||
      Number(newItem) === 0 ||
      newItem === "" ||
      newItem === "-"
    ) {
      updateVals(
        vals.map((item, index) =>
          index === targetRowIndex
            ? item.map((num, jndex) =>
                jndex === targetColumnIndex ? newItem : num
              )
            : item
        )
      );
    }
  };

  const getMaxNumLength = (columnNum: number) => {
    let max = 4;
    vals.forEach((item) => {
      item.forEach((num, index) => {
        if (index === columnNum && max < num.toString().length)
          max = num.toString().length > 20 ? 20 : num.toString().length;
      });
    });
    return max;
  };

  const handleFillCharChange = (newChar: string) => {
    (Number(newChar) ||
      Number(newChar) === 0 ||
      newChar === "" ||
      newChar === "-") &&
      setFillChar(newChar);
  };

  const fillEmpty = (fillString: string) => {
    updateVals(
      vals.map((item) => item.map((num) => (num === "" ? fillString : num)))
    );
  };

  const makeIdentity = () => {
    numColumns === numRows
      ? updateVals(
          vals.map((item, i) => item.map((_, j) => (i === j ? "1" : "0")))
        )
      : console.log("Not a square matrix");
  };

  useEffect(() => {
    if (columns !== numColumns || rows !== numRows) {
      let newVals = vals.slice();
      columns < numColumns
        ? (newVals = vals.concat(new Array(numColumns - columns).fill([])))
        : (newVals = vals.slice(0, numColumns));
      newVals.map((item, i) => {
        item.length < numRows
          ? (newVals[i] = item.concat(
              new Array(numRows - item.length).fill("")
            ))
          : (newVals[i] = item.slice(0, numRows));
      });
      updateVals(newVals);
      updateColumns(numColumns);
      updateRows(numRows);
    }
  }, [
    rows,
    updateRows,
    updateVals,
    columns,
    updateColumns,
    numRows,
    numColumns,
  ]);

  const maxWidthColumns = vals.length
    ? vals[0].map((_, j) => getMaxNumLength(j))
    : [];

  return (
    <div>
      <div
        style={{
          padding: "10px",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isInput && <div // m by n
          style={{
            width: "75px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignSelf: "center",
          }}
        >
          <input
            style={{ width: m.toString().length + "ch" }}
            value={mString}
            type="number"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              event.target.value.length < 3 &&
                Number(event.target.value) < 15 &&
                setMString(event.target.value);
              Number(event.target.value) < 15 &&
                Number(event.target.value) > 0 &&
                setM(Number(event.target.value));
            }}
          />
          <div
            style={{
              width: "4ch",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            by
          </div>
          <input
            style={{ width: n.toString().length + "ch" }}
            value={nString}
            type="number"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              event.target.value.length < 3 &&
                Number(event.target.value) < 15 &&
                setNString(event.target.value);
              Number(event.target.value) < 15 &&
                Number(event.target.value) > 0 &&
                setN(Number(event.target.value));
            }}
          />
        </div>}
        <div // Matrix generator
          style={{ padding: "5px" }} 
        >
          {vals.map((item, i) => (
            <div style={{ display: "flex" }} key={i}>
              {item.map((num, j) => (
                <div style={{ flexWrap: "wrap", justifyContent:"center" }} key={j}>
                  <input
                    style={{
                      maxWidth: maxWidthColumns[j] + "ch",
                      margin: "1px",
                    }}
                    value={num}
                    type="text"
                    disabled={!isInput || isDisabled}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      changeItem(event.target.value, i, j);
                    }}
                  ></input>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {isInput && (
        <button
          disabled={isDisabled}
          onClick={() => updateVals(vals.map((item) => item.fill("")))}
        >
          Clear
        </button>
      )}
      {isInput && (
        <button
          style={{ margin: "2px" }}
          disabled={isDisabled}
          onClick={() => updateVals(vals.map((item) => item.fill("0")))}
        >
          Zeros
        </button>
      )}
      {isInput && (
        <button disabled={isDisabled} onClick={() => makeIdentity()}>
          Identity
        </button>
      )}
      {isInput && (
        <div>
          <button
            style={{ marginRight: "2px" }}
            disabled={isDisabled}
            onClick={() => {
              fillEmpty(fillChar);
            }}
          >
            Fill empty with
          </button>
          <input
            value={fillChar}
            disabled={isDisabled}
            style={{
              maxWidth:
                fillChar.length > 0
                  ? fillChar.length > 4
                    ? "4ch"
                    : fillChar.length + "ch"
                  : "1ch",
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleFillCharChange(event.target.value);
            }}
          ></input>
        </div>
      )}
    </div>
  );
};
