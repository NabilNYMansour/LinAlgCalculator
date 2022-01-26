export enum OP {
  Add,
  Sub,
  Multiply,
}

export const getOpSymbol = (operation: OP) => {
  switch (operation) {
    case OP.Add:
      return <div className="addbar" ><div className="addbar1"/><div className="addbar2"/></div>;
    case OP.Sub:
      return <div className="subbar"/>;
    case OP.Multiply:
      return <div className="mulbar" ><div className="addbar1"/><div className="addbar2"/></div>;
    default:
      return "None";
  }
};

export const getErrorMsg = (operation:OP) => {
  switch (operation) {
    case OP.Add:
      return "m and n of M1 is not equal to m and n of M2";
    case OP.Sub:
      return "m and n of M1 is not equal to m and n of M2";
    case OP.Multiply:
      return "m of M1 is not equal to n of M2";
    default:
      return "No Error";
  }
}