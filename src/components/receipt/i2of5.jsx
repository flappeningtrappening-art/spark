import { useRef, useEffect } from "react";

const PATTERNS = {
  "0": "NNWWN",
  "1": "WNNNW",
  "2": "NWNNW",
  "3": "WWNNN",
  "4": "NNWNW",
  "5": "WNWNN",
  "6": "NWWNN",
  "7": "NNNWW",
  "8": "WNNWN",
  "9": "NWNWN",
};

export default function I2of5Barcode({ data, width = 280, height = 50 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const digits = data.replace(/\s/g, "").replace(/[^0-9]/g, "");
    const padded = digits.length % 2 !== 0 ? "0" + digits : digits;

    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);

    const narrowWidth = 1.5;
    const wideWidth = narrowWidth * 2.5;

    // Calculate total bar width
    let totalWidth = 0;
    // Start: NNNN
    totalWidth += narrowWidth * 4;
    for (let i = 0; i < padded.length; i += 2) {
      const bars = PATTERNS[padded[i]];
      const spaces = PATTERNS[padded[i + 1]];
      for (let j = 0; j < 5; j++) {
        totalWidth += bars[j] === "W" ? wideWidth : narrowWidth;
        totalWidth += spaces[j] === "W" ? wideWidth : narrowWidth;
      }
    }
    // Stop: WNN
    totalWidth += wideWidth + narrowWidth + narrowWidth;

    const scale = (width - 20) / totalWidth;
    let x = 10;

    const drawBar = (w, fill) => {
      const scaledW = w * scale;
      if (fill) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x, 2, scaledW, height - 4);
      }
      x += scaledW;
    };
