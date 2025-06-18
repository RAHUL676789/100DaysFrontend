const Success = ({ data }) => {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-green-700">✅ Submission Successful</h2>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {value}
        </div>
      ))}
    </div>
  );
};

export default Success;
