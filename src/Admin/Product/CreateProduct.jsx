import React, { useEffect, useRef, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Select from 'react-select'
import FileInputWithPreview from '../Componenets/FileUpload'
import axiosClient from '../../axios-client'
import { TagsInput } from "react-tag-input-component";


const sizeOptions = [
  { value: 'Small', label: 'Small' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Large', label: 'Large' }
]


const variants = z.object({
  price: z.string().min(0, 'Price must be a positive number'),
  quantity: z.string().min(1, 'Quantity must be at least 1'),
  image: z
  .instanceof(FileList)
  .refine((files) => files.length === 0 || (files.length === 1 && files[0] instanceof File), 'Must be a valid file')
  .nullable()
  .optional(),

});
// Zod schema for validation
const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  // description: z.string().min(1, 'Description is required'),
  size: z.array(z.string()).optional(),  // Optional size (can be empty)
  color: z.array(z.number()).optional(), // Optional color (can be empty)
  price: z.string().min(0, 'Price must be a positive number'),
  quantity: z.string().min(1, 'Quantity must be at least 1'),
  mainImage: z
    .instanceof(FileList)
  .refine((files) => files.length === 0 || (files.length === 1 && files[0] instanceof File), 'Must be a valid file')
  .nullable()
  .optional(), // Optional main image
    variants: z.array(variants)
});

export const CreateProduct = () => {
  const { control, register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
  })
  const { fields,append, remove } = useFieldArray({ control, name: "variants" });

  let [colors, setColors] = useState([])
  let [categories, setCategories] = useState([])
  const [showVariantTable, setShowVariantTable] = useState(false)
  const formRef =useRef();


  const GetInitData = () => {
    axiosClient.get('admin/product/create')
      .then((response) => {
        let data = response.data.data
        setColors(data.colors.map(color => ({ value: color.id, label: color.name })))
        setCategories(data.categories.map(category => ({ value: category.id, label: category.name })))
      })
  }

  useEffect(() => {
    GetInitData()
  }, [])

  const onError = (errors) => {
    console.log("Form Errors:", errors);  // Log the validation errors if the form is invalid
    console.log("Form Data on Error:", getValues());  // Log the form values even if they are invalid
  }

  const appendToFormData = (formData, data, parentKey = "") => {
    if (data instanceof FileList || data instanceof Blob) {
      // Handle FileList or single Blob
      formData.append(parentKey, data[0]);
    } else if (Array.isArray(data)) {
      // Handle arrays
      data.forEach((value, index) => {
        const key = parentKey ? `${parentKey}[${index}]` : index;
        appendToFormData(formData, value, key);
      });
    } else if (typeof data === "object" && data !== null) {
      // Handle nested objects
      Object.entries(data).forEach(([key, value]) => {
        const newKey = parentKey ? `${parentKey}[${key}]` : key;
        appendToFormData(formData, value, newKey);
      });
    } else {
      // Handle primitive values
      formData.append(parentKey, data);
    }
  };

  const onSubmit = (data) => {
    const formDataObject = new FormData();


    appendToFormData(formDataObject, data);

  
    // Add all fields from the dynamic formData
    // Object.entries(data).forEach(([key, value]) => {
    //   if (value instanceof Array) {
    //     value.forEach((item) => formDataObject.append(`${key}[]`, item));
    //   } else if (value instanceof FileList || value instanceof Blob) {
    //     formDataObject.append(key, value[0]);
    //   } else {
    //     formDataObject.append(key, value);
    //   }
    // });
  
    // // Add variants
    // getValues('variants').forEach((variant, index) => {
    //   Object.entries(variant).forEach(([key, value]) => {
    //     if (value instanceof FileList || value instanceof Blob) {
    //       formDataObject.append(`variants[${index}][${key}]`, value[0]);
    //     } else {
    //       formDataObject.append(`variants[${index}][${key}]`, value);
    //     }      });
    // });
  
    // Make the API request
    axiosClient
      .post('admin/product', formDataObject, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        console.log('Product created successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error creating product:', error.response?.data || error.message);
      });
  
    console.log('Submitted Data:', data);
  };
  
  const generateVariants = () => {
    let sizes =getValues('size');
    let colors =getValues('color');

    remove();

    if (sizes && colors) {


      const variants = [];
      colors.forEach((color) => {
        sizes.forEach((size) => {
          variants.push({ color: color, size, price: '', quantity: '' });
        });
      });
      variants.forEach((variant) => append(variant));
      console.log('variants',fields);
      
      setShowVariantTable(true);
    }
    console.log(sizes,colors);
    

  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create New Product</h2>
      

      <form ref={formRef} onSubmit={handleSubmit(onSubmit, onError)} className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Name */}
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

        {/* Quantity and Price Fields */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            id="quantity"
            type="number"
            {...register('quantity')}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />
          {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity.message}</p>}

        </div>

        <div>
          
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            id="price"
            type="number"
            {...register('price')}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
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
                options={colors}
                isMulti
                className="mt-2 w-full rounded"
                classNamePrefix="react-select react-select-custom"
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : [])
                  generateVariants()
                }}
                value={colors?.filter(option => (field.value || []).includes(option.value))}
              />
            )}
          />
          {errors.color && <p className="mt-1 text-xs text-red-500">{errors.color.message}</p>}
        </div>

        {/* Custom Sizes */}


           {/* Custom Sizes (TagsInput) */}
           <div>
           <label htmlFor="size" className="block text-sm font-medium text-gray-700">Sizes</label>
          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <>
                <TagsInput
                  value={field.value || []}
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions || [])
                    generateVariants()
                  }}
                  name="sizes"
                   className="mt-2 w-full"
                  placeHolder="Enter sizes"
                />
                <em>Press enter or comma to add new tag</em>
                {errors.sizes && <p>{errors.sizes.message}</p>}
              </>
            )}
          />
        </div>


        {/* Main Image Upload */}
        {/* <div>
        <label htmlFor="main" className="block text-sm font-medium text-gray-700">main image</label>
          <input
            id="image"
            type="file"
            {...register('mainImage')}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />
          {errors.mainImage && <p className="mt-1 text-xs text-red-500">{errors.mainImage.message}</p>}
        </div> */}



        <div>
          
          <FileInputWithPreview
            label="Upload Product Image"
            name="mainImage"
            register={register}
            setValue={setValue}
            errors={errors}
            existingUrl={""} // Replace with existing URL if editing
          />
          {errors.mainImage && <p className="mt-1 text-xs text-red-500">{errors.mainImage.message}</p>}
        </div>

        



