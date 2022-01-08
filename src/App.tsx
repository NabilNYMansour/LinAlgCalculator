import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { Calculator } from "./components/calculator";

function App() {
  const [opnavHide, setOpnavHide] = useState<boolean>(true);
  const [historynavHide, setHistorynavHide] = useState<boolean>(true);
  const isPhone = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    isPhone && opnavHide && historynavHide && setHistorynavHide(false);
  }, [isPhone, opnavHide, historynavHide]);

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
          }}
          className="opnav"
        >
          Longest possible word 1
        </div>
        <div className="calculator">
          <div style={{ flexGrow: "1" }}>
            <Calculator />
          </div>
        </div>
        <div
          style={{
            overflowY: "hidden",
            animationName: historynavHide
              ? "sidenavOpenAnimation"
              : "sidenavCloseAnimation",
          }}
          className="historynav"
        >
          Longest possible word 2
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: "#11270B",
          backgroundColor: "#71B340",
          alignItems: "center",
          fontSize: isPhone ? "0.75em" : "1.5em",
        }}
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
            <div className={opnavHide ? "change1" : "bar"}></div>
            <div className={opnavHide ? "change2" : "bar"}></div>
            <div className={opnavHide ? "change3" : "bar"}></div>
          </div>
          <div style={{ paddingLeft: "10px" }}>Select OP</div>
        </button>
        <div>
          {isPhone ? "Lin Alg Calculator" : "Linear Algebra Calculator"}{" "}
        </div>
        <button
          className="topnavbutton"
          onClick={() => {
            isPhone && setOpnavHide(false);
            setHistorynavHide(!historynavHide);
          }}
        >
          <div style={{ paddingRight: "10px" }}>History</div>
          <div>
            <div className={historynavHide ? "change1" : "bar"}/>
            <div className={historynavHide ? "change2" : "bar"}/>
            <div className={historynavHide ? "change3" : "bar"}/>
          </div>
        </button>
      </div>
    </div>
  );
}

export default App;
