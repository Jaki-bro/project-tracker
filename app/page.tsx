"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data dari API saat pertama kali load
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // 🔹 Tambah task baru (POST ke API)
  const addTask = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input, description: "" }),
      });
      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
      setInput("");
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // 🔹 Hapus task (DELETE ke API)
  const removeTask = async (id: number) => {
    try {
      await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
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
          {loading && <p className="text-gray-400 text-center">Loading...</p>}

          {!loading && tasks.length === 0 && (
            <p className="text-gray-500 text-center">Belum ada tugas 📂</p>
          )}

          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-indigo-50 px-4 py-2 rounded-xl shadow-sm"
            >
              <span className="text-gray-700">{task.title}</span>
              <button
                onClick={() => removeTask(task.id)}
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
