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
            "bcryptjs": "^2.4.3",
            "body-parser": "^1.19.0",
            "cors": "^2.8.5",
            "dotenv": "^8.2.0",
            "express": "^4.17.1",
            "express-fileupload": "^1.2.1",
            "jsonwebtoken": "^8.5.1",
            "lodash": "^4.17.21",
            "nodemailer": "^6.5.0",
            "randomstring": "^1.1.5",
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
    const upload = require('express-fileupload');
    module.exports = (app) => {
        app.use(upload());
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
    return `
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public/',express.static("public"));

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

require('./Config')(app);
`
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


const authUserService = async (routeName) => {
    let temp = routeName[0];
    let first = routeName[0].toUpperCase();
    let firstSmall = first.toLowerCase();
    let name = routeName.replace(temp, '');
    return `
const ${first}${name} = require('./${routeName}.model');
const { mailTransporter } = require('./../../nodemailer')
const bcryptJs = require('bcryptjs');
var randomstring = require("randomstring");
    
    
class ${first}${name}Services {
    
    
    async Fetch${first}${name}Service(req, res) {
        res.status(200).send({ ${firstSmall}${name}: req.${firstSmall}${name}, token: req.token, msg: "${first}${name} Found.", status: true });
    }
    
    
    
    async Login${first}${name}Service(req, res) {
        try {
            let { username, password } = req.body;
            let ${firstSmall}${name} = await ${first}${name}.findOne({ $or: [{ email: username }, { phone: username }, { username: username }] });

            if (!${firstSmall}${name}) return res.status(404).send({ msg: "Wrong Username" });

            let isValid = await bcryptJs.compare(password, ${firstSmall}${name}.password);
            if (!isValid) res.status(400).send({ msg: "You are using wrong password.." });
    
            const token = await ${firstSmall}${name}.gen${first}${name}Token();
    
            res.status(200).send({ user: user, token: token, msg: "Logged in." });
        } catch (error) {
    
            return res.status(400).send({ msg: "Error try again.." });
    
        }
    }
    
    
    
    async Register${first}${name}Service(req, res) {
        try {
            let { name, username, email, password, number } = req.body;
            let img = null;
            if (req.files) {
                req.files.img.mv('public/'+username+'.jpeg');
                img = 'public/'+username+'.jpeg';
            }
            let user = await ${first}${name}.create({ name, username, email, password, number, img });
            res.status(201).send({ user: user, msg: "User Created.", status: true })
        } catch (error) {
    
            res.status(400).send({ msg: error.message });
        }
    }
    
    
    
        async Update${first}${name}Service(req, res) {
            try {
                let data = req.body;
                req.${firstSmall}${name}.name = data.name || req.${firstSmall}${name}.name;
                req.${firstSmall}${name}.email = data.email || req.${firstSmall}${name}.email;
                req.user.number = data.number || req.${firstSmall}${name}.number;
                req.${firstSmall}${name}.username = data.username || req.${firstSmall}${name}.username;
                if (req.files) {
                    req.files.img.mv('public /'+req.${firstSmall}${name}.username+'.jpeg');
                    req.${firstSmall}${name}.img = 'public /'+req.${firstSmall}${name}.username+'.jpeg';
                }
                await req.${firstSmall}${name}.save();
                res.status(200).send({ user: req.${firstSmall}${name}, msg: "Updated", status: true });
            } catch (error) {
                res.status(400).send({ msg: error.message });
            }
        }
    
    
    
        async Check${first}${name}Status(req, res) {
            if (req.${firstSmall}${name}.status) return res.status(200).send({ msg: "Activated", status: true });
            else return res.status(400).send({ msg: "Not Activated", status: false })
        }
    
    
    
        async ${first}${name}ActivationRequest(req, res) {
            try {
                if (req.${firstSmall}${name}.status) return res.status(200).send({ msg: "Account Already Verified.", status: true });
                let rStr = randomstring.generate({
                    length: 12,
                    charset: 'alphabetic'
                });
    
                req.${firstSmall}${name}.activationString = rStr;
                await req.${firstSmall}${name}.save();
    
                await mailTransporter.sendMail({
                    from: 'Your Title <Account Verification>',
                    to: req.${firstSmall}${name}.email,
                    subject: "Account Verification ✔", // Subject line
                    text: "Dear " + req.${firstSmall}${name}.name + " Please click on link to verify your Account.", // plain text body
                    html: "<a href=" + 'http://' + req.hostname + '/user/verify-email/' + rStr + "> Click Here </a>" + 'http://' + req.hostname + '/user/verify-email/' + rStr,
                });
                res.status(200).send({ msg: " Account Activation link was sended on your email " + req.${firstSmall}${name}.email, status: true });
            } catch (error) {
                res.status(400).send({ error: error.message })
            }
        }
    
    
    
        async Verify${first}${name}Account(req, res) {
            try {
                let { code } = req.params;
                let ${firstSmall}${name} = await ${first}${name}.findOne({ activationString: code });
                if (!${firstSmall}${name}) return res.status(404).send({ msg: "Link is Expired", status: false });
                if (${firstSmall}${name}.status) return res.status(200).send({ msg: "Invalid Link" });
                ${firstSmall}${name}.status = true;
                await ${firstSmall}${name}.save();
                res.status(200).send({ msg: "Email verified successfully..." });
            } catch (error) {
                res.status(400).send({ msg: error.message });
            }
        }
    
    
    
        async Check${first}${name}nameService(req, res) {
            try {
                let { username } = req.params;
                let ${firstSmall}${name} = await ${first}${name}.findOne({ username: username });
                if (!username) return res.status(404).send({ msg: "This username is registerd.", status: false });
                else return res.status(200).send({ msg: "This username is already regiseterd.", status: true })
            } catch (error) {
                res.status(400).send({ error: error.message });
            }
        }
    
    
    
        async Logout${first}${name}Service(req, res) {
            try {
                let lis = req.${firstSmall}${name}.tokens;
                req.${firstSmall}${name}.tokens = [];
                let list = [];
                lis.forEach((e) => {
                    if (e.token !== req.token) list.push(e);
                })
                req.${firstSmall}${name}.tokens = list;
                await req.${firstSmall}${name}.save();
                return res.status(200).send({ msg: "Logged out." });
            } catch (error) {
                res.status(400).send({ msg: error.message });
            }
        }
    
    
        async Change${first}${name}Password(req,res){
            try {
                let {oldPassword,newPassword} = req.body;
                let isValid = bcryptJs.compare(oldPassword,req.${firstSmall}${name}.password);
                if(!isValid) return res.status(404).send({msg:"Your Old Password id invalid",status:false});
                req.${firstSmall}${name}.password = newPassword;
                await req.${firstSmall}${name}.save();
                res.status(200).send({msg:"Password was updated.",status:true})
            } catch (error) {
                res.status(400).send({msg:error.message})
            }
        }
    }
    
    const ${first}${name}Service = new ${first}${name}Services();
    module.exports = {
        ${first}${name}Service
    }`
}


const authUserRoute = async (routeName) => {
    let temp = routeName[0];
    let first = routeName[0].toUpperCase();
    let name = routeName.replace(temp, '');
    return `
    const {checkRequiredFields,checkRequiredHeaders,checkRequiredQueries} = require('../../MiddleWares/MiddleWares');
    const ${first}${name}Controller = require('express').Router();
    const {${first}${name}Service} = require('./${routeName}.service');
    const {is${first}${name}Authenticated} = require('./../../MiddleWares/is${first}${name}Authenticated.js')

    //Get ${first}${name}  Documents
    ${first}${name}Controller.get('/',checkRequiredHeaders(['x-${routeName}']),is${first}${name}Authenticated,${first}${name}Service.Fetch${first}${name}Service)
    
    //Login ${first}${name} By ID
    ${first}${name}Controller.post('/login-${routeName}',checkRequiredFields(['username','password']),${first}${name}Service.Login${first}${name}Service)
    
    
    //Create ${first}${name}
    ${first}${name}Controller.post('/register-${routeName}',checkRequiredFields(['username','password','email','name','number']),${first}${name}Service.Register${first}${name}Service)
    
    
    //Update ${first}${name}
    ${first}${name}Controller.patch('/update-${routeName}',checkRequiredHeaders(['x-${routeName}']),is${first}${name}Authenticated,${first}${name}Service.Update${first}${name}Service)
    
    // Check account status activated or not.
    ${first}${name}Controller.get('/check-${routeName}-status',checkRequiredHeaders(['x-${routeName}']),is${first}${name}Authenticated,${first}${name}Service.Check${first}${name}Status)

    //Request account activation
    ${first}${name}Controller.post('/activation-request',checkRequiredHeaders(['x-${routeName}']),is${first}${name}Authenticated,${first}${name}Service.${first}${name}ActivationRequest)

    //Perform ${routeName} verification.
    ${first}${name}Controller.get('/verify-email/:code',${first}${name}Service.Verify${first}${name}Account)

    //Check username exist or not.
    ${first}${name}Controller.get('/check-username/:username',${first}${name}Service.CheckUsernameService)

    //Logout ${routeName}
    ${first}${name}Controller.delete('/logout-${routeName}',checkRequiredHeaders(['x-${routeName}']),is${first}${name}Authenticated,${first}${name}Service.Logout${first}${name}Service)

    //Change ${routeName} Password
    ${first}${name}Controller.patch('/change-password',checkRequiredHeaders(['x-${routeName}']),checkRequiredFields(['oldPassword','newPassword']),is${first}${name}Authenticated,${first}${name}Service.Change${first}${name}Password)

    module.exports = ${first}${name}Controller;`
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
const dbFile = async () => {
    return `module.exports = (projectDetails) => {
        const mongoose = require('mongoose')

    mongoose.Promise = Promise
    
    mongoose.connection.on('connected', () => {
      console.log('Connection Established with :'+projectDetails.dbName);
      console.log('Local: '+ projectDetails.isLocalDB);
      console.log('DB Connection url: '+ projectDetails.isLocalDB ? projectDetails.dbUrl + projectDetails.dbName : projectDetails.dbUrl);
    })
    
    mongoose.connection.on('reconnected', () => {
      console.log('Connection Reestablished')
    })
    
    mongoose.connection.on('disconnected', () => {
      console.log('Connection Disconnected')
    })
    
    mongoose.connection.on('close', () => {
      console.log('Connection Closed')
    })
    
    mongoose.connection.on('error', (error) => {
      console.log('ERROR: ' + error)
    })
    const run = async () => {
        await mongoose.connect(projectDetails.isLocalDB ? projectDetails.dbUrl + projectDetails.dbName : projectDetails.dbUrl, {
          autoReconnect: true,
          reconnectTries: 1000000,
          reconnectInterval: 3000,
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true
        })
    }
      
    run().catch(error => console.error(error))
    }`
}
const inDexFileWithDB = async () => {
    return `
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const projectDetails = require('./projectDetails.json');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public/',express.static("public"));

require('./Connection')(projectDetails);

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

require('./Config')(app);
    
server.listen(3000, (err) => {
  console.log('server is running on ===> http://localhost:3000');
})`
}

const authUserModel = async (routeName) => {
    let temp = routeName[0];
    let first = routeName[0].toUpperCase();
    let name = routeName.replace(temp, '');
    return `const mongoose = require('mongoose');
    const lodash = require('lodash');
    const jwt = require('jsonwebtoken');
    const bcryptJs = require('bcryptjs');
    const access = 'iamjack56';
    const secret = 'blackcoder56';
    
    const ${first}${name}Schema = new mongoose.Schema({
        name: {
            type: String,
    
        },
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            default: null
        },
        password: {
            type: String,
    
        },
        number: {
            type: String,
            required: true
        },
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }],
        status: {
            type: Boolean,
            default: false,
        },
        activationString: {
            type: String,
            default: null,
        },
    }, {
        timestamps: true
    });
    
    ${first}${name}Schema.methods.toJSON = function () {
        let ${first}${name} = this;
        let ${first}${name}Obj = ${first}${name}.toObject();
        return lodash.pick(${first}${name}Obj, ['_id', 'name', 'username', 'img', 'email', 'number', 'status']);
    }
    
    ${first}${name}Schema.methods.gen${first}${name}Token = function () {
        let ${first}${name} = this;
        let token = jwt.sign({ _id: ${first}${name}._id.toHexString(), access }, secret).toString();
        ${first}${name}.tokens = ${first}${name}.tokens.concat([{
            access,
            token
        }]);
        return ${first}${name}.save().then(() => {
            return token;
        });
    }
    
    ${first}${name}Schema.statics.find${first}${name}ByToken = function (token) {
        let ${first}${name} = this;
        let decode;
        try {
            decode = jwt.verify(token, secret);
        } catch (error) {
            return Promise.reject();
        }
        return ${first}${name}.find({
            '_id': decode._id,
            'tokens.token': token,
            'tokens.access': access
        });
    }
    
    
    ${first}${name}Schema.pre('save', function (next) {
        let ${first}${name} = this;
        if (${first}${name}.isModified('password')) {
            bcryptJs.genSalt(7, (err, salt) => {
                bcryptJs.hash(${first}${name}.password, salt, (err, hash) => {
                    ${first}${name}.password = hash;
                    next();
                });
            });
        } else {
            next();
        }
    });
    
    const ${first}${name} = mongoose.model('${first}${name}', ${first}${name}Schema);
    
    module.exports = ${first}${name};
    `
}

const nodeMailer = async () => {
    return `const nodemailer = require('nodemailer');
    let mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'your-email@gmail.com', // generated ethereal user
            pass: 'your password', // generated ethereal password
        },
    });
    
    module.exports = {
        mailTransporter
    }`
}

const authMiddleWare = async (routeName) => {
    let temp = routeName[0];
    let first = routeName[0].toUpperCase();
    let name = routeName.replace(temp, '');
    return `
    const ${first}${name}Model = require('./../Routes/${routeName}/${routeName}.model')
    const is${first}${name}Authenticated = async(req, res, next) =>  {
        try {
            const token = req.header('x-${routeName}');
            const ${routeName} = await UserModel.find${first}${name}ByToken(token);

            if (!${routeName}[0]) res.status(404).send({ msg: "token Expire" });
            else {
                req.${routeName} = ${routeName}[0];
                req.token = token;
                next();
            }
        } catch (error) {
            console.log(error);
            res.status(404).send({ msg: "token Expire" });
        }
    }
    module.exports = {is${first}${name}Authenticated}
    `
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
    pathReConfig,
    inDexFileWithDB,
    dbFile,
    nodeMailer,
    authMiddleWare,
    authUserModel,
    authUserRoute,
    authUserService
}