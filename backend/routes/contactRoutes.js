import express from "express";
import {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
} from "../controllers/contactController.js";
import validateToken from "../middleware/validateToken.js";


const router = express.Router();

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router;
