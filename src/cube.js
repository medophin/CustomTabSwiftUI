// Rubik's Cube state management and rotation logic

// Face indices: 0=U(white), 1=D(yellow), 2=F(green), 3=B(blue), 4=L(orange), 5=R(red)
// Each face is a 3x3 array [row][col]

const COLORS = {
  U: '#ffffff', // white
  D: '#ffd500', // yellow
  F: '#009b48', // green
  B: '#0045ad', // blue
  L: '#ff5900', // orange
  R: '#b90000', // red
};

const FACE_COLORS = ['U', 'D', 'F', 'B', 'L', 'R'];

export function createSolvedCube() {
  return FACE_COLORS.map((face) =>
    Array.from({ length: 3 }, () => Array(3).fill(COLORS[face]))
  );
}

function rotateFaceCW(face) {
  const n = [];
  for (let c = 0; c < 3; c++) {
    n.push([face[2][c], face[1][c], face[0][c]]);
  }
  return n;
}

function rotateFaceCCW(face) {
  const n = [];
  for (let c = 2; c >= 0; c--) {
    n.push([face[0][c], face[1][c], face[2][c]]);
  }
  return n;
}

function cloneCube(cube) {
  return cube.map((face) => face.map((row) => [...row]));
}

// Apply a move to the cube state
// Moves: U, U', D, D', F, F', B, B', L, L', R, R'
export function applyMove(cube, move) {
  const c = cloneCube(cube);
  // U=0, D=1, F=2, B=3, L=4, R=5
  const prime = move.includes("'");
  const base = move.replace("'", '');

  switch (base) {
    case 'U':
      if (!prime) {
        c[0] = rotateFaceCW(c[0]);
        // cycle: F[0] -> L[0] (was R), R[0] -> F[0], B[0] -> R[0] (was L), L[0] -> B[0]
        const temp = [...c[2][0]]; // F top row
        c[2][0] = [...c[5][0]]; // F <- R
        c[5][0] = [...c[3][0]]; // R <- B
        c[3][0] = [...c[4][0]]; // B <- L
        c[4][0] = temp;          // L <- F
      } else {
        c[0] = rotateFaceCCW(c[0]);
        const temp = [...c[2][0]];
        c[2][0] = [...c[4][0]];
        c[4][0] = [...c[3][0]];
        c[3][0] = [...c[5][0]];
        c[5][0] = temp;
      }
      break;

    case 'D':
      if (!prime) {
        c[1] = rotateFaceCW(c[1]);
        const temp = [...c[2][2]];
        c[2][2] = [...c[4][2]];
        c[4][2] = [...c[3][2]];
        c[3][2] = [...c[5][2]];
        c[5][2] = temp;
      } else {
        c[1] = rotateFaceCCW(c[1]);
        const temp = [...c[2][2]];
        c[2][2] = [...c[5][2]];
        c[5][2] = [...c[3][2]];
        c[3][2] = [...c[4][2]];
        c[4][2] = temp;
      }
      break;

    case 'F':
      if (!prime) {
        c[2] = rotateFaceCW(c[2]);
        const temp = [...c[0][2]]; // U bottom row
        // U bottom -> R col 0 (top to bottom)
        for (let i = 0; i < 3; i++) c[0][2][i] = c[4][2 - i][2];
        // L col 2 -> U bottom
        for (let i = 0; i < 3; i++) c[4][i][2] = c[1][0][i];
        // D top -> L col 2
        for (let i = 0; i < 3; i++) c[1][0][i] = c[5][2 - i][0];
        // temp (old U bottom) -> R col 0
        for (let i = 0; i < 3; i++) c[5][i][0] = temp[i];
      } else {
        c[2] = rotateFaceCCW(c[2]);
        const temp = [...c[0][2]];
        for (let i = 0; i < 3; i++) c[0][2][i] = c[5][i][0];
        for (let i = 0; i < 3; i++) c[5][i][0] = c[1][0][2 - i];
        for (let i = 0; i < 3; i++) c[1][0][i] = c[4][i][2];
        for (let i = 0; i < 3; i++) c[4][i][2] = temp[2 - i];
      }
      break;

    case 'B':
      if (!prime) {
        c[3] = rotateFaceCW(c[3]);
        const temp = [...c[0][0]];
        for (let i = 0; i < 3; i++) c[0][0][i] = c[5][i][2];
        for (let i = 0; i < 3; i++) c[5][i][2] = c[1][2][2 - i];
        for (let i = 0; i < 3; i++) c[1][2][i] = c[4][i][0];
        for (let i = 0; i < 3; i++) c[4][i][0] = temp[2 - i];
      } else {
        c[3] = rotateFaceCCW(c[3]);
        const temp = [...c[0][0]];
        for (let i = 0; i < 3; i++) c[0][0][i] = c[4][2 - i][0];
        for (let i = 0; i < 3; i++) c[4][i][0] = c[1][2][i];
        for (let i = 0; i < 3; i++) c[1][2][i] = c[5][2 - i][2];
        for (let i = 0; i < 3; i++) c[5][i][2] = temp[i];
      }
      break;

    case 'L':
      if (!prime) {
        c[4] = rotateFaceCW(c[4]);
        const temp = [c[0][0][0], c[0][1][0], c[0][2][0]];
        for (let i = 0; i < 3; i++) c[0][i][0] = c[3][2 - i][2];
        for (let i = 0; i < 3; i++) c[3][i][2] = c[1][2 - i][0];
        for (let i = 0; i < 3; i++) c[1][i][0] = c[2][i][0];
        for (let i = 0; i < 3; i++) c[2][i][0] = temp[i];
      } else {
        c[4] = rotateFaceCCW(c[4]);
        const temp = [c[0][0][0], c[0][1][0], c[0][2][0]];
        for (let i = 0; i < 3; i++) c[0][i][0] = c[2][i][0];
        for (let i = 0; i < 3; i++) c[2][i][0] = c[1][i][0];
        for (let i = 0; i < 3; i++) c[1][i][0] = c[3][2 - i][2];
        for (let i = 0; i < 3; i++) c[3][i][2] = temp[2 - i];
      }
      break;

    case 'R':
      if (!prime) {
        c[5] = rotateFaceCW(c[5]);
        const temp = [c[0][0][2], c[0][1][2], c[0][2][2]];
        for (let i = 0; i < 3; i++) c[0][i][2] = c[2][i][2];
        for (let i = 0; i < 3; i++) c[2][i][2] = c[1][i][2];
        for (let i = 0; i < 3; i++) c[1][i][2] = c[3][2 - i][0];
        for (let i = 0; i < 3; i++) c[3][i][0] = temp[2 - i];
      } else {
        c[5] = rotateFaceCCW(c[5]);
        const temp = [c[0][0][2], c[0][1][2], c[0][2][2]];
        for (let i = 0; i < 3; i++) c[0][i][2] = c[3][2 - i][0];
        for (let i = 0; i < 3; i++) c[3][i][0] = c[1][2 - i][2];
        for (let i = 0; i < 3; i++) c[1][i][2] = c[2][i][2];
        for (let i = 0; i < 3; i++) c[2][i][2] = temp[i];
      }
      break;
  }

  return c;
}

