const returnPackageJsonFile = async (projectName, description) => {
    return {
        "name": projectName,
        "version": "0.0.0",
        "description": description,
        "main": "index.js",
        "seprateApp": true,
        "engines": {
            "node": ">=0.8.0"
        },
        "scripts": {
            "dev": "nodemon index.js",
            "start": "node index.js",
            "test": "echo \"Error: no test specified\" && exit 0"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {
            "axios": "^0.20.0",
            "express": "^4.07.0",
            "mongoose": "^5.03.0",
        }
    };
}

const middleWares = async () => {
    return `const checkRequiredFields = (fields) => {

        return (req, res, next) => {
    
            const errorFields = []
            const requiredFields = Object.keys(req.body)
    
            fields.forEach(f => {
                if (!requiredFields.includes(f)) {
                    errorFields.push(f);
                }
            })
    
            if (errorFields.length > 0) {
                return res.status(400).send(errorFields.join(', ')+"fields are required");
            }
            next()
    
        }
    }
    
    const checkRequiredHeaders = (headers) => {
        return (req, res, next) => {
            const errorFields = []
            const requiredFields = Object.keys(req.headers)
    
            headers.forEach(f => {
                if (!requiredFields.includes(f)) {
                    errorFields.push(f);
                }
            })
    
            if (errorFields.length > 0) {
                return res.status(400).send(errorFields.join(', ')+" fields are required in headers");
            }
            next()
    
    
        }
    }
    
    const checkRequiredQueries = (queries) => {
        return (req, res, next) => {
            const errorFields = []
            const requiredFields = Object.keys(req.query)
    
            queries.forEach(f => {
                if (!requiredFields.includes(f)) {
                    errorFields.push(f);
                }
            })
    
            if (errorFields.length > 0) {
                return res.status(400).send(errorFields.join(', ')+" fields are required in queries");
            }
            next()
        }
    
    }
    
    module.exports = { checkRequiredFields, checkRequiredHeaders, checkRequiredQueries }`
}

const appController = async () => {
    return `const appController = require('express').Router();
    const {checkRequiredFields,checkRequiredHeaders,checkRequiredQueries} = require('../MiddleWares/MiddleWares');
    const AppServices = require('./app.service');
    
    //Get All Documents
    appController.get('/',AppServices.FetchAllAppServices)
    
    //Get By ID
    appController.get('/:id',AppServices.FetchSingleAppServices)
    
    
    //Create
    appController.post('/',AppServices.CreateAppServices)
    
    
    //Update by ID
    appController.patch('/:id',AppServices.UpdateAppServices)
    
    //DeleteAll
    appController.delete('/',AppServices.DeleteAllAppServices)
    
    //Delect by Id
    appController.delete('/:id',AppServices.DeleteSingleAppServices)
    
    module.exports = appController;`
}

const appService = async () => {
    return `class AppServices {

        //Create 
        async CreateAppServices(req, res) {
            res.status(200).send({msg:"OK"})
        }
    
        //Fetch All
        async FetchAllAppServices(req, res) {
            res.status(200).send({msg:"OK"})
        }
    
        //Fetch SIngle 
        async FetchSingleAppServices(req, res) {
            res.status(200).send({msg:"OK"})
        }
    
        //Delete All Service
        async DeleteAllAppServices(req, res) {
            res.status(200).send({msg:"OK"})
        }
    
        //Delete Single Service
        async DeleteSingleAppServices(req, res) {
            res.status(200).send({msg:"OK"})
        }
    
        //Update Service
        async UpdateAppServices(req, res) {
            res.status(200).send({msg:"OK"})
        }
    }
    
    const appService = new AppServices();
    module.exports = appService;`
}

const configFile = async () => {
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

const errorFile = async () => {
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
const indexFile = async () => {
    return `const express = require('express');
    const app = express();
    const server = require('http').createServer(app);
    require('./Config')(app);
    app.use((req,res,next)=>{
        const startTime = Date.now();
  req.on("end", () => {
    const endTime = Date.now();
    const vals = {
      method: req.method,
      path: req.path,
      time: endTime - startTime,
    };
    console.log(req.method+" "+req.path+" "+res.statusCode+" "+endTime - startTime+"ms");
  });
  next();
    })
    server.listen(3000,(err)=>{
        console.log('server is running on ===> http://localhost:3000');
    })`
}
const pathConfig = async () => {
    return `const AppController = require('./Routes/app.controller');
    module.exports = [
        {
            path:'/',
            control:AppController
        }
    ]`
}

const dynamicRouteController = async (routeName) => {
    let temp = routeName[0];
    let first = routeName[0].toUpperCase();
    let name = routeName.replace(temp, '');
    console.log(first);
    return `
    /*---------------Some Details--------------------
MiddleWares.RequireBody([]) This MiddleWare give control on incoming body data
ex:- MiddleWares.RequireBody(['name','username','password']) In this case if password is not send from your in body it will generate error
------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------
MiddleWares.RequireHeaders([]):- Behave like RequireBody for Headers
-------------------------------------------------------------------------
MiddleWares.RequireQueries([]):- Behave like RequireBody for Query params
-----------------------------------------------*/
    const {checkRequiredFields,checkRequiredHeaders,checkRequiredQueries} = require('../../MiddleWares/MiddleWares');
    const ${first}${name}Controller = require('express').Router();
    const ${first}${name}Service = require('./${routeName}.service');
    
    //Get All Documents
    ${first}${name}Controller.get('/',${first}${name}Service.FetchAll${first}${name}Service)
    
    //Get ${first}${name} By ID
    ${first}${name}Controller.get('/:id',${first}${name}Service.FetchSingle${first}${name}Service)
    
    
    //Create ${first}${name}
    ${first}${name}Controller.post('/',${first}${name}Service.Create${first}${name}Service)
    
    
    //Update${first}${name} by ID
    ${first}${name}Controller.patch('/:id',${first}${name}Service.Update${first}${name}Service)
    
    //DeleteAll${first}${name}
    ${first}${name}Controller.delete('/',${first}${name}Service.DeleteAll${first}${name}Service)
    
    //Delect${first}${name} by Id
    ${first}${name}Controller.delete('/:id',${first}${name}Service.DeleteSingle${first}${name}Service)
    
    module.exports = ${first}${name}Controller;`
}

const dynamicRouteService = async (routeName) => {
    let temp = routeName[0];
    let first = routeName[0].toUpperCase();
    let name = routeName.replace(temp, '');
    return `const ${first}${name}Model = require('./${routeName}.model');
    class ${first}${name}Service {
    
        //Create ${first}${name}
        async Create${first}${name}Service(req,res) {
            res.status(200).send({msg:"Create${first}${name}Service"})
        }
    
        //Fetch All ${first}${name}
        async FetchAll${first}${name}Service(req,res) {
            res.status(200).send({msg:"FetchAll${first}${name}Service"})
        }
    
        //Fetch SIngle ${first}${name}
        async FetchSingle${first}${name}Service(req,res) {
            res.status(200).send({msg:"FetchSingle${first}${name}Service"})
        }
    
        //Delete All ${first}${name} Service
        async DeleteAll${first}${name}Service(req,res) {
            res.status(200).send({msg:"DeleteAll${first}${name}Service"})
        }
    
        //Delete Single ${first}${name} Service
        async DeleteSingle${first}${name}Service(req,res) {
            res.status(200).send({msg:"DeleteSingle${first}${name}Service"})
        }
    
        //Update ${first}${name} Service
        async Update${first}${name}Service(req,res) {
            res.status(200).send({msg:"Update${first}${name}Service"})
        }
    }
    
    const ${first}${name} = new ${first}${name}Service();
    module.exports = ${first}${name};`
}

const dynamicRouteModel = async (routeName) => {
    let temp = routeName[0];
    let first = routeName[0].toUpperCase();
    let name = routeName.replace(temp, '');
    return `const mongoose = require('mongoose');
    const ${first}${name}Schema = mongoose.Schema({
    
    });
    
    const ${first}${name}Model = mongoose.model('${first}${name}Model',${first}${name}Schema);
    module.exports = ${first}${name}Schema;`
}

const pathReConfig = async (routes) => {
    const varArray = [];
    const config = [];
    let lastVar = null;
    routes.map((e) => {
        let temp = e[0];
        let first = e[0].toUpperCase();
        let name = e.replace(temp, '');
        let main = first + name;
        varArray.push(`const ${main}Controller = require('./Routes/${e}/${e}.controller');`);
        config.push(`{
            path:'/${e}',
            control:${main}Controller
        }`)
    });
    return `const AppController = require('./Routes/app.controller');
    ${varArray.toString().replace('[', '\n').replace(']', '\n').replaceAll(',', '\n')}\n
    module.exports = [
        ${config},
        {
            path: '/',
            control: AppController
        },
        
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
    configFile,
    dynamicRouteController,
    dynamicRouteService,
    dynamicRouteModel,
    pathReConfig
}