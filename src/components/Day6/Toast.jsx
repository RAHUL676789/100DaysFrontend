function Toast({ item, close }) {
  const { id, type, message } = item;

  return (
    <div
      className={`min-w-[250px] max-w-[300px] px-4 py-3 rounded shadow-md text-white flex justify-between items-center transition-all duration-300 ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      <span className="text-sm">{message}</span>
      <button
        onClick={() => close(id)}
        className="ml-4 font-bold hover:scale-125 transition-transform duration-150"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
