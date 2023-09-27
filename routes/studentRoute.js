const express = require('express');
const studentCtl = require('../controllers/studentController.js');

const router = express.Router();
router.get('/students', studentCtl.getAllStudent)
router.get('/student/:id', studentCtl.getStudentByID)
router.post('/student', studentCtl.createStudent)
router.put('/student/:id', studentCtl.updateStudent)
router.delete('/student/:id', studentCtl.deleteStudent)

module.exports = router;