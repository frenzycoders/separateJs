const DoctorControllser = require('express').Router();
const DoctorService = require('./doctor.service');

//Get All Documents
DoctorControllser.get('/',DoctorService.DeleteAllDoctorService)

//Get Doctor By ID
DoctorControllser.get('/:id',DoctorService.FetchSingleDoctorService)


//Create Doctor
DoctorControllser.post('/',DoctorService.CreateDoctorService)


//UpdateDoctor by ID
DoctorControllser.patch('/:id',DoctorService.UpdateDoctorService)

//DeleteAllDoctor
DoctorControllser.delete('/',DoctorService.DeleteAllDoctorService)

//DelectDoctor by Id
DoctorControllser.delete('/:id',DoctorService.DeleteSingleDoctorService)

module.exports = DoctorControllser;