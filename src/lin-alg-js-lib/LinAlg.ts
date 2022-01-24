import { clear } from "console";

// Vectors (considered as an array)
export const addV = (vec1: number[], vec2: number[]) => {
  return vec1.map((item, i) => item + vec2[i]);
};

export const subV = (vec1: number[], vec2: number[]) => {
  return vec1.map((item, i) => item - vec2[i]);
};

export const straightMulV = (vec1: number[], vec2: number[]) => {
  return vec1.map((item, i) => item * vec2[i]);
};

export const straightDivV = (vec1: number[], vec2: number[]) => {
  return vec1.map((item, i) => item / vec2[i]);
};

export const dotProduct = (vec1: number[], vec2: number[]) => {
  return vec1.reduce((cur, next, i) => cur + next * vec2[i], 0);
};

export const scalarMulV = (vec1: number[], scalar: number) => {
  return vec1.map((item) => item * scalar);
};

export const magnitudeOf = (vec: number[]) => {
  return Math.sqrt(vec.reduce((cur, next) => cur + Math.pow(next, 2), 0));
};

export const unitVecOf = (vec: number[]) => {
  const mag = magnitudeOf(vec);
  return vec.map((item) => item / mag);
};

export const crossProduct = (vec1: number[], vec2: number[]) => {
  return [
    vec1[1] * vec2[2] - vec1[2] * vec2[1],
    vec1[2] * vec2[0] - vec1[0] * vec2[2],
    vec1[0] * vec2[1] - vec1[1] * vec2[0],
  ];
};

export const angleSeperate = (vec1: number[], vec2: number[]) => {
  return (
    (Math.acos(
      dotProduct(vec1, vec2) / (magnitudeOf(vec1) * magnitudeOf(vec2))
    ) *
      180) /
    Math.PI
  );
};

// Matrix:

export const addM = (mat1: number[][], mat2: number[][]) => {
  return mat1.map((row, i) => row.map((item, j) => item + mat2[i][j]));
};

export const subM = (mat1: number[][], mat2: number[][]) => {
  return mat1.map((row, i) => row.map((item, j) => item + mat2[i][j]));
};

export const straightMulM = (mat1: number[][], mat2: number[][]) => {
  return mat1.map((row, i) => row.map((item, j) => item * mat2[i][j]));
};

export const straightDivM = (mat1: number[][], mat2: number[][]) => {
  return mat1.map((row, i) => row.map((item, j) => item / mat2[i][j]));
};

export const scalarMulM = (mat1: number[][], scalar: number) => {
  return mat1.map((row) => row.map((item) => item * scalar));
};

export const multiplyMV = (mat: number[][], vec: number[]) => {
  return mat.map((row) => dotProduct(row, vec));
};

export const multiplyMM = (mat1: number[][], mat2: number[][]) => {
  let res: number[][] = [];
  for (let i = 0; i < mat1.length; i++) {
    res[i] = new Array(mat2[0].length);
  }
  let mat2T = transposeOf(mat2);

  for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < res[0].length; j++) {
      res[i][j] = dotProduct(mat1[i], mat2T[j]);
    }
  }

  return res;
};

export const transposeOf = (mat: number[][]) => {
  let res: number[][] = [];
  for (let i = 0; i < mat[0].length; i++) {
    res[i] = new Array(mat.length);
  }
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      res[j][i] = mat[i][j];
    }
  }
  return res;
};

export const diagonalOf = (mat: number[][]) => {
  let res: number[] = [];
  mat.forEach((_, i) => {
    res.push(mat[i][i]);
  });
  return res;
};

enum Triangular {
  Upper,
  Lower,
  Diagonal,
  Not,
}

export const triangularOf = (mat: number[][]) => {
  let [isUpper, isLower] = [true, true];

  const diag = diagonalOf(mat);
  for (let i = 0; i < diag.length; i++) {
    if (diag[i] === 0) {
      return Triangular.Not;
    }
  }

  for (let i = 0; i < mat.length; ++i) {
    for (let j = 1 + i; j < mat[0].length; ++j) {
      if (mat[i][j] !== 0) {
        isUpper = false;
        break;
      }
    }
  }
  for (let i = 0; i < mat.length; ++i) {
    for (let j = 0; j < i; ++j) {
      if (mat[i][j] !== 0) {
        isLower = false;
        break;
      }
    }
  }

  if (isLower && isUpper) {
    return Triangular.Diagonal;
  } else if (isUpper) {
    return Triangular.Upper;
  } else if (isLower) {
    return Triangular.Lower;
  } else {
    return Triangular.Not;
  }
};

export const powerOf = (mat: number[][], power: number) => {
  if (power === 1) {
    return mat;
  }
  let res: number[][] = [];
  if (triangularOf(mat) === Triangular.Diagonal) {
    for (let i = 0; i < mat.length; ++i) {
      res[i][i] = Math.pow(mat[i][i], power);
    }
    return res;
  } else {
    res = powerOf(mat, power - 1);
    return multiplyMM(mat, res);
  }
};

