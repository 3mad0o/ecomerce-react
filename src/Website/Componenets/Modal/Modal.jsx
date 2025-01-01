import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  // Close the modal when clicking outside of the modal content
  const handleClickOutside = (event) => {
    if (event.target.closest(".modal-content") === null) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Add event listener to handle clicks outside the modal
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Cleanup the event listener when modal is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleClickOutside}>
      <div
        className="bg-white rounded-lg shadow-lg w-9/12 h-auto max-h-[100vh] modal-content"
        onClick={(event) => event.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✖
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
