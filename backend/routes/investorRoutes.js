const express = require('express');
const {
  createInvestor,
  getInvestors,
  updateInvestor,
  deleteInvestor
} = require('../controllers/investor-admin.js'); // Adjust the path as necessary

const router = express.Router();

router.post('/investors', createInvestor);
router.get('/investors', getInvestors);
router.put('/investors/:id', updateInvestor);
router.delete('/investors/:id', deleteInvestor);

module.exports = router;
