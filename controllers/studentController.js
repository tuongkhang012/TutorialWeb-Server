const Student = require('../models/student.js');
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new student
class StudentCtl{
    async createStudent (req, res) {
      const newStudent = new Student(req.body); // create new Student object
      
      await newStudent.save()
      res.status(201).json(newStudent)
  }

  //Get all student
  async getAllStudent(req, res){
      const all_student = await Student.find({}).populate('equipments','name').populate('school','name')//find all Student object
      res.status(200).send(all_student)
  }

  //Get student by id
  async getStudentByID(req, res){
    const _id = req.params.id
    const target = await Student.findById(_id) //find by id the student
      if(!target){ //if it's not exist, throw error
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

    res.status(200).json(target)
  }

  // Update existing student
  async updateStudent(req, res){
    const updatedData = {
      ...req.body,
      update_at: new Date(),
    }
    const _id = req.params.id;
    const updated = await Student.findByIdAndUpdate(_id, updatedData, {new: true})
      if(!updating_student){
        return res.status(404).json({
          message: 'Student not found'
        });
      }

    res.status(200).json(updated)
  }

  // Delete a room
  async deleteStudent(req, res){
    const _id = req.params.id
    const deleted = await Student.findByIdAndDelete(_id)
    if(!deleted){
        return res.status(404).json({
          message: 'Student not found'
        });
    }
    res.status(204).json()
  }
}

module.exports = new StudentCtl;