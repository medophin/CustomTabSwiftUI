const MOVE_GROUPS = [
  { label: 'U', moves: ['U', "U'"] },
  { label: 'D', moves: ['D', "D'"] },
  { label: 'F', moves: ['F', "F'"] },
  { label: 'B', moves: ['B', "B'"] },
  { label: 'L', moves: ['L', "L'"] },
  { label: 'R', moves: ['R', "R'"] },
];

const FACE_COLORS = {
  U: '#ffffff',
  D: '#ffd500',
  F: '#009b48',
  B: '#0045ad',
  L: '#ff5900',
  R: '#b90000',
};

export default function Controls({ onMove, onScramble, onReset, disabled, moveHistory }) {
  return (
    <div className="controls">
      <div className="controls-header">
        <h2>Controls</h2>
        <div className="action-buttons">
          <button className="btn btn-scramble" onClick={onScramble} disabled={disabled}>
            Scramble
          </button>
          <button className="btn btn-reset" onClick={onReset} disabled={disabled}>
            Reset
          </button>
        </div>
      </div>

      <div className="move-buttons">
        {MOVE_GROUPS.map(({ label, moves }) => (
          <div key={label} className="move-group">
            <div
              className="face-label"
              style={{
                backgroundColor: FACE_COLORS[label],
                color: label === 'U' || label === 'D' ? '#333' : '#fff',
              }}
            >
              {label}
            </div>
            {moves.map((move) => (
              <button
                key={move}
                className="btn btn-move"
                onClick={() => onMove(move)}
                disabled={disabled}
                title={move}
              >
                {move.includes("'") ? '↺' : '↻'}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="keyboard-hint">
        <p>Keyboard: <kbd>U</kbd> <kbd>D</kbd> <kbd>F</kbd> <kbd>B</kbd> <kbd>L</kbd> <kbd>R</kbd></p>
        <p>Hold <kbd>Shift</kbd> for counter-clockwise</p>
        <p>Drag to rotate view</p>
      </div>

      {moveHistory.length > 0 && (
        <div className="move-history">
          <h3>Moves ({moveHistory.length})</h3>
          <div className="history-list">
            {moveHistory.map((m, i) => (
              <span key={i} className="history-move">{m}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
