import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Select from 'react-select'
import FileInputWithPreview from '../Componenets/FileUpload'




const sizeOptions = [
  { value: 'Small', label: 'Small' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Large', label: 'Large' }
]

const colorOptions = [
  { value: 'Red', label: 'Red' },
  { value: 'Blue', label: 'Blue' },
  { value: 'Green', label: 'Green' }
]

// Zod schema for validation
const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  size: z.array(z.enum(['Small', 'Medium', 'Large'])).min(1, 'At least one size is required'),
  color: z.array(z.enum(['Red', 'Blue', 'Green'])).min(1, 'At least one color is required'),
  mainImage:  z
  .instanceof(FileList)
  .refine((files) => files.length === 0 || (files.length === 1 && files[0] instanceof File), 'Must be a valid file')
  .nullable(),
})

export const CreateProduct = () => {
  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            {...register('description')}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            rows="4"
          />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
        </div>

        {/* Color Select */}
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">Colors</label>
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={colorOptions}
                isMulti
                className="mt-2 w-full"
                classNamePrefix="react-select"
                onChange={(selectedOptions) => field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : [])}
                value={colorOptions.filter(option => (field.value || []).includes(option.value))}
              />
            )}
          />
          {errors.color && <p className="mt-1 text-xs text-red-500">{errors.color.message}</p>}
        </div>

        {/* Size Select */}
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">Sizes</label>
          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={sizeOptions}
                isMulti
                className="mt-2 w-full"
                classNamePrefix="react-select"
                onChange={(selectedOptions) => field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : [])}
                value={sizeOptions.filter(option => (field.value || []).includes(option.value))}
              />
            )}
          />
          {errors.size && <p className="mt-1 text-xs text-red-500">{errors.size.message}</p>}
        </div>

        {/* Main Image Upload */}
        <div>
          <FileInputWithPreview
            label="Upload Product Image"
            name="mainImage"
            register={register}
            errors={errors}
            existingUrl={""} // Replace with existing URL if editing
          />
          {errors.mainImage && <p className="mt-1 text-xs text-red-500">{errors.mainImage.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-600"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  )
}
