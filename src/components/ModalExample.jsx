  import React, { useState } from "react";

  export default function ModalExample({ isOpen, setIsOpen }) {

    return (
      <>
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setIsOpen(false)} // Dışarıdaki alana tıklayınca modali kapatır
      >
        <div
          className="bg-white rounded-lg p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()} // Modal içini tıklayınca kapanmasını engeller
        >
          <p className="mb-4">Silme işlemi başarılı.</p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => setIsOpen(false)} // Kapat butonuna tıklayınca modali kapatır
          >
            Kapat
          </button>
        </div>
      </div>
    </>
    );
  }
