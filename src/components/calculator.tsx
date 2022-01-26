import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { OP, getOpSymbol, getErrorMsg } from "../enums";
import { addM, multiplyMM, subM } from "../lin-alg-js-lib/LinAlg";
import { Matrix } from "./matrix";
import "../App.css";

export const Calculator = ({ selectedOp }: { selectedOp: OP }) => {
  const [m1vals, setM1Vals] = useState<string[][]>([]);
  const [m1m, setM1M] = useState<number>(4);
  const [m1mString, setM1MString] = useState<string>("4");
  const [m1n, setM1N] = useState<number>(4);
  const [m1nString, setM1NString] = useState<string>("4");

  const [m2vals, setM2Vals] = useState<string[][]>([]);
  const [m2m, setM2M] = useState<number>(4);
  const [m2mString, setM2MString] = useState<string>("4");
  const [m2n, setM2N] = useState<number>(4);
  const [m2nString, setM2NString] = useState<string>("4");

  const [m3vals, setM3Vals] = useState<string[][]>([]);
  const [m3m, setM3M] = useState<number>(4);
  const [m3mString, setM3MString] = useState<string>("4");
  const [m3n, setM3N] = useState<number>(4);
  const [m3nString, setM3NString] = useState<string>("4");

  const [errorFound, setErrorFound] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const updateM1Vals = useCallback(
    (newVals: string[][]) => {
      setM1Vals(newVals);
    },
    [m1vals, setM1Vals]
  );

  const updateM2Vals = useCallback(
    (newVals: string[][]) => {
      setM2Vals(newVals);
    },
    [m2vals, setM2Vals]
  );

  const updateM3Vals = useCallback(
    (newVals: string[][]) => {
      setM3Vals(newVals);
    },
    [m3vals, setM3Vals]
  );

  const calculate = useCallback(
    (operation: OP) => {
      switch (operation) {
        case OP.Add:
          return addM(
            m1vals.map((row) => row.map((val) => Number(val))),
            m2vals.map((row) => row.map((val) => Number(val)))
          );
        case OP.Sub:
          return subM(
            m1vals.map((row) => row.map((val) => Number(val))),
            m2vals.map((row) => row.map((val) => Number(val)))
          );
        case OP.Multiply:
          return multiplyMM(
            m1vals.map((row) => row.map((val) => Number(val))),
            m2vals.map((row) => row.map((val) => Number(val)))
          );
        default:
          return [];
      }
    },
    [m1vals, m2vals]
  );

  const checkError = useCallback(
    (operation: OP) => {
      switch (operation) {
        case OP.Add:
          return m1m === m2m && m1n === m2n;
        case OP.Sub:
          return m1m === m2m && m1n === m2n;
        case OP.Multiply:
          return m1m === m2n;
        default:
          return true;
      }
    },
    [m1m, m2m, m1n, m2n]
  );

  const onClickCalculate = useCallback(async () => {
    console.clear();
    console.log(selectedOp);

    if (checkError(selectedOp)) {
      setErrorFound(false);
      setShowError(false);
      await setM3Vals(
        calculate(selectedOp).map((row) => row.map((val) => String(val)))
      );
      setM3M(m3vals.length);
      setM3N(m3vals[0].length);
    } else {
      setErrorFound(true);
      setShowError(true);
    }
  }, [
    calculate,
    checkError,
    setErrorFound,
    setShowError,
    selectedOp,
    setM3Vals,
    m3vals,
  ]);

  const onClickUseResult = useCallback(() => {
    setM1Vals(m3vals);
    setM1M(m3m);
    setM1N(m3n);
    setM1MString(m3mString);
    setM1NString(m3nString);
  }, [
    setM1Vals,
    setM1M,
    setM1N,
    setM1MString,
    setM1NString,
    m3vals,
    m3m,
    m3n,
    m3mString,
    m3nString,
  ]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "1px" }}></div>
        <div className="calculator-row">
          <div>
            <Matrix
              numRows={m1m}
              numColumns={m1n}
              isInput={true}
              isDisabled={false}
              vals={m1vals}
              updateVals={updateM1Vals}
              m={m1m}
              n={m1n}
              mString={m1mString}
              nString={m1nString}
              setM={setM1M}
              setN={setM1N}
              setMString={setM1MString}
              setNString={setM1NString}
            />
          </div>
          <div className="calculator-symbol">{getOpSymbol(selectedOp)}</div>
          <div>
            <Matrix
              numRows={m2m}
              numColumns={m2n}
              isInput={true}
              isDisabled={false}
              vals={m2vals}
              updateVals={updateM2Vals}
              m={m2m}
              n={m2n}
              mString={m2mString}
              nString={m2nString}
              setM={setM2M}
              setN={setM2N}
              setMString={setM2MString}
              setNString={setM2NString}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "1px" }}></div>
        <div
          className="calculator-row"
          style={{ flexDirection: "column", alignItems: "center" }}
        >
          <div className="calculator-button">
            <button onClick={onClickCalculate}>Calculate</button>
          </div>
          <div>
            <Matrix
              numRows={m3m}
              numColumns={m3n}
              isInput={false}
              isDisabled={true}
              vals={m3vals}
              updateVals={updateM3Vals}
              m={m3m}
              n={m3n}
              mString={m3mString}
              nString={m3nString}
              setM={setM3M}
              setN={setM3N}
              setMString={setM3MString}
              setNString={setM3NString}
            />
          </div>
          <div className="calculator-button">
            <button disabled={errorFound} onClick={() => onClickUseResult()}>
              Use Result
            </button>
          </div>
          <div className="calculator-error">
            {errorFound ? getErrorMsg(selectedOp) + "!" : ""}
          </div>
          {errorFound && <button onClick={() => setErrorFound(false)}>Got it</button>}
        </div>
      </div>
    </div>
  );
};
