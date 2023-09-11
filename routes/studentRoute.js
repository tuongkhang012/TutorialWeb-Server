import express from 'express';
import * as studentCtl from '../controllers/studentController.js';

const router = express.Router();
router.get('/students', studentCtl.getAllStudent)
router.get('/student/:id', studentCtl.getStudentByID)
router.get('/student-equips/:id', studentCtl.getEquipmentFromStudent)
router.post('/student', studentCtl.createStudent)
router.put('/student/:id', studentCtl.updateStudent)
router.delete('/student/:id', studentCtl.deleteStudent)

export default router;