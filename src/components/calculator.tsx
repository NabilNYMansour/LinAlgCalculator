import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { OP, getOpSymbol, getErrorMsg } from "../enums";
import { addM, multiplyMM, subM } from "../lin-alg-js-lib/LinAlg";
import { Matrix } from "./matrix";

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

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "1px" }}></div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            flexGrow: "1",
          }}
        >
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              padding: "50px",
            }}
          >
            {getOpSymbol(selectedOp)}
          </div>
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
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            flexGrow: "1",
          }}
        >
          TEST
        </div>
      </div>
    </div>
    /* <div style={{ display: "flex", flexWrap: "wrap", justifyContent:"center", flexGrow:"1" }}> */
    // <div>
    //   <div style={{ display: "flex" }}>
    //     <div style={{ width: "1px" }}></div>
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "row",
    //         flexWrap: "wrap",
    //         margin: "10px",
    //       }}
    //     >
    //       <div>
    //         <Matrix
    //           numRows={m1m}
    //           numColumns={m1n}
    //           isInput={true}
    //           isDisabled={false}
    //           vals={m1vals}
    //           updateVals={updateM1Vals}
    //           m={m1m}
    //           n={m1n}
    //           mString={m1mString}
    //           nString={m1nString}
    //           setM={setM1M}
    //           setN={setM1N}
    //           setMString={setM1MString}
    //           setNString={setM1NString}
    //         />
    //       </div>
    //       <div // symbol
    //         style={{
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "space-around",
    //         }}
    //       >
    //         {getOpSymbol(selectedOp)}
    //       </div>
    //       <div>
    //         <Matrix
    //           numRows={m2m}
    //           numColumns={m2n}
    //           isInput={true}
    //           isDisabled={false}
    //           vals={m2vals}
    //           updateVals={updateM2Vals}
    //           m={m2m}
    //           n={m2n}
    //           mString={m2mString}
    //           nString={m2nString}
    //           setM={setM2M}
    //           setN={setM2N}
    //           setMString={setM2MString}
    //           setNString={setM2NString}
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div style={{ display: "flex" }}>
    //   <div style={{ width: "1px" }}></div>
    //   <div
    //     style={{
    //       paddingTop: "50px",
    //       display: "flex",
    //       alignContent: "center",
    //       flexDirection: "column",
    //     }}
    //   >
    //     <div // Calc button
    //       style={{ display: "flex", justifyContent: "center" }}
    //     >
    //       <button
    //         onClick={() => {
    //           if (checkError(selectedOp)) {
    //             setErrorFound(false);
    //             setShowError(false);
    //             setM3Vals(
    //               calculate(selectedOp).map((row) =>
    //                 row.map((val) => String(val))
    //               )
    //             );
    //             setM3M(m3vals.length);
    //             setM3N(m3vals[0].length);
    //           } else {
    //             setErrorFound(true);
    //             setShowError(true);
    //           }
    //         }}
    //       >
    //         Calculate
    //       </button>
    //     </div>
    //     <div style={{ display: "flex", justifyContent: "center" }}>
    //       <Matrix
    //         numRows={m3m}
    //         numColumns={m3n}
    //         isInput={false}
    //         isDisabled={true}
    //         vals={m3vals}
    //         updateVals={updateM3Vals}
    //         m={m3m}
    //         n={m3n}
    //         mString={m3mString}
    //         nString={m3nString}
    //         setM={setM3M}
    //         setN={setM3N}
    //         setMString={setM3MString}
    //         setNString={setM3NString}
    //       />
    //     </div>
    //     <div style={{ display: "flex", justifyContent: "center" }}>
    //       <button disabled={errorFound} onClick={() => setM1Vals(m3vals)}>
    //         Use Result
    //       </button>
    //     </div>
    //     <div // Error
    //       style={{
    //         display: "flex",
    //         justifyContent: "center",
    //         color: "#ff0033",
    //         padding: "10px",
    //       }}
    //     >
    //       {errorFound && showError ? getErrorMsg(selectedOp) + "!" : ""}
    //     </div>
    //     <div // Use Result
    //       style={{ display: "flex", justifyContent: "center" }}
    //     >
    //       {showError ? (
    //         <button onClick={() => setShowError(false)}>Got it</button>
    //       ) : (
    //         ""
    //       )}
    //     </div>
    //   </div>
    //   </div>
    // </div>
  );
};
