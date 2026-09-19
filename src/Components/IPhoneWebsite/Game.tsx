import React, { useRef, useEffect, useState } from "react";

type Pipe = {
  x: number;
  holeY: number;
  width: number;
  passed: boolean;
};

type GameState = "menu" | "playing" | "gameover";

const GRAVITY = 1000;
const JUMP_VELOCITY = -400;
const BIRD_X = 100;
const BIRD_SIZE = 50;
const PIPE_WIDTH = 80;
/** Vertical opening the bird flies through. */
const PIPE_GAP = 200;
/** Horizontal distance between consecutive pipes. */
const PIPE_SPACING = 300;
const PIPE_COUNT = 100;
const PIPE_SPEED = 200;

export const Game: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("menu");

  // Game variables
  const pipesRef = useRef<Pipe[]>([]);
  const boxYRef = useRef(300);
  const velocityRef = useRef(0);
  const animationRef = useRef<number>(0);

  // The backing store follows the phone screen in every state. Sizing it only while
  // playing left the canvas at its default 300x150 in the menu, so the layout jumped.
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      const width = Math.round(container.clientWidth);
      const height = Math.round(container.clientHeight);
      if (!width || !height) return;
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    return () => observer.disconnect();
  }, []);

  const resetGame = () => {
    const canvas = canvasRef.current!;
    const newPipes: Pipe[] = [];

    for (let i = 0; i < PIPE_COUNT; i++) {
      const holeY =
        100 + Math.random() * Math.max(0, canvas.height - 150 - PIPE_GAP);
      newPipes.push({
        x: canvas.width + i * PIPE_SPACING,
        holeY,
        width: PIPE_WIDTH,
        passed: false,
      });
    }

    pipesRef.current = newPipes;
    boxYRef.current = canvas.height / 2;
    velocityRef.current = 0;
    setScore(0);
  };

  const startGame = () => {
    resetGame();
    setGameState("playing");
  };

  // Taps anywhere on the screen make the bird jump. This used to be a `mousedown`
  // listener on `window`, which never fired on touch and let a click anywhere in the
  // surrounding 3D scene jump the bird.
  const handlePointerDown = () => {
    if (gameState !== "playing") return;
    velocityRef.current = JUMP_VELOCITY;
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let lastTime = performance.now();

    const update = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Physics
      velocityRef.current += GRAVITY * delta;
      boxYRef.current += velocityRef.current * delta;

      // Ground & ceiling
      if (boxYRef.current + BIRD_SIZE > canvas.height) {
        boxYRef.current = canvas.height - BIRD_SIZE;
        velocityRef.current = 0;
        setGameState("gameover");
      }
      if (boxYRef.current < 0) {
        boxYRef.current = 0;
        velocityRef.current = 0;
      }

      for (const pipe of pipesRef.current) {
        pipe.x -= PIPE_SPEED * delta;

        // Collision
        if (
          BIRD_X + BIRD_SIZE > pipe.x &&
          BIRD_X < pipe.x + pipe.width &&
          (boxYRef.current < pipe.holeY ||
            boxYRef.current + BIRD_SIZE > pipe.holeY + PIPE_GAP)
        ) {
          setGameState("gameover");
        }

        // Passed pipe
        if (!pipe.passed && BIRD_X > pipe.x + pipe.width) {
          pipe.passed = true;
          setScore((s) => s + 1);
        }
      }

      // Draw
      ctx.fillStyle = "lightblue";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "yellow";
      ctx.fillRect(BIRD_X, boxYRef.current, BIRD_SIZE, BIRD_SIZE);

      ctx.fillStyle = "green";
      for (const pipe of pipesRef.current) {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.holeY);
        ctx.fillRect(
          pipe.x,
          pipe.holeY + PIPE_GAP,
          pipe.width,
          canvas.height - pipe.holeY - PIPE_GAP,
        );
      }

      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationRef.current);
  }, [gameState]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className="absolute inset-0 flex flex-col items-center"
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />

      {gameState === "menu" && (
        <div className="absolute top-1/2 -translate-y-1/2 text-center flex flex-col gap-11">
          <h1 className="text-5xl mb-4">Flappy Bird</h1>
          <button
            className="px-6 py-3 bg-green-500 rounded-xl text-white"
            onClick={startGame}
          >
            <span className="text-4xl"> Start Game</span>
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <p
          className="absolute top-8 left-5 text-3xl"
          style={{ color: "black" }}
        >
          Score: {score}
        </p>
      )}

      {gameState === "gameover" && (
        <div className="absolute top-1/2 -translate-y-1/2 text-center flex flex-col gap-6 bg-stone-800 p-6 rounded-xl">
          <div>
            <h1 className="text-5xl mb-3 font-semibold">
              <span className="text-stone-100">Game Over</span>
            </h1>
            <p className="text-3xl mb-4 text-stone-200 font-[550]">
              Score: {score}
            </p>
          </div>
          <button
            className="px-6 py-3 bg-stone-300 rounded-xl text-white"
            onClick={startGame}
          >
            <span className="text-4xl text-stone-800">Restart</span>
          </button>
        </div>
      )}
    </div>
  );
};
