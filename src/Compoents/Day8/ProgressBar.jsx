const ProgressBar = ({ currentStep, totalSteps,currItem }) => {
  const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full bg-white h-9">
      <div
        className="bg-green-600 h-7 transition-all duration-300 flex justify-between"
        style={{ width: `${percentage}%` }}
        
      >
 
      </div>
    </div>
  );
};

export default ProgressBar;
