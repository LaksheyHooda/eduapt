import React, { useEffect } from "react";

const FailedLoginModal = ({ isOpen, onClose, message }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg relative"
        role="alert"
      >
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{message}</span>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.697l-2.651 3.152a1.2 1.2 0 1 1-1.698-1.697l2.651-3.152-2.651-3.152a1.2 1.2 0 1 1 1.698-1.697L10 8.303l2.651-3.152a1.2 1.2 0 1 1 1.697 1.697L11.697 10l2.651 3.152a1.2 1.2 0 0 1 0 1.697z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FailedLoginModal;
