import React from 'react'
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import FileInputWithPreview from './Componenets/FileUpload';




const SignUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(3)
    .max(20),

});


export const Dashboard = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const onSubmit =(data)=>{
      console.log(data);
      
  }
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
      />
       {errors.email && <span>{errors.email.message}</span>}
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="Enter your password"
        {...register("password")}
      />

{errors.password && <span>{errors.password.message}</span>}
    </div>



    <FileInputWithPreview
        label="Upload Image"
        name="image"
        register={register}
        errors={errors}
        existingUrl={""} // Pass the existing URL
      />
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit!
      </button>
    </div>
  </form>
  
    
  )
}