// Scramble the cube with n random moves
export function scrambleCube(cube, n = 20) {
  const moves = ['U', "U'", 'D', "D'", 'F', "F'", 'B', "B'", 'L', "L'", 'R', "R'"];
  let state = cloneCube(cube);
  const applied = [];
  for (let i = 0; i < n; i++) {
    const m = moves[Math.floor(Math.random() * moves.length)];
    state = applyMove(state, m);
    applied.push(m);
  }
  return { state, moves: applied };
}

// Check if cube is solved
export function isSolved(cube) {
  return cube.every((face) => {
    const color = face[0][0];
    return face.every((row) => row.every((c) => c === color));
  });
}

// Get the color for a specific cubie face
// position: [x, y, z] each in {-1, 0, 1}
// direction: which face of the cubie we want ('px','nx','py','ny','pz','nz')
export function getCubieFaceColor(cube, x, y, z, direction) {
  // Map 3D position + direction to the cube state array
  // U=0 (y=1, py), D=1 (y=-1, ny), F=2 (z=1, pz), B=3 (z=-1, nz), L=4 (x=-1, nx), R=5 (x=1, px)

  // Convert cube coords to face array indices
  // For each face, row and col mapping:
  // U face (y=1): looking down, row = -z+1 (z=1->0, z=-1->2), col = x+1
  // D face (y=-1): looking up, row = z+1 (z=-1->0, z=1->2), col = x+1
  // F face (z=1): looking at front, row = -y+1 (y=1->0, y=-1->2), col = x+1
  // B face (z=-1): looking at back, row = -y+1, col = -x+1 (mirrored)
  // L face (x=-1): looking at left, row = -y+1, col = z+1
  // R face (x=1): looking at right, row = -y+1, col = -z+1

  const BLACK = '#1a1a1a';

  switch (direction) {
    case 'py': // top face - U
      if (y !== 1) return BLACK;
      return cube[0][-z + 1][x + 1];
    case 'ny': // bottom face - D
      if (y !== -1) return BLACK;
      return cube[1][z + 1][x + 1];
    case 'pz': // front face - F
      if (z !== 1) return BLACK;
      return cube[2][-y + 1][x + 1];
    case 'nz': // back face - B
      if (z !== -1) return BLACK;
      return cube[3][-y + 1][-x + 1];
    case 'nx': // left face - L
      if (x !== -1) return BLACK;
      return cube[4][-y + 1][z + 1];
    case 'px': // right face - R
      if (x !== 1) return BLACK;
      return cube[5][-y + 1][-z + 1];
    default:
      return BLACK;
  }
}
