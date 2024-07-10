// const express = require('express');
// const router = express.Router();
// const Appointment = require('../models/Appointment');

// // Add Appointment
// router.post('/add', async (req, res) => {
//   const { businessOwner, customer, date } = req.body;
//   try {
//     const newAppointment = new Appointment({ businessOwner, customer, date });
//     await newAppointment.save();
//     res.json(newAppointment);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get All Appointments
// router.get('/', async (req, res) => {
//   try {
//     const appointments = await Appointment.find().populate('businessOwner customer');
//     res.json(appointments);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update Appointment
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedAppointment);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete Appointment
// router.delete('/:id', async (req, res) => {
//   try {
//     await Appointment.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Appointment deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Manage appointments
 */

const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

/**
 * @swagger
 * /api/appointments/add:
 *   post:
 *     summary: Add a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessOwner:
 *                 type: string
 *               customer:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 businessOwner:
 *                   type: string
 *                 customer:
 *                   type: string
 *                 date:
 *                   type: string
 */
router.post('/add', async (req, res) => {
  const { businessOwner, customer, date } = req.body;
  try {
    const newAppointment = new Appointment({ businessOwner, customer, date });
    await newAppointment.save();
    res.json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   businessOwner:
 *                     type: string
 *                   customer:
 *                     type: string
 *                   date:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('businessOwner customer');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessOwner:
 *                 type: string
 *               customer:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 businessOwner:
 *                   type: string
 *                 customer:
 *                   type: string
 *                 date:
 *                   type: string
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: Appointment deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
