import { useEffect, useState } from "react";
import type { ApiResponse } from "@kaiho/types";
import { formatDate } from "@kaiho/utils";
import { useAppStore } from "@/store/useAppStore";

function App() {
  const { count, increment, reset } = useAppStore();
  const [health, setHealth] = useState("checking...");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/health`)
      .then((res) => res.json() as Promise<ApiResponse<{ status: string }>>)
      .then((body) => setHealth(body.data?.status ?? "unknown"))
      .catch(() => setHealth("unreachable"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-900 text-white">
      <h1 className="text-3xl font-bold">kaiho</h1>
      <p>Server status: {health}</p>
      <p className="text-slate-400 text-sm">Rendered {formatDate(new Date())}</p>
      <div className="flex gap-2">
        <button onClick={increment} className="px-4 py-2 bg-indigo-600 rounded">
          +1 ({count})
        </button>
        <button onClick={reset} className="px-4 py-2 bg-slate-700 rounded">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;