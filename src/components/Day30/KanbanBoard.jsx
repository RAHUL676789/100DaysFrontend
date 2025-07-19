import React, { useState, useRef } from 'react';
import KanbanCard from './KanbanCard';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: [
      { id: 1, task: "Design Homepage", status: "todo" },
      { id: 2, task: "Write Hero Section", status: "todo" }
    ],
    inProgress: [
      { id: 3, task: "Build Navbar", status: "inProgress" }
    ],
    done: [
      { id: 4, task: "Setup Repo", status: "done" }
    ]
  });

  const [inputVisible, setInputVisible] = useState(false);
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    if (!taskInput.trim() || taskInput.length < 3) {
      alert("Task must be at least 3 characters long");
      return;
    }

    const newTask = {
      id: Date.now(),
      task: taskInput,
      status: "todo"
    };

    setColumns((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask]
    }));

    setTaskInput("");
    setInputVisible(false);
  };

  const getWidthPercent = (key) => {
    const total =
      columns.todo.length + columns.inProgress.length + columns.done.length;
    return total === 0 ? 0 : (columns[key].length / total) * 100;
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('cardId', item.id);
    e.dataTransfer.setData('fromColumn', item.status);
  };

  const handleDrop = (e, targetColumn) => {
    const cardId = e.dataTransfer.getData('cardId');
    const fromColumn = e.dataTransfer.getData('fromColumn');

    if (!cardId || !fromColumn || fromColumn === targetColumn) return;

    const draggedCard = columns[fromColumn].find((item) => item.id == cardId);

    setColumns((prev) => ({
      ...prev,
      [fromColumn]: prev[fromColumn].filter((item) => item.id != cardId),
      [targetColumn]: [
        ...prev[targetColumn],
        { ...draggedCard, status: targetColumn },
      ],
    }));
  };

  const renderColumn = (key, label, color) => (
    <div
      key={key}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, key)}
      className="relative w-[32%] bg-gray-50 border rounded-lg p-4 shadow-md"
    >
      {/* 🌟 Vertical Progress Bar */}
      <div className="absolute top-0 right-0 h-full w-2 bg-gray-200 rounded-r-lg overflow-hidden">
        <div
          className={`w-full transition-all duration-300 ${color === 'teal' ? 'bg-teal-500' : color === 'yellow' ? 'bg-yellow-400' : 'bg-green-500'}`}
          style={{ height: `${getWidthPercent(key)}%` }}
        ></div>
      </div>

      <h2 className={`text-xl font-bold mb-4 text-${color}-700`}>{label}</h2>

      {/* 🟢 Only show add task in TODO */}
      {key === "todo" && (
        <div className="mb-4">
          {inputVisible ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter task..."
                className="px-3 py-2 border rounded w-full"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddTask}
                  className="bg-teal-600 text-white px-3 py-1 rounded"
                >
                  Add Task
                </button>
                <button
                  onClick={() => setInputVisible(false)}
                  className="border px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setInputVisible(true)}
              className="bg-teal-100 text-teal-800 px-3 py-2 rounded font-medium"
            >
              + Add Task
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {columns[key].map((item) => (
          <KanbanCard key={item.id} item={item} onDragStart={handleDragStart} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">
        Kanban Board 🚀
      </h1>
      <div className="flex justify-between gap-4">
        {renderColumn("todo", "To Do", "teal")}
        {renderColumn("inProgress", "In Progress", "yellow")}
        {renderColumn("done", "Done", "green")}
      </div>
    </div>
  );
};

export default KanbanBoard;
