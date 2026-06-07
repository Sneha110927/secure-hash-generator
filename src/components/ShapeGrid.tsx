import { useEffect, useRef } from "react";
import "./ShapeGrid.css";

type Direction = "diagonal" | "up" | "right" | "down" | "left";
type Shape = "square" | "hexagon" | "circle" | "triangle";

type ShapeGridProps = {
  direction?: Direction;
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  shape?: Shape;
  hoverTrailAmount?: number;
  className?: string;
};

export default function ShapeGrid({
  direction = "diagonal",
  speed = 0.35,
  borderColor = "rgba(0, 221, 255, 0.18)",
  squareSize = 42,
  hoverFillColor = "rgba(0, 221, 255, 0.12)",
  shape = "square",
  hoverTrailAmount = 5,
  className = "",
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef<{ x: number; y: number } | null>(null);
  const trailCells = useRef<{ x: number; y: number }[]>([]);
  const cellOpacities = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGrid = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      const offsetX =
        ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
      const offsetY =
        ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

      const cols = Math.ceil(width / squareSize) + 3;
      const rows = Math.ceil(height / squareSize) + 3;

      for (let col = -2; col < cols; col++) {
        for (let row = -2; row < rows; row++) {
          const x = col * squareSize + offsetX;
          const y = row * squareSize + offsetY;
          const key = `${col},${row}`;
          const alpha = cellOpacities.current.get(key);

          if (alpha) {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(x, y, squareSize, squareSize);
            ctx.globalAlpha = 1;
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }
    };

    const updateCellOpacities = () => {
      const targets = new Map<string, number>();

      if (hoveredSquare.current) {
        targets.set(`${hoveredSquare.current.x},${hoveredSquare.current.y}`, 1);
      }

      if (hoverTrailAmount > 0) {
        trailCells.current.forEach((cell, index) => {
          const key = `${cell.x},${cell.y}`;
          if (!targets.has(key)) {
            targets.set(
              key,
              (trailCells.current.length - index) /
                (trailCells.current.length + 1)
            );
          }
        });
      }

      targets.forEach((_, key) => {
        if (!cellOpacities.current.has(key)) {
          cellOpacities.current.set(key, 0);
        }
      });

      cellOpacities.current.forEach((opacity, key) => {
        const target = targets.get(key) || 0;
        const next = opacity + (target - opacity) * 0.15;

        if (next < 0.005) {
          cellOpacities.current.delete(key);
        } else {
          cellOpacities.current.set(key, next);
        }
      });
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);

      if (direction === "right") gridOffset.current.x -= effectiveSpeed;
      if (direction === "left") gridOffset.current.x += effectiveSpeed;
      if (direction === "up") gridOffset.current.y += effectiveSpeed;
      if (direction === "down") gridOffset.current.y -= effectiveSpeed;

      if (direction === "diagonal") {
        gridOffset.current.x -= effectiveSpeed;
        gridOffset.current.y -= effectiveSpeed;
      }

      updateCellOpacities();
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const offsetX =
        ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
      const offsetY =
        ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

      const col = Math.floor((mouseX - offsetX) / squareSize);
      const row = Math.floor((mouseY - offsetY) / squareSize);

      if (
        !hoveredSquare.current ||
        hoveredSquare.current.x !== col ||
        hoveredSquare.current.y !== row
      ) {
        if (hoveredSquare.current && hoverTrailAmount > 0) {
          trailCells.current.unshift({ ...hoveredSquare.current });

          if (trailCells.current.length > hoverTrailAmount) {
            trailCells.current.length = hoverTrailAmount;
          }
        }

        hoveredSquare.current = { x: col, y: row };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    direction,
    speed,
    borderColor,
    squareSize,
    hoverFillColor,
    shape,
    hoverTrailAmount,
  ]);

  return <canvas ref={canvasRef} className={`shapegrid-canvas ${className}`} />;
}