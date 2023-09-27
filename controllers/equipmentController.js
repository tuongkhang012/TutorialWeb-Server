const { default: equipment } = require('../models/equipment.js');
const Equipment = require('../models/equipment.js');
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new equipment
class EquipmentCtl{
  async createEquipment (req, res) {
      const newEquipment = new Equipment(req.body); // create new Equipment object
      
      await newEquipment.save() // save it then return the return a message for the user
      res.status(201).json(newEquipment)
  }

  //Get all equipment
  async getAllEquipment(req, res){
      const services = await Equipment.find({}) //find all Equipment object
      res.status(200).send(services)
  }

  //Get equipment by id
  async getEquipmentByID(req, res){
    const _id = req.params.id;
    const target = await Equipment.findById(_id) //find by id the equipment
      if(!target){ //if it's not exist, throw error
        return res.status(404).json({
          success: false,
          message: 'Equipment not found'
        });
      }

    res.status(200).send(target)
  }

  // Update existing equipment
  async updateEquipment(req, res){
    const updatedData = {
      ...req.body,
      update_at: new Date(),
    }
    const _id = req.params.id;

    const updated = await Equipment.findByIdAndUpdate(_id, updatedData, {new: true})
      if(!updated){
        return res.status(404).json({
          message: 'Equipment not found'
        });
      }

    res.status(200).send(updated)
  }

  // Delete a room
  async deleteEquipment(req, res){
    const deleted = await Equipment.findByIdAndDelete(req.params.id)
      if(!deleted){
        return res.status(404).json({
          message: 'Equipment not found'
        });
      }
    res.status(204).send()
  }
}

module.exports = new EquipmentCtl;
