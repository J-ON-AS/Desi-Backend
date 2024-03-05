const express = require('express');
const router = express.Router();
const { playerBanao, playerDedo } = require('../controllers/Geeme_khidni');
router.route('/').post(playerBanao).get(playerDedo);
module.exports = router;