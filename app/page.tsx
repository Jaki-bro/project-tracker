"use client";

import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, input.trim()]);
    setInput("");
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          📝 Project Tracker
        </h1>

        {/* Input Task */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tambah tugas..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTask}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl shadow transition"
          >
            +
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">Belum ada tugas 📂</p>
          )}
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-indigo-50 px-4 py-2 rounded-xl shadow-sm"
            >
              <span className="text-gray-700">{task}</span>
              <button
                onClick={() => removeTask(index)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
