const returnPackageJsonFile = async (projectName, description) => {
    return {
        "name":projectName,
        "version": "0.0.1",
        "description":description,
        "main": "index.js",
        "seprateApp": true,
        "engines": {
            "node": ">=0.8.0"
        },
        "scripts": {
            "dev":"nodemon index.js",
            "start":"node index.js",
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {
            "axios": "^0.21.1",
            "express": "^4.17.1",
            "mongoose": "^5.13.0",
        }
    };
}

const middleWares = async() => {
    return `class MiddleWares {
        static async RequireBody(data) {
            const errorFields = []
            const requiredFields = Object.keys(req.body)
    
            fields.forEach(field => {
                !requiredFields.includes(field) && errorFields.push(f);
            })
            errorFields.length > 0 ? res.status(400).send(errorFields.join(', ') + "fields are required") : next()
        }
    
        static async RequireHeaders(data) {
            return (req, res, next) => {
                const errorFields = []
                const requiredFields = Object.keys(req.headers)
    
                data.forEach(fields => {
                    !requiredFields.includes(fields) && errorFields.push(f);
                })
    
                errorFields.length > 0 ? res.status(400).send(errorFields.join(', ')+ " fields are required in headers") : next()
            }
        }
    
        static async RequireQueries(data) {
            return (req, res, next) => {
                const errorFields = []
                const requiredFields = Object.keys(req.query)
                data.forEach(field => {
                    !requiredFields.includes(field) && errorFields.push(field);
                })
                errorFields.length > 0 ? res.status(400).send(errorFields.join(', ')+" fields are required in queries ") : next()
            }
        }
    }
    
    module.exports = MiddleWares;`
}

const appController = async () => {
    return `const appController = require('express').Router();
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
    
    module.exports = appController;`
}

const appService = async() => {
    return `class AppServices {

        //Create Doctor
        async CreateAppServices(req, res) {
            res.status(200).send({msg:"OK"})
        }
    
        //Fetch All Doctor
        async FetchAllAppServices(req, res) {
            res.status(200).send({msg:"OK"})
        }
    
        //Fetch SIngle Doctor
        async FetchSingleAppServices(req, res) {
            res.status(200).send({msg:"OK"})
        }
    
        //Delete All Doctor Service
        async DeleteAllAppServices(req, res) {
            res.status(200).send({msg:"OK"})
        }
    
        //Delete Single DOctor Service
        async DeleteSingleAppServices(req, res) {
            res.status(200).send({msg:"OK"})
        }
    
        //Update Doctor Service
        async UpdateAppServices(req, res) {
            res.status(200).send({msg:"OK"})
        }
    }
    
    const appService = new AppServices();
    module.exports = appService;`
}

const configFile = async() => {
    return `const { Errors } = require('./Error');
    const path = require('./pathConfig');
    
    module.exports = (app) => {
        path.map((e) => {
            app.use(e.path, e.control);
        })
        //For Default 404 error
        app.use((req, res, next) => {
            Errors.Error404(req, res)
        })
    }
    `
}

const errorFile = async() => {
    return `class Errors {
        static async Error404(req, res, message) {
            res.status(404).send({
                msg: message == null ? 'Resource not found.' : message,
                errorCode: "404"
            })
        }
    
        static async InternalServerErrror(req, res, message) {
            res.status(500).send({
                msg: message == null ? "Internal server error" : message,
                errorCode: "500",
            })
        }
    
        static async Error403(req,res,message) {
            res.status(403).send({
                msg: message == null ? 'Requested resource is forbidden for some reason.' : message,
                errorCode:"403"
            })
        }
    }
    
    module.exports = {
        Errors
    }`
}
const indexFile = async() => {
    return `const express = require('express');
    const app = express();
    const server = require('http').createServer(app);
    require('./Config')(app);
    
    server.listen(3000,(err)=>{
        console.log('Running...');
    })`
}
const pathConfig = async() => {
    return `const AppController = require('./Routes/app.controller');
    module.exports = [
        {
            path:'/',
            control:AppController
        }
    ]`
}
module.exports = {
    returnPackageJsonFile,
    middleWares,
    appController,
    appService,
    errorFile,
    pathConfig,
    indexFile,
    configFile
}