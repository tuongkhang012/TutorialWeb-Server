const School = require('../models/school.js');
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new school
class SchoolCtl{
  async createSchool (req, res) {
      const newSchool = new School(req.body); // create new School object
      
      await newSchool.save()
      res.status(201).json(newSchool)
  }

  //Get all school
  async getAllSchool(req, res){
      const all_school = await School.aggregate([
        {
          $lookup:{
            from: 'students',
            localField: '_id',
            foreignField: 'school',
            as: 'students',
          },
        },
        {
          $addFields: {
            noStudents: {$size: '$students'}
          },
        }
      ])//find all School object
      res.status(200).send(all_school)
  }

  //Get school by id
  async getSchoolByID(req, res){
    const target = await School.findById(req.params.id) //find by id the school
    if(!target_school){ //if it's not exist, throw error
      return res.status(404).json({
        success: false,
        message: 'School not found'
      });
    }

    res.status(200).json(target)
  }

  // Update existing school
  async updateSchool(req, res){
    const updatedData = {
      ...req.body,
      update_at: new Date(),
    }
    const _id = req.params.id;
    const updated = await School.findByIdAndUpdate(_id, updatedData, {new: true})
      if(!updated){
        return res.status(404).json({
          message: 'School not found'
        });
      }

    res.status(200).json(updated)
  }

  // Delete a room
  async deleteSchool(req, res){
    const _id = req.params.id
    const deleted = await School.findByIdAndDelete(_id)
      if(!deleted){
        return res.status(404).json({
          message: 'School not found'
        });
      }
    res.status(204).json()
  }
}

module.exports = new SchoolCtl;