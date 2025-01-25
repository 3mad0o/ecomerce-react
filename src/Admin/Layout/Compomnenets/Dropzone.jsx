import React from 'react'
import { useDropzone } from "react-dropzone";

  export const Dropzone = () => {
    const [previews, setPreviews] = useState(value || []);
  
    const { getRootProps, getInputProps } = useDropzone({
      multiple,
      onDrop: (acceptedFiles) => {
        // Add the new files to the existing previews
        const newPreviews = [...previews];
        acceptedFiles.forEach(file => {
          newPreviews.push(URL.createObjectURL(file));
        });
        setPreviews(newPreviews);
        onChange(newPreviews);
      },
      ...rest,
    });
  
    const handleDelete = (index) => {
      const updatedPreviews = previews.filter((_, i) => i !== index);
      setPreviews(updatedPreviews);
      onChange(updatedPreviews); // Update form value
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
          {previews.map((preview, index) => (
            <div key={index} style={{ margin: "10px", position: "relative" }}>
              <img
                src={preview}
                alt={`preview-${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <button
                onClick={() => handleDelete(index)}
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
  }
  