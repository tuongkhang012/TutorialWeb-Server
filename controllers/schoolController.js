import mongoose from "mongoose";
import School from '../models/school.js';
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new school
export function createSchool (req, res) {
    const newSchool = new School({
      name: req.body.name,
      noStudents: req.body.noStudents,
      sort: req.body.sort
    }); // create new School object
    
    newSchool // save it then return the return a message for the user
      .save()
      .then((saved_school) => {
        res.status(201).json({
          success: true,
          message: 'New school created successfully',
          School: saved_school,
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

//Get all school
export function getAllSchool(req, res){
    School.find() //find all School object
    .then((all_school) => {
        return res.status(200).json({
            success: true,
            message: 'A list of all schools',
            School: all_school,
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

//Get school by id
export function getSchoolByID(req, res){
  School.findById(req.params.id) //find by id the school
  .then((target_school) => {
    if(!target_school){ //if it's not exist, throw error
      return res.status(404).json({
        success: false,
        message: 'School not found'
      });
    }

    res.status(200).json({ //if found, return the School object
      success: true,
      message: 'School founded',
      School: target_school
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

// Update existing school
export function updateSchool(req, res){
  const updatedData = {
    ...req.body,
    update_at: new Date(),
  }

  School.findByIdAndUpdate(req.params.id, updatedData, {new: true})
  .then((updating_school) => {
    if(!updating_school){
      return res.status(404).json({
        message: 'School not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Updated school',
      School: updating_school,
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
export function deleteSchool(req, res){
  School.findByIdAndDelete(req.params.id)
  .then((deleting_school) => {
    if(!deleting_school){
      return res.status(404).json({
        message: 'School not found'
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