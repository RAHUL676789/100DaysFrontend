import { useForm } from "react-hook-form";

function Step1({ sendData }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(sendData)} className="p-6 max-w-2xl mx-auto bg-white shadow mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Step 1: Personal Information</h2>
      <div>
        <label>Name</label>
        <input {...register("name", { required: "Name is required" })} className="w-full p-2 bg-gray-200" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input {...register("email", { required: "Email is required" })} className="w-full p-2 bg-gray-200" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <button type="submit" className="px-6 py-2 bg-green-700 text-white rounded-md">Next</button>
    </form>
  );
}

export default Step1;
