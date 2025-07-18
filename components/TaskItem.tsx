import React from "react";
import { Task } from "../types/task";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  const checkboxId = `task-${task.id}`;

  return (
    <li className="flex items-center justify-between p-3 border-b border-gray-300">
      <div className="flex items-center space-x-3">
        {/* Label for accessibility */}
        <input
          id={checkboxId}
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 cursor-pointer"
          aria-label={`Mark task "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
          title={`Mark as ${task.completed ? "incomplete" : "complete"}`}
        />
        <label htmlFor={checkboxId} className="cursor-pointer text-lg">
          <span className={task.completed ? "line-through text-gray-400" : ""}>
            {task.title}
          </span>
        </label>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 font-bold"
        aria-label={`Delete task "${task.title}"`}
        title="Delete task"
      >
        &times;
      </button>
    </li>
  );
};

export default TaskItem;
