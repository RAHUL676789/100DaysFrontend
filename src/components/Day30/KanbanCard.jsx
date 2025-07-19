import React from 'react'

const KanbanCard = ({ item, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, item)}
      className="bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-3 hover:shadow-md transition-all duration-200 cursor-pointer text-left"
    >
      <h3 className="text-gray-800 font-medium text-base">{item.task}</h3>
    </div>
  );
};

export default KanbanCard;
