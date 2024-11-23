import asyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';
import CustomError from '../utils/CustomError.js';

// @desc Get all contacts for the logged-in user
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find({ user_id: req.user.id });

    if (!contacts) {
      throw new CustomError('Error retrieving contacts', 500);
    }

    res.status(200).json({
      success: true,
      data: contacts,
      message: "Contacts retrieved successfully",
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Error fetching contacts: ' + error.message, 500);
  }
});

// @desc Get a contact by ID
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      throw new CustomError('Contact not found', 404);
    }

    if (contact.user_id.toString() !== req.user.id) {
      throw new CustomError('Unauthorized access to contact', 403);
    }

    res.status(200).json({
      success: true,
      data: contact,
      message: "Contact retrieved successfully",
    });
  } catch (error) {
    if (error.name === 'CastError') {
      throw new CustomError('Invalid contact ID format', 400);
    }
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Error retrieving contact: ' + error.message, 500);
  }
});

// @desc Create a new contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      throw new CustomError('All fields are mandatory', 400);
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new CustomError('Invalid email format', 400);
    }

    // Check if email already exists for this user
    const existingContact = await Contact.findOne({
      user_id: req.user.id,
      email: email,
    });

    if (existingContact) {
      throw new CustomError('A contact with this email already exists', 400);
    }

    const contact = await Contact.create({
      user_id: req.user.id,
      name,
      email,
      phone,
    });

    if (!contact) {
      throw new CustomError('Error creating contact', 500);
    }

    res.status(201).json({
      success: true,
      data: contact,
      message: "Contact created successfully",
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    if (error.name === 'ValidationError') {
      throw new CustomError('Invalid contact data: ' + error.message, 400);
    }
    throw new CustomError('Error creating contact: ' + error.message, 500);
  }
});

// @desc Update a contact by ID
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      throw new CustomError('Contact not found', 404);
    }

    if (contact.user_id.toString() !== req.user.id) {
      throw new CustomError('Unauthorized access to contact', 403);
    }

    // Check if updating email and if it already exists
    if (req.body.email && req.body.email !== contact.email) {
      // Validate new email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.body.email)) {
        throw new CustomError('Invalid email format', 400);
      }

      const existingContact = await Contact.findOne({
        user_id: req.user.id,
        email: req.body.email,
        _id: { $ne: req.params.id },
      });

      if (existingContact) {
        throw new CustomError('A contact with this email already exists', 400);
      }
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      throw new CustomError('Error updating contact', 500);
    }

    res.status(200).json({
      success: true,
      data: updatedContact,
      message: "Contact updated successfully",
    });
  } catch (error) {
    if (error.name === 'CastError') {
      throw new CustomError('Invalid contact ID format', 400);
    }
    if (error.name === 'ValidationError') {
      throw new CustomError('Invalid contact data: ' + error.message, 400);
    }
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Error updating contact: ' + error.message, 500);
  }
});

// @desc Delete a contact by ID
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      throw new CustomError('Contact not found', 404);
    }

    if (contact.user_id.toString() !== req.user.id) {
      throw new CustomError('Unauthorized access to contact', 403);
    }

    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      throw new CustomError('Error deleting contact', 500);
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    if (error.name === 'CastError') {
      throw new CustomError('Invalid contact ID format', 400);
    }
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Error deleting contact: ' + error.message, 500);
  }
});

export {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};