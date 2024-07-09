const express = require('express');
const {
  createMentor,
  getMentors,
  updateMentor,
  deleteMentor
} = require('../controllers/mentor-admin'); // Adjust the path as necessary

const router = express.Router();

router.post('/mentors', createMentor);
router.get('/mentors', getMentors);
router.put('/mentors/:id', updateMentor);
router.delete('/mentors/:id', deleteMentor);

module.exports = router;
