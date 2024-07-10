// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const BusinessOwner = require('../models/BusinessOwner');

// /**
//  * @swagger
//  * /business-owners:
//  *   get:
//  *     summary: Get all business owners
//  *     responses:
//  *       200:
//  *         description: A list of business owners
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   _id:
//  *                     type: string
//  *                   name:
//  *                     type: string
//  */
// // Add Business Owner
// router.post('/add', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const newBusinessOwner = new BusinessOwner({ name, email, password: hashedPassword });
//     await newBusinessOwner.save();
//     res.json(newBusinessOwner);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get All Business Owners
// router.get('/', async (req, res) => {
//   try {
//     const businessOwners = await BusinessOwner.find();
//     res.json(businessOwners);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update Business Owner
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedBusinessOwner = await BusinessOwner.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedBusinessOwner);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete Business Owner
// router.delete('/:id', async (req, res) => {
//   try {
//     await BusinessOwner.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Business Owner deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Business Owners
 *   description: Manage business owners
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BusinessOwner = require('../models/BusinessOwner');

/**
 * @swagger
 * /api/business-owners/add:
 *   post:
 *     summary: Add a new business owner
 *     tags: [Business Owners]
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created business owner
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
 */
router.post('/add', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newBusinessOwner = new BusinessOwner({ name, email, password: hashedPassword });
    await newBusinessOwner.save();
    res.json(newBusinessOwner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/business-owners:
 *   get:
 *     summary: Get all business owners
 *     tags: [Business Owners]
 *     responses:
 *       200:
 *         description: A list of business owners
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
 */
router.get('/', async (req, res) => {
  try {
    const businessOwners = await BusinessOwner.find();
    res.json(businessOwners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/**
 * @swagger
 * /api/business-owners/{id}:
 *   put:
 *     summary: Update a business owner
 *     tags: [Business Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The business owner id
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated business owner
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedBusinessOwner = await BusinessOwner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBusinessOwner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/business-owners/{id}:
 *   delete:
 *     summary: Delete a business owner
 *     tags: [Business Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The business owner id
 *     responses:
 *       200:
 *         description: The business owner was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete('/:id', async (req, res) => {
  try {
    await BusinessOwner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Business Owner deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
