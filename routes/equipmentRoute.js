import express from 'express';
import * as equipmentCtl from '../controllers/equipmentController.js';

const router = express.Router();
router.get('/equips', equipmentCtl.getAllEquipment)
router.get('/equip/:id', equipmentCtl.getEquipmentByID)
router.post('/equip', equipmentCtl.createEquipment)
router.put('/equip/:id', equipmentCtl.updateEquipment)
router.delete('/equip/:id', equipmentCtl.deleteEquipment)

export default router;