{/* Variant Table (show only if colors and sizes are selected) */}
{showVariantTable && (
  <div className="mt-6 col-span-2">
    <h3 className="text-lg font-medium text-gray-700">Define Variants</h3>
    <p className="text-sm text-gray-500">Select quantity and price for each variant.</p>

    <table className="w-full table-auto mt-4">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Variant</th>
          <th className="px-4 py-2 text-left">Quantity</th>
          <th className="px-4 py-2 text-left">Price</th>
          <th className="px-4 py-2 text-left">Image (Optional)</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field, index) => (
          <tr key={field.id}>
            <td className="px-4 py-2">
              {`Size: ${field.size || ''}, Color: ${field.color || ''}`}
            </td>
            <td className="px-4 py-2">
              <input
                type="number"
                className={`w-full p-2 border ${errors?.variants?.[index]?.quantity ? 'border-red-500' : 'border-gray-300'} rounded`}
                {...register(`variants.${index}.quantity`, { required: 'Quantity is required' })}
              />
              {errors?.variants?.[index]?.quantity && (
                <p className="mt-1 text-xs text-red-500">{errors.variants[index].quantity.message}</p>
              )}
            </td>
            <td className="px-4 py-2">
              <input
                type="number"
                className={`w-full p-2 border ${errors?.variants?.[index]?.price ? 'border-red-500' : 'border-gray-300'} rounded`}
                {...register(`variants.${index}.price`, { required: 'Price is required' })}
              />
              {errors?.variants?.[index]?.price && (
                <p className="mt-1 text-xs text-red-500">{errors.variants[index].price.message}</p>
              )}
            </td>
            <td className="px-4 py-2">
              
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded"
                {...register(`variants.${index}.image`)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}



        {/* Submit Button */}
        <div className="text-center mt-4">
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
