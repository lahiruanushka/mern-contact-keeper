import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getContact } from "../services/apiService";
import { ColorRing } from "react-loader-spinner";

const ContactDetails = () => {
  const { id } = useParams(); // Get contact ID from route parameters
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Retrieve the token from local storage
  const ACCESS_TOKEN = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      try {
        const contactData = await getContact(id, ACCESS_TOKEN);
        setContact(contactData);
      } catch (error) {
        setError("Failed to load contact. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id, ACCESS_TOKEN]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={contact.name}
              className="w-full p-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contact.email}
              className="w-full p-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={contact.phone}
              className="w-full p-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          <Link to="/" className="text-blue-500 hover:underline">
            Back to contacts
          </Link>
        </>
      )}
    </div>
  );
};

export default ContactDetails;
