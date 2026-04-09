import { pool } from "../config/db.js";
import {
  sendContactNotification,
  sendContactConfirmation,
} from "../utils/emailService.js";


/**
 * Submit contact form
 * POST /api/contact
 */
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "All fields are required (name, email, subject, message)",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Please provide a valid email address",
      });
    }

    // Validate field lengths
    if (name.length > 255 || email.length > 255 || subject.length > 255) {
      return res.status(400).json({
        error: "Name, email, or subject is too long (max 255 characters)",
      });
    }

    if (message.length < 5) {
      return res.status(400).json({
        error: "Message must be at least 5 characters long",
      });
    }

    // Insert contact submission into database
    const [result] = await pool.query(
      `INSERT INTO contacts (name, email, subject, message, status) 
       VALUES (?, ?, ?, ?, 'new')`,
      [name, email, subject, message],
    );

    // Send email notification to admin (non-blocking)
    sendContactNotification({
      name,
      email,
      subject,
      message,
      contactId: result.insertId,
    }).catch((emailErr) => {
      console.error(
        "⚠️  Failed to send contact notification email:",
        emailErr.message,
      );
    });

    // NOTE: sendContactConfirmation is disabled per user request to avoid duplicate emails during testing
    // and focus on the main notification email.
    /*
    sendContactConfirmation({ name, email, subject, message }).catch(
      (emailErr) => {
        console.error(
          "⚠️  Failed to send confirmation email to user:",
          emailErr.message,
        );
      },
    );
    */


    res.status(201).json({
      success: true,
      message:
        "Contact form submitted successfully. We'll get back to you soon!",
      contactId: result.insertId,
    });
  } catch (error) {

    console.error("Error submitting contact form:", error);
    res.status(500).json({
      error: "Failed to submit contact form. Please try again later.",
    });
  }
};

/**
 * Get all contacts (Admin only - can be added later)
 * GET /api/contact
 */
export const getAllContacts = async (req, res) => {
  try {
    const [contacts] = await pool.query(
      `SELECT id, name, email, subject, message, status, created_at, updated_at 
       FROM contacts 
       ORDER BY created_at DESC`,
    );

    res.json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      error: "Failed to fetch contacts",
    });
  }
};

/**
 * Update contact status (Admin only - can be added later)
 * PATCH /api/contact/:id
 */
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "read", "replied"].includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Must be 'new', 'read', or 'replied'",
      });
    }

    const [result] = await pool.query(
      `UPDATE contacts SET status = ? WHERE id = ?`,
      [status, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Contact not found",
      });
    }

    res.json({
      success: true,
      message: "Contact status updated successfully",
    });
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({
      error: "Failed to update contact status",
    });
  }
};
