const express = require('express');
const equipmentCtl = require('../controllers/equipmentController.js');

const router = express.Router();
router.get('/equips', equipmentCtl.getAllEquipment)
router.get('/equip/:id', equipmentCtl.getEquipmentByID)
router.post('/equip', equipmentCtl.createEquipment)
router.put('/equip/:id', equipmentCtl.updateEquipment)
router.delete('/equip/:id', equipmentCtl.deleteEquipment)

module.exports = router;