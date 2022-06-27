const express = require('express');
const authControler = require('../controlers/auth');
const router = express.Router();

router.post('/register', authControler.register)




module.exports = router;