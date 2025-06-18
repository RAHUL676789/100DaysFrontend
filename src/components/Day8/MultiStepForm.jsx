import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Success from "./Success";
import ProgressBar from "./ProgressBar";

function MultiStepForm() {
  const totalSteps = 4;
  const [curr, setCurr] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    dist: "",
    nominee: "",
    nomFather: ""
  });

  const [currItem,setCurrItem] = useState();

  const sendData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (curr < totalSteps) setCurr(prev => prev + 1);
  };

  const handlePrev = () => {
    if (curr > 1) setCurr(prev => prev - 1);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <ProgressBar currentStep={curr} totalSteps={totalSteps} />

      {curr === 1 && <Step1 sendData={sendData} />}
      {curr === 2 && <Step2 sendData={sendData} />}
      {curr === 3 && <Step3 sendData={sendData} />}
      {curr === 4 && <Success data={formData} />}

      {/* Navigation */}
      <div className="bg-white fixed bottom-0 w-full flex justify-center p-4 border-t z-50">
        <button
          disabled={curr === 1}
          onClick={handlePrev}
          type="button"
          className={`px-6 py-2 mx-2 rounded-lg font-bold transition-all
            ${curr === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          Prev
        </button>
      </div>
    </div>
  );
}

export default MultiStepForm;