export const leadingOf = (mat: number[][], rowNum: number) => {
  for (let i = 0; i < mat[0].length; ++i) {
    if (mat[rowNum][i] !== 0) {
      return mat[rowNum][i];
    }
  }
};

export const leadingIndexOf = (mat: number[][], rowNum: number) => {
  for (let i = 0; i < mat[0].length; ++i) {
    if (mat[rowNum][i] !== 0) {
      return i;
    }
  }
};

export const isZeroRow = (mat: number[][], rowNum: number) => {
  for (let i = 0; i < mat[0].length; ++i) {
    if (mat[rowNum][i] !== 0) {
      return false;
    }
  }
  return true;
};

export const rowOperationS = (
  mat: number[][],
  scalar: number,
  rowNum: number
) => {
  return mat.map((row, i) =>
    i === rowNum ? row.map((item) => item * scalar) : row
  );
};

export const rowOperationR = (
  mat: number[][],
  rowNum: number,
  otherRowNum: number,
  op: string
) => {
  if (op === "+") {
    return mat.map((row, i) =>
      i === rowNum ? row.map((item, j) => item + mat[otherRowNum][j]) : row
    );
  } else if (op === "-") {
    return mat.map((row, i) =>
      i === rowNum ? row.map((item, j) => item - mat[otherRowNum][j]) : row
    );
  }
};

export const rowOperationRS = (
  mat: number[][],
  scalar: number,
  rowNum: number,
  otherRowNum: number,
  op: string
) => {
  if (op === "+") {
    return mat.map((row, i) =>
      i === rowNum
        ? row.map((item, j) => item * scalar + mat[otherRowNum][j])
        : row
    );
  } else if (op === "-") {
    return mat.map((row, i) =>
      i === rowNum
        ? row.map((item, j) => item * scalar - mat[otherRowNum][j])
        : row
    );
  }
};

// Get rank is next

export const test = () => {
  console.clear();
  //   console.log(addV([1, 2, 3], [1, 2, 3]));
  //   console.log(subV([1, 2, 3], [1, 2, 3]));
  //   console.log(straightMulV([1, 2, 3], [1, 2, 3]));
  //   console.log(straightDivV([1, 2, 3], [1, 2, 3]));
  //   console.log(dotProduct([1, 2, 3], [2, 5, 10]));
  //   console.log(magnitudeOf([1, 2, 3]));
  //   console.log(unitVecOf([1, 2, 3]));
  //   console.log(crossProduct([1, 2, 3], [2, 5, 10]));
  //   console.log(angleSeperate([1, 2, 3], [2, 5, 10]));
  //   console.log(
  //     addM(
  //       [
  //         [1, 2, 3],
  //         [4, 5, 6],
  //         [7, 8, 9],
  //       ],
  //       [
  //         [1, 2, 3],
  //         [4, 5, 6],
  //         [7, 8, 9],
  //       ]
  //     )
  //   );
  //   console.log(
  //     multiplyMV(
  //       [
  //         [1, -1, 2],
  //         [0, -3, 1],
  //       ],
  //       [2, 1, 0]
  //     )
  //   );
  //   console.log(
  //     transposeOf([
  //       [5],
  //       [4],
  //       [7],
  //       [7],
  //     ])
  //   );
  //   console.log(
  //     triangularOf([
  //       [1, 2, 3, 4],
  //       [4, 5, 6, 4],
  //       [7, 8, 9, 4],
  //       [7, 8, 9, 4],
  //     ])
  //   );
  //   console.log(
  //     multiplyMM([
  //       [0, 4, -2],
  //       [-4, -3, 0],
  //     ], [
  //         [0, 1],
  //         [1, -1],
  //         [2, 3],
  //       ])
  //   );
  //   console.log(
  //     powerOf(
  //       [
  //         [5, 2, 3],
  //         [1, 5, 10],
  //         [-1, 33, 1],
  //       ],
  //       5
  //     )
  //   );
  // console.log(
  //     leadingOf(
  //         [
  //             [22,-3,-45],
  //             [0,-3,-45],
  //             [0,0,0],
  //         ],
  //         2
  //     )
  // );
  //   console.log(
  //     leadingIndexOf(
  //       [
  //         [22, -3, -45],
  //         [0, -3, -45],
  //         [0, 0, 0],
  //       ],
  //       0
  //     )
  //   );
  console.log(
    rowOperationS(
      [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
      ],
      5,
      2
    )
  );
  console.log(
    rowOperationR(
      [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
      ],
      0,
      1,
      "-"
    )
  );
  console.log(
    rowOperationRS(
      [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
      ],
      5,
      0,
      1,
      "-"
    )
  );
};
