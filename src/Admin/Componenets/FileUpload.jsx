import React, { useState, useEffect } from "react";

const FileInputWithPreview = ({ 
  label, 
  register, 
  name, 
  errors, 
  existingUrl = null // For edit mode
}) => {
  const [preview, setPreview] = useState(existingUrl);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(existingUrl);
    }
  };

  const handleDelete = () => {
    setPreview(null);
    // Optionally clear the file input as well
    document.getElementById(name).value = null;
  };

  useEffect(() => {
    setPreview(existingUrl);
  }, [existingUrl]);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div>
        <input
          id={name}
          type="file"
          accept="image/*"
          {...register(name, {
            onChange: handleFileChange, // React Hook Form's onChange
          })}
          className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
        />
      </div>
      
      {/* Image Preview with Delete Button */}
      {preview && (
        <div className="relative mt-3 inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={handleDelete}
            className="absolute top-0 right-[-10px] p-2 bg-red-600 text-sm text-white rounded-full"
            style={{ width: '24px', height: '24px', padding: 0 }}
          >
            &times;
          </button>
        </div>
      )}
      
      {/* Error Message */}
      {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export default FileInputWithPreview;
