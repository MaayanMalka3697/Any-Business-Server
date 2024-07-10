// const express = require('express');
// const router = express.Router();
// const Customer = require('../models/Customer');

// // Add Customer
// router.post('/add', async (req, res) => {
//   const { name, email, businessOwner } = req.body;
//   try {
//     const newCustomer = new Customer({ name, email, businessOwner });
//     await newCustomer.save();
//     res.json(newCustomer);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get All Customers
// router.get('/', async (req, res) => {
//   try {
//     const customers = await Customer.find().populate('businessOwner');
//     res.json(customers);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update Customer
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedCustomer);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete Customer
// router.delete('/:id', async (req, res) => {
//   try {
//     await Customer.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Customer deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Manage customers
 */

const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

/**
 * @swagger
 * /api/customers/add:
 *   post:
 *     summary: Add a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               businessOwner:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 businessOwner:
 *                   type: string
 */
router.post('/add', async (req, res) => {
  const { name, email, businessOwner } = req.body;
  try {
    const newCustomer = new Customer({ name, email, businessOwner });
    await newCustomer.save();
    res.json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   businessOwner:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().populate('businessOwner');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// כאן תוסיף את ה-PUT וה-DELETE requests עם התיעוד שלהם

module.exports = router;
