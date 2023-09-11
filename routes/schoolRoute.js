import express from 'express';
import * as schoolCtl from '../controllers/schoolController.js';

const router = express.Router();
router.get('/schools', schoolCtl.getAllSchool)
router.get('/school/:id', schoolCtl.getSchoolByID)
router.post('/school', schoolCtl.createSchool)
router.put('/school/:id', schoolCtl.updateSchool)
router.delete('/school/:id', schoolCtl.deleteSchool)

export default router;