import React, { useEffect, useRef, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Select from 'react-select'
import FileInputWithPreview from '../Componenets/FileUpload'
import axiosClient from '../../axios-client'
import { TagsInput } from "react-tag-input-component";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from 'react-hot-toast';





const variants = z.object({
  price: z.string().min(0, 'Price must be a positive number'),
  quantity: z.string().min(1, 'Quantity must be at least 1'),
  image: z
  .instanceof(FileList)
  .refine((files) => files.length === 0 || (files.length === 1 && files[0] instanceof File), 'Must be a valid file')
  .nullable()
  .optional(),
  color:z.number().optional(),
  size:z.string().optional(),

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
    variants: z.array(variants),
    images:z.array(z.instanceof(File)).optional()
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
      formData.append(parentKey, data[0]);  // If it is a single file
    } else 
    
    
    if (Array.isArray(data)) {
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

    console.log(data);
    
    const formDataObject = new FormData();


    appendToFormData(formDataObject, data);

    // Create a new FormData object without the 'images[]' keys
  const newFormDataObject = new FormData();

  // Loop through the existing FormData
  formDataObject.forEach((value, key) => {
    // Skip keys that match the pattern 'images[]' (e.g., 'images[0]', 'images[1]', etc.)
    if (/^images\[\d+\]$/.test(key)) {
      return;
    }

    // Add the other data to the new FormData
    newFormDataObject.append(key, value);
  });

    let images = getValues('images');
    if (images && images.length > 0) {
      images.forEach((image, index) => {
        newFormDataObject.append(`images[${index}]`, image);
      });
    }


  
  
    // Make the API request
    axiosClient
      .post('admin/product', newFormDataObject, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        console.log(response);
        
        var message = response.data.message;
        toast.success(message)
        
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
   
      
      setShowVariantTable(true);
    }
 
    

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
      
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}



<div className="col-span-2">
  <label
    htmlFor="main"
    className="block text-sm font-medium text-gray-700"
  >
    Images
  </label>
  <Controller
    name="images"
    control={control}
    defaultValue={[]} // Ensure the default is an empty array for files
    render={({ field }) => (
      <Dropzone
        multiple={true}
        onChange={(files) => {
          console.log("Files received:", files); // Debug: Log the files array
          field.onChange(files); // Pass the raw files to react-hook-form
        }}
        value={field.value} // Ensure the value is passed back into the component
      />
    )}
  />
</div>

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
      <Toaster 
      
      position="top-right"
      reverseOrder={false}
      />

      
    </div>

    
  )
}





const Dropzone = ({ multiple, onChange, value = [], ...rest }) => {
  const [files, setFiles] = useState(value);

  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    onDrop: (acceptedFiles) => {
      const updatedFiles = [...files, ...acceptedFiles];
      setFiles(updatedFiles);
      onChange(updatedFiles); // Pass raw files to the parent
    },
    ...rest,
  });

  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange(updatedFiles); // Update form state
  };

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #cccccc",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <input {...getInputProps()} />
      <p>Drag & drop files here, or click to select files</p>

      {/* Display image previews */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {files.map((file, index) => (
          <div key={index} style={{ margin: "10px", position: "relative" }}>
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the dropzone
                handleDelete(index);
              }}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
