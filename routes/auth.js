// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
// const BusinessOwner = require('../models/BusinessOwner');

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const businessOwner = await BusinessOwner.findOne({ email });
//     if (!businessOwner) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, businessOwner.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: businessOwner._id }, 'yourSecretKey', { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Password Reset
// router.post('/reset-password', async (req, res) => {
//     const { email, newPassword } = req.body;
//     try {
//       const businessOwner = await BusinessOwner.findOne({ email });
//       if (!businessOwner) return res.status(400).json({ message: 'User not found' });
  
//       const salt = await bcrypt.genSalt(10);
//       businessOwner.password = await bcrypt.hash(newPassword, salt);
//       await businessOwner.save();
//       res.json({ message: 'Password reset successfully' });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   // Google OAuth
//   router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
//   router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
  
// module.exports = router;



/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication and authorization endpoints
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const BusinessOwner = require('../models/BusinessOwner');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const businessOwner = await BusinessOwner.findOne({ email });
    if (!businessOwner) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, businessOwner.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: businessOwner._id }, 'yourSecretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// כאן תוסיף את ה-POST של ה-password reset וה-Google OAuth עם התיעוד שלהם

module.exports = router;
