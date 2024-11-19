import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const ContactCard = ({ contact, onDelete }) => {

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <div className="flex items-center space-x-4">
        <img
          className="w-16 h-16 rounded-full border-2 border-gray-300"
          src="https://via.placeholder.com/100"
          alt="avatar"
        />
        <div className="flex-grow">
          <Link
            to={{
              pathname: `/contacts/${contact._id}`,
              state: { contact },
            }}
          >
            <div className="text-xl font-semibold text-gray-800">
              {contact.name}
            </div>
            <div className="text-gray-600">{contact.email}</div>
            <div className="text-gray-600">{contact.phone}</div>
          </Link>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/contacts/edit/${contact._id}`}
            className="text-blue-500 hover:text-blue-700"
            aria-label="Edit Contact"
          >
            <FaEdit size={20} />
          </Link>
          <button
            onClick={() => onDelete(contact._id)}
            className="text-red-500 hover:text-red-700 "
            aria-label="Edit Contact"
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
