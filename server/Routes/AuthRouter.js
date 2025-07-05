const express = require('express');
const router = express.Router();

const { signup, login } = require('../Controllers/AuthController'); // ✅ Import both functions
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

// ✅ Routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

router.get('/test', (req, res) => {
  res.send('Auth route working!');
});


module.exports = router;
