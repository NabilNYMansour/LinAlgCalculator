import { useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { Calculator } from "./components/calculator";
import { OP } from "./enums";
import GitHub from "@mui/icons-material/GitHub";
import { test } from "./lin-alg-js-lib/LinAlg";

function App() {
  const [opnavHide, setOpnavHide] = useState<boolean>(true);
  const [historynavHide, setHistorynavHide] = useState<boolean>(false);
  const isPhone = useMediaQuery("(max-width: 600px)");
  const topnavRef = useRef<HTMLDivElement>(null);
  const [topnavRefHeight, setTopnavRefHeight] = useState<number>(32);
  const [selectedOp, setSelectedOp] = useState<OP>(OP.Add);

  useEffect(() => {
    isPhone && opnavHide && historynavHide && setHistorynavHide(false);
    topnavRef.current && setTopnavRefHeight(topnavRef.current.clientHeight);
  }, [isPhone, opnavHide, historynavHide, topnavRef]);

  const getHighlight = useCallback(
    (operation: OP) => (selectedOp === operation ? "#DDA15E" : "#606C38"),
    [selectedOp]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 4,
        height: "100%",
      }}
    >
      <div
        style={{
          marginTop: topnavRefHeight + "px",
        }}
      >
        <div style={{ flexGrow: "1" }}>
          <Calculator selectedOp={selectedOp} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            animationName: opnavHide
              ? "sidenavOpenAnimation"
              : "sidenavCloseAnimation",
            flexShrink: "0",
            minHeight: "calc(100vh - " + topnavRefHeight + "px)",
            top: topnavRefHeight + "px",
          }}
          className="opnav"
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              onClick={() => setSelectedOp(OP.Add)}
              style={{ borderColor: getHighlight(OP.Add) }}
              className="op-button"
            >
              Add
            </button>
            <button
              onClick={() => setSelectedOp(OP.Sub)}
              style={{ borderColor: getHighlight(OP.Sub) }}
              className="op-button"
            >
              Sub
            </button>
            <button
              onClick={() => setSelectedOp(OP.Multiply)}
              style={{
                borderColor: getHighlight(OP.Multiply),
              }}
              className="op-button"
            >
              Multiply
            </button>
          </div>
        </div>
        {/* <div
          style={{
            animationName: historynavHide
              ? "sidenavOpenAnimation"
              : "sidenavCloseAnimation",
            minHeight: "calc(100vh - " + topnavRefHeight + "px)",
            top: topnavRefHeight + "px",
          }}
          className="historynav"
        >
          Longest possible word 2
        </div> */}
      </div>
      <div
        style={{
          fontSize: isPhone ? "0.75em" : "1.5em",
        }}
        ref={topnavRef}
        className="topnav"
      >
        <button
          className="topnavbutton"
          onClick={() => {
            isPhone && setHistorynavHide(false);
            setOpnavHide(!opnavHide);
          }}
        >
          <div>
            <div className={opnavHide ? "change1" : "bar"} />
            <div className={opnavHide ? "change2" : "bar"} />
            <div className={opnavHide ? "change3" : "bar"} />
          </div>
          <div style={{ paddingLeft: "10px" }}>Select OP</div>
        </button>
        <div>{isPhone ? "" : "Linear Algebra Calculator"}</div>
        {/* <button
          className="topnavbutton"
          onClick={() => {
            isPhone && setOpnavHide(false);
            setHistorynavHide(!historynavHide);
          }}
        >
          <div style={{ paddingRight: "10px" }}>History</div>
          <div>
            <div className={historynavHide ? "change1" : "bar"} />
            <div className={historynavHide ? "change2" : "bar"} />
            <div className={historynavHide ? "change3" : "bar"} />
          </div>
        </button> */}
        <div>
          <form action="https://github.com/NabilNYMansour/LinAlgCalculator">
            <a href="https://github.com/NabilNYMansour/LinAlgCalculator">
              <button
                type="submit"
                style={{ paddingRight: "10px" }}
                className="topnavbutton"
              >
                <GitHub fontSize="large" />
              </button>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
