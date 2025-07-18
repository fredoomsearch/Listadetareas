import React, { useState } from "react";
import { TaskProvider, useTasks } from "../context/TaskContext";
import TaskItem from "../components/TaskItem";

const TaskApp = () => {
  const { tasks, addTask, toggleTask, deleteTask, loading } = useTasks();
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!newTask.trim()) {
      setError("El título no puede estar vacío");
      return;
    }
    if (newTask.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres");
      return;
    }
    try {
      await addTask(newTask);
      setNewTask("");
      setError("");
    } catch {
      setError("Error al agregar la tarea");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea"
          className="flex-grow border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Agregar
        </button>
      </div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p>Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <ul>
          {tasks
            .sort((a, b) => Number(a.completed) - Number(b.completed))
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <TaskProvider>
      <TaskApp />
    </TaskProvider>
  );
}
