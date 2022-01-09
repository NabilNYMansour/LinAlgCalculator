import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Matrix } from "./matrix";

export const Calculator = () => {
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
  const [m3n, setM3N] = useState<number>(4);

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

  useEffect(() => {}, [m1m, m1n]);

  return (
    <div id="test" style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
          margin: "10px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "75px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <input
                style={{ width: m1m.toString().length + "ch" }}
                value={m1mString}
                type="number"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  event.target.value.length < 3 &&
                    Number(event.target.value) < 15 &&
                    setM1MString(event.target.value);
                  Number(event.target.value) < 15 &&
                    Number(event.target.value) > 0 &&
                    setM1M(Number(event.target.value));
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
                style={{ width: m1n.toString().length + "ch" }}
                value={m1nString}
                type="number"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  event.target.value.length < 3 &&
                    Number(event.target.value) < 15 &&
                    setM1NString(event.target.value);
                  Number(event.target.value) < 15 &&
                    Number(event.target.value) > 0 &&
                    setM1N(Number(event.target.value));
                }}
              />
            </div>
          </div>
          <Matrix
            numRows={m1m}
            numColumns={m1n}
            isInput={true}
            isDisabled={false}
            vals={m1vals}
            updateVals={updateM1Vals}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "100px",
          }}
        >
          OP
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "75px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <input
                style={{ width: m2m.toString().length + "ch" }}
                value={m2mString}
                type="number"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setM2MString(event.target.value);
                  Number(event.target.value) <= 15 &&
                    Number(event.target.value) > 0 &&
                    setM2M(Number(event.target.value));
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
                style={{ width: m2n.toString().length + "ch" }}
                value={m2nString}
                type="number"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setM2NString(event.target.value);
                  Number(event.target.value) <= 15 &&
                    Number(event.target.value) > 0 &&
                    setM2N(Number(event.target.value));
                }}
              />
            </div>
          </div>
          <Matrix
            numRows={m2m}
            numColumns={m2n}
            isInput={true}
            isDisabled={true}
            vals={m2vals}
            updateVals={updateM2Vals}
          />
        </div>
      </div>
      <div
        style={{ paddingTop: "50px", display: "flex", flexDirection: "column" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button>Calculate</button>
        </div>
        <Matrix
          numRows={m3m}
          numColumns={m3n}
          isInput={false}
          isDisabled={true}
          vals={m3vals}
          updateVals={updateM3Vals}
        />
      </div>
    </div>
  );
};
