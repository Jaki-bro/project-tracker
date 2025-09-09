"use client";

import { useState, useEffect } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  deadline: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("not started");
  const [deadline, setDeadline] = useState("");

  // ambil data dari API
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const addProject = async () => {
    if (!name.trim()) return;

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        status,
        deadline,
      }),
    });

    if (res.ok) {
      const newProject = await res.json();
      setProjects([newProject, ...projects]);
      setName("");
      setDescription("");
      setStatus("not started");
      setDeadline("");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          📌 Project Tracker
        </h1>

        {/* Form Input */}
        <div className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Project"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi Project"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="not started">Belum Mulai</option>
            <option value="in progress">Sedang Dikerjakan</option>
            <option value="completed">Selesai</option>
          </select>

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={addProject}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl shadow transition"
          >
            ➕ Tambah Project
          </button>
        </div>

        {/* List Project */}
        <ul className="space-y-3">
          {projects.length === 0 && (
            <p className="text-gray-500 text-center">Belum ada project 📂</p>
          )}
          {projects.map((project) => (
            <li
              key={project.id}
              className="p-4 rounded-xl border border-gray-200 shadow-sm bg-indigo-50"
            >
              <h2 className="font-bold text-lg text-indigo-700">{project.name}</h2>
              <p className="text-gray-600">{project.description}</p>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span className="font-semibold text-indigo-600">
                  {project.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Deadline: {new Date(project.deadline).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
