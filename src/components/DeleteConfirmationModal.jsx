// Demo kullanımı - Kendi uygulamanızda bu kısmı kullanmayabilirsiniz
import { useState } from 'react';import { X, Trash2 } from 'lucide-react';

// DeleteConfirmationModal Component
const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemId,                    
  itemName = "bu öğe",
  title = "Öğeyi Sil"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-500" />
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="mb-6">
          <p className="text-gray-700">
            <span className="font-medium">{itemName}</span> kalıcı olarak silinecek.
          </p>
          <p className="text-gray-600 mt-2">
            Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-medium"
          >
            İptal
          </button>
          <button
            onClick={() => {
              onConfirm(itemId);    // ← ID parametre olarak gönderiliyor
              onClose();
            }}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors font-medium flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;