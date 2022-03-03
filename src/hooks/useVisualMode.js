import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1, "newMode")]);
    }
    setHistory((prev) => [...prev, newMode]);
  };

  const back = () => {
    if (history.length > 1) {
      setMode([history.length - 2]);
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  };

  return { mode, transition, back };
}
