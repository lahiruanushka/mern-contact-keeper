import React from "react";
import { LuMail, LuPencil, LuPhone, LuTrash2 } from "react-icons/lu";

const ContactCard = ({ contact, onDelete, onEdit }) => {
  const { name, email, phone } = contact;

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        {/* Contact info section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {name}
            </h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <LuMail size={16} className="text-gray-400" />
              <a href={`mailto:${email}`} className="hover:text-blue-500 transition-colors">
                {email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <LuPhone size={16} className="text-gray-400" />
              <a href={`tel:${phone}`} className="hover:text-blue-500 transition-colors">
                {phone}
              </a>
            </div>
          </div>
        </div>

        {/* Actions section */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="Edit Contact"
            >
              <LuPencil size={18} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete Contact"
            >
              <LuTrash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
