const appController = require('express').Router();
const AppServices = require('./app.service');

//Get All Documents
appController.get('/',AppServices.FetchAllAppServices)

//Get Doctor By ID
appController.get('/:id',AppServices.FetchSingleAppServices)


//Create Doctor
appController.post('/',AppServices.CreateAppServices)


//UpdateDoctor by ID
appController.patch('/:id',AppServices.UpdateAppServices)

//DeleteAllDoctor
appController.delete('/',AppServices.DeleteAllAppServices)

//DelectDoctor by Id
appController.delete('/:id',AppServices.DeleteSingleAppServices)

module.exports = appController;