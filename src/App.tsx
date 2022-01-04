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
  }, [isPhone]);

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
        <div
          style={{ overflowY: isPhone ? "visible" : "scroll" }}
          className="calculator"
        >
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
          backgroundColor: "aqua",
        }}
        className="topnav"
      >
        <button
          onClick={() => {
            isPhone && setHistorynavHide(false);
            setOpnavHide(!opnavHide);
          }}
        >
          Select OP
        </button>
        <div>Linear Alegbra Calculator</div>
        <button
          onClick={() => {
            isPhone && setOpnavHide(false);
            setHistorynavHide(!historynavHide);
          }}
        >
          History
        </button>
      </div>
    </div>
  );
}

export default App;
