import mongoose from "mongoose";
import Student from '../models/student.js';
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new student
export function createStudent (req, res) {
    const newStudent = new Student({
        name: req.body.name,
        age: req.body.age,
        school_year: req.body.school_year,
        height: req.body.height,
        birth_day: req.body.birth_day,
        sex: req.body.sex,
        school: req.body.school,
        equipments: req.body.equipments,
        sort: req.body.sort,
    }); // create new Student object
    
    newStudent // save it then return the return a message for the user
      .save()
      .then((saved_student) => {
        res.status(201).json({
          success: true,
          message: 'New student created successfully',
          Student: saved_student,
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

//Get all student
export function getAllStudent(req, res){
    Student.find() //find all Student object
    .then((all_student) => {
        return res.status(200).json({
            success: true,
            message: 'A list of all students',
            Student: all_student,
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

//Get student by id
export function getStudentByID(req, res){
  Student.findById(req.params.id) //find by id the student
  .then((target_student) => {
    if(!target_student){ //if it's not exist, throw error
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({ //if found, return the Student object
      success: true,
      message: 'Student founded',
      Student: target_student
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

//Get equipments from student
export function getEquipmentFromStudent(req, res){
    const studentId = req.params.id;

    Student.findById(studentId) //find by id the student
    .populate('equipments.equipmentId') //find item in "ref" and put it in equipments.equipmentId
    .then(target_student => {
      if(!target_student){ //if it's not exist, throw error
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
        }
    const equips = target_student.equipments.map(equipData => equipData.equipmentId);
    res.status(200).json({ //if found, return the Equipment object
        success: true,
        message: 'Extracting equips',
        Equipment: equips
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

// Update existing student
export function updateStudent(req, res){
  const updatedData = {
    ...req.body,
    update_at: new Date(),
  }

  Student.findByIdAndUpdate(req.params.id, updatedData, {new: true})
  .then((updating_student) => {
    if(!updating_student){
      return res.status(404).json({
        message: 'Student not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Updated student',
      Student: updating_student,
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
export function deleteStudent(req, res){
  Student.findByIdAndDelete(req.params.id)
  .then((deleting_student) => {
    if(!deleting_student){
      return res.status(404).json({
        message: 'Student not found'
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