const express = require('express');
const {
  createEntrepreneur,
  getEntrepreneurs,
  updateEntrepreneur,
  deleteEntrepreneur
} = require('../controllers/entrepreneur-admin.js'); // Adjust the path as necessary

const router = express.Router();

router.post('/entrepreneurs', createEntrepreneur);
router.get('/getEntrepreneurs', getEntrepreneurs);
router.put('/entrepreneurs/:id', updateEntrepreneur);
router.delete('/entrepreneurs/:id', deleteEntrepreneur);

module.exports = router;
