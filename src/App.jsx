import { useState, useCallback, useEffect, useRef } from 'react';
import Scene from './components/Scene';
import Controls from './components/Controls';
import { createSolvedCube, applyMove, scrambleCube, isSolved } from './cube';

// Map moves to animation parameters
const MOVE_ANIMATION = {
  U:  { axis: 'y', layerValue:  1, direction: -1 },
  "U'": { axis: 'y', layerValue:  1, direction:  1 },
  D:  { axis: 'y', layerValue: -1, direction:  1 },
  "D'": { axis: 'y', layerValue: -1, direction: -1 },
  F:  { axis: 'z', layerValue:  1, direction: -1 },
  "F'": { axis: 'z', layerValue:  1, direction:  1 },
  B:  { axis: 'z', layerValue: -1, direction:  1 },
  "B'": { axis: 'z', layerValue: -1, direction: -1 },
  L:  { axis: 'x', layerValue: -1, direction:  1 },
  "L'": { axis: 'x', layerValue: -1, direction: -1 },
  R:  { axis: 'x', layerValue:  1, direction: -1 },
  "R'": { axis: 'x', layerValue:  1, direction:  1 },
};

export default function App() {
  const [cubeState, setCubeState] = useState(createSolvedCube);
  const [animating, setAnimating] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);
  const [solved, setSolved] = useState(true);
  const [showSolvedMsg, setShowSolvedMsg] = useState(false);
  const animationRef = useRef(null);
  const moveQueueRef = useRef([]);

  const processNextMove = useCallback(() => {
    if (moveQueueRef.current.length === 0) {
      setAnimating(false);
      animationRef.current = null;
      return;
    }

    const move = moveQueueRef.current.shift();
    const anim = MOVE_ANIMATION[move];
    if (!anim) return;

    setAnimating(true);
    animationRef.current = {
      ...anim,
      progress: 0,
      onComplete: () => {
        setCubeState((prev) => {
          const next = applyMove(prev, move);
          const nowSolved = isSolved(next);
          setSolved(nowSolved);
          if (nowSolved) {
            setShowSolvedMsg(true);
            setTimeout(() => setShowSolvedMsg(false), 3000);
          }
          return next;
        });
        setMoveHistory((prev) => [...prev, move]);
        setTimeout(() => processNextMove(), 16);
      },
    };
  }, []);

  const handleMove = useCallback(
    (move) => {
      moveQueueRef.current.push(move);
      if (!animating && !animationRef.current) {
        processNextMove();
      }
    },
    [animating, processNextMove]
  );

  const handleScramble = useCallback(() => {
    const { state, moves } = scrambleCube(createSolvedCube(), 20);
    moveQueueRef.current = [];
    animationRef.current = null;
    setAnimating(false);
    setCubeState(state);
    setMoveHistory(moves);
    setSolved(false);
    setShowSolvedMsg(false);
  }, []);

  const handleReset = useCallback(() => {
    moveQueueRef.current = [];
    animationRef.current = null;
    setAnimating(false);
    setCubeState(createSolvedCube());
    setMoveHistory([]);
    setSolved(true);
    setShowSolvedMsg(false);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const key = e.key.toUpperCase();
      if (['U', 'D', 'F', 'B', 'L', 'R'].includes(key)) {
        const move = e.shiftKey ? key + "'" : key;
        handleMove(move);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleMove]);

  return (
    <div className="app">
      <header className="header">
        <h1>Rubik&apos;s Cube</h1>
        {showSolvedMsg && <div className="solved-badge">Solved!</div>}
      </header>

      <div className="main-layout">
        <div className="canvas-container">
          <Scene
            cubeState={cubeState}
            animating={animating}
            animationRef={animationRef}
          />
        </div>
        <Controls
          onMove={handleMove}
          onScramble={handleScramble}
          onReset={handleReset}
          disabled={false}
          moveHistory={moveHistory}
        />
      </div>
    </div>
  );
}
