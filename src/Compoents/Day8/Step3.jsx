import { useForm } from "react-hook-form";

function Step3({ sendData }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(sendData)} className="p-6 max-w-2xl mx-auto bg-white shadow mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Step 3: Nominee Details</h2>
      <div>
        <label>Nominee</label>
        <input {...register("nominee", { required: "Nominee is required" })} className="w-full p-2 bg-gray-200" />
        {errors.nominee && <p className="text-red-500">{errors.nominee.message}</p>}
      </div>
      <div>
        <label>Nominee's Father</label>
        <input {...register("nomFather", { required: "Nominee's Father is required" })} className="w-full p-2 bg-gray-200" />
        {errors.nomFather && <p className="text-red-500">{errors.nomFather.message}</p>}
      </div>
      <button type="submit" className="px-6 py-2 bg-green-700 text-white rounded-md">Submit</button>
    </form>
  );
}

export default Step3;
