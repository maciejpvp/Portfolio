import React, { useRef, useEffect, useState } from "react";

type Pipe = {
  x: number;
  holeY: number;
  width: number;
  passed: boolean;
};

type GameState = "menu" | "playing" | "gameover";

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("menu");

  // Game variables
  const pipesRef = useRef<Pipe[]>([]);
  const boxYRef = useRef(300);
  const velocityRef = useRef(0);
  const animationRef = useRef<number>(0);

  const resetGame = () => {
    const canvas = canvasRef.current!;
    const pipeWidth = 80;
    const gap = 300;
    const pipeCount = 100;
    const newPipes: Pipe[] = [];

    for (let i = 0; i < pipeCount; i++) {
      const holeY = 100 + Math.random() * (canvas.height - 150 - gap);
      newPipes.push({
        x: canvas.width + i * gap,
        holeY,
        width: pipeWidth,
        passed: false,
      });
    }

    pipesRef.current = newPipes;
    boxYRef.current = 300;
    velocityRef.current = 0;
    setScore(0);
  };

  const startGame = () => {
    resetGame();
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 390;
    canvas.height = 840;

    const gravity = 1000;
    const jump = -400;
    const boxX = 100;
    const gap = 200;

    const handleClick = () => {
      velocityRef.current = jump;
    };

    window.addEventListener("mousedown", handleClick);

    let lastTime = performance.now();

    const update = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Physics
      velocityRef.current += gravity * delta;
      boxYRef.current += velocityRef.current * delta;

      // Ground & ceiling
      if (boxYRef.current + 50 > canvas.height) {
        boxYRef.current = canvas.height - 50;
        velocityRef.current = 0;
        setGameState("gameover");
      }
      if (boxYRef.current < 0) {
        boxYRef.current = 0;
        velocityRef.current = 0;
      }

      for (const pipe of pipesRef.current) {
        pipe.x -= 200 * delta;

        // Collision
        if (
          boxX + 50 > pipe.x &&
          boxX < pipe.x + pipe.width &&
          (boxYRef.current < pipe.holeY ||
            boxYRef.current + 50 > pipe.holeY + gap)
        ) {
          setGameState("gameover");
        }

        // Passed pipe
        if (!pipe.passed && boxX > pipe.x + pipe.width) {
          pipe.passed = true;
          setScore((s) => s + 1);
        }
      }

      // Draw
      ctx.fillStyle = "lightblue";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "yellow";
      ctx.fillRect(boxX, boxYRef.current, 50, 50);

      ctx.fillStyle = "green";
      for (const pipe of pipesRef.current) {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.holeY);
        ctx.fillRect(
          pipe.x,
          pipe.holeY + gap,
          pipe.width,
          canvas.height - pipe.holeY - gap,
        );
      }

      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      cancelAnimationFrame(animationRef.current);
    };
  }, [gameState]);

  return (
    <div className="flex flex-col items-center relative">
      <canvas ref={canvasRef} style={{ display: "block", margin: "0 auto" }} />

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
