import { useForm } from "react-hook-form";

function Step2({ sendData }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(sendData)} className="p-6 max-w-2xl mx-auto bg-white shadow mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Step 2: Address Information</h2>
      <div>
        <label>City</label>
        <input {...register("city", { required: "City is required" })} className="w-full p-2 bg-gray-200" />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
      </div>
      <div>
        <label>District</label>
        <input {...register("dist", { required: "District is required" })} className="w-full p-2 bg-gray-200" />
        {errors.dist && <p className="text-red-500">{errors.dist.message}</p>}
      </div>
      <button type="submit" className="px-6 py-2 bg-green-700 text-white rounded-md">Next</button>
    </form>
  );
}

export default Step2;
