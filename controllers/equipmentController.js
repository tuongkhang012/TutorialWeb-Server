import Equipment from '../models/equipment.js';
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new equipment
export function createEquipment (req, res) {
    const newEquipment = new Equipment({
      name: req.body.name,
      type: req.body.type,
      tier: req.body.tier,
      sort: req.body.sort
    }); // create new Equipment object
    
    newEquipment // save it then return the return a message for the user
      .save()
      .then((saved_equipment) => {
        res.status(201).json({
          success: true,
          message: 'New equipment created successfully',
          Equipment: saved_equipment,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.',
          err: err.message
        });
      });
}

//Get all equipment
export function getAllEquipment(req, res){
    Equipment.find() //find all Equipment object
    .then((all_equipment) => {
        return res.status(200).json({
            success: true,
            message: 'A list of all equipments',
            Equipment: all_equipment,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again',
            error: err.message,
        });
    });
}

//Get equipment by id
export function getEquipmentByID(req, res){
  Equipment.findById(req.params.id) //find by id the equipment
  .then((target_equipment) => {
    if(!target_equipment){ //if it's not exist, throw error
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    res.status(200).json({ //if found, return the Equipment object
      success: true,
      message: 'Equipment founded',
      Equipment: target_equipment
    });
  })
  .catch((err) =>{
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again',
      error: err.message
    });
  });
}

// Update existing equipment
export function updateEquipment(req, res){
  const updatedData = {
    ...req.body,
    update_at: new Date(),
  }

  Equipment.findByIdAndUpdate(req.params.id, updatedData, {new: true})
  .then((updating_equipment) => {
    if(!updating_equipment){
      return res.status(404).json({
        message: 'Equipment not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Updated equipment',
      Equipment: updating_equipment,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again',
      error: err.message,
    })
  })
}

// Delete a room
export function deleteEquipment(req, res){
  Equipment.findByIdAndDelete(req.params.id)
  .then((deleting_equipment) => {
    if(!deleting_equipment){
      return res.status(404).json({
        message: 'Equipment not found'
      });
    }
    res.status(204).json({
      success: true,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again',
      error: err.message,
    })
  })
}