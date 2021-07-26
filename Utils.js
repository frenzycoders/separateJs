const color = require('colors')
const { Spinner } = require('cli-spinner')
const fs = require('fs')
const { returnPackageJsonFile, middleWares, appController,
    appService,
    errorFile,
    pathConfig,
    indexFile,
    configFile,
    dbFile,
    inDexFileWithDB,
    authUserRoute,
    authMiddleWare,
    authUserModel,
    pathReConfig,
    nodeMailer, 
    authUserService} = require('./dummy/config')
const title = '[' + 'separate'.green + ']';
const { execSync } = require('child_process')

class Utils {
    async nameGenerator(name) {
        let nName = name;
        let l = nName.split(" ");
        for (var i = 0; i < l.length; i++) {
            nName = nName.replace(" ", "-");
        }
        return nName;
    }
    async initProject(project) {
        let projectDetails = project;
        console.log("[" + "separate".green + "]" + " Initialising your project....".yellow)
        var spinner = new Spinner('%s Creating Projects....\n');
        spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");
        spinner.start();
        if (!fs.existsSync(projectDetails.name)) {
            fs.mkdirSync(projectDetails.name, { recursive: true })
            fs.mkdirSync(projectDetails.name+'/public', { recursive: true })
            console.log("[" + "✓".green + "]" + " [" + projectDetails.name + " is created..]".green + projectDetails.name)
            let data = await returnPackageJsonFile(projectDetails.name, projectDetails.description);
            fs.writeFileSync(projectDetails.name + '/' + 'package.json', JSON.stringify(data));
            console.log("[" + "✓".green + "]" + " [ package.json file created..]".green + projectDetails.name + '/' + 'package.json')
            fs.writeFileSync(projectDetails.name + '/' + 'projectDetails.json', JSON.stringify(projectDetails));
            console.log("[" + "✓".green + "]" + " [projectDetails.json file created..]".green + projectDetails.name + '/' + 'projectDetails.json')
            fs.mkdirSync(projectDetails.name + '/' + 'MiddleWares', { recursive: true });
            console.log("[" + "✓".green + "]" + " [ MiddleWares folder created..]".green + projectDetails.name + '/' + 'MiddleWares')
            data = await middleWares();
            fs.writeFileSync(projectDetails.name + '/' + 'MiddleWares/MiddleWares.js', data);
            console.log("[" + "✓".green + "]" + " [ MiddleWares.js file created..]".green + projectDetails.name + '/' + 'MiddleWares/MiddleWares.js')
            fs.mkdirSync(projectDetails.name + '/' + 'Routes', { recursive: true });
            console.log("[" + "✓".green + "]" + " [ Routes folder created..]".green + projectDetails.name + '/' + 'Routes')
            data = await appController();
            fs.writeFileSync(projectDetails.name + '/' + 'Routes/app.controller.js', data);
            console.log("[" + "✓".green + "]" + " [ app.controller.js file created..]".green + projectDetails.name + '/' + 'Routes/app.controller.js')
            data = await appService();
            fs.writeFileSync(projectDetails.name + '/' + 'Routes/app.service.js', data);
            console.log("[" + "✓".green + "]" + " [ app.service,js file created..]".green + projectDetails.name + '/' + 'Routes/app.service.js')
            data = await errorFile();
            fs.writeFileSync(projectDetails.name + '/Error.js', data);
            console.log("[" + "✓".green + "]" + " [ Error.js file created..]".green + projectDetails.name + '/Error.js')
            data = await configFile();
            fs.writeFileSync(projectDetails.name + '/Config.js', data)
            console.log("[" + "✓".green + "]" + " [ Config.js file created..]".green + projectDetails.name + '/Config.js')
            data = await pathConfig();
            fs.writeFileSync(projectDetails.name + '/pathConfig.js', data);
            console.log("[" + "✓".green + "]" + " [ pathConfig.js file created..]".green + projectDetails.name + '/pathConfig.js')
            if (projectDetails.isDb) {
                data = await dbFile();
                fs.writeFileSync(projectDetails.name + '/Connection.js', data);
                console.log("[" + "✓".green + "]" + ` [ ${projectDetails.isLocalDB ? 'Local' : 'Cloud'}  Database connection file created..]`.green + projectDetails.name + '/pathConfig.js')
                data = await inDexFileWithDB();
                fs.writeFileSync(projectDetails.name + '/index.js', data)
                console.log("[" + "✓".green + "]" + " [ index.js file created..]".green + projectDetails.name + '/index.js')
                if (projectDetails.isAuth) {
                    console.log(title + " Making Login Signup routes..".green);
                    let name = projectDetails.name;
                    if (fs.existsSync('./' + projectDetails.name + '/projectDetails.json') && !fs.existsSync('./' + projectDetails.name + '/Routes/user')) {
                        console.log(name);
                        let details = JSON.parse(fs.readFileSync('./' + name + '/projectDetails.json', 'utf-8'));
                        console.log(title + " Project Name " + `${details.name}`.yellow);
                        console.log(title + " Version " + `${JSON.parse(fs.readFileSync('./' + name + '/package.json', 'utf-8')).version}`)
                        console.log(title + ' Creating new user route with authentication '.green + ' for ' + `${details.name}`.yellow);
                        fs.mkdirSync('./' + name + '/Routes/user', { recursive: true });
                        let root = './' + name;
                        let data = await authMiddleWare('user');
                        fs.writeFileSync(root + '/MiddleWares/isUserAuthenticated.js', data);
                        console.log(title + ' Middleware for user is created.....'.green + root + '/MiddleWares/isUserAuthenticated.js');
                        data = await authUserModel('user');
                        fs.writeFileSync(root + '/Routes/user/user.model.js', data);
                        console.log(title + " Model file for user is created..".green);
                        data = await authUserRoute('user');
                        fs.writeFileSync(root + '/Routes/user/user.controller.js', data);
                        console.log(title + " Controller file for user is created..");

                        data = await authUserService('user');
                        fs.writeFileSync(root + '/Routes/user/user.service.js',data);
                        console.log(title + " Service file for user is created..");

                        console.log(title + " Setting nodemailer for your project.".green);
                        data = await nodeMailer();
                        fs.writeFileSync(root + '/nodemailer.js', data);
                        console.log(title+" NodeMailer setup complete.");

                        let path = execSync('pwd');
                        let projectDetails = require(`${path.toString().split('\n')[0]}/${name}/projectDetails.json`);

                        projectDetails.routes.push('/user');
                        fs.writeFileSync('./' + name + '/projectDetails.json', JSON.stringify(projectDetails));
                        let routes = [];
                        projectDetails.routes.map((e) => {
                            if (e != '/') routes.push(e.replace('/', ''));
                        })
                        data = await pathReConfig(routes);
                        fs.writeFileSync('./' + name + '/pathConfig.js', data);
                        console.log(title + ' Setting up your route please wait.');
                        console.log(title + ' CRUD'.yellow + " Created successfully for route /user");
                        console.log("Happy Coding".yellow)
                    }
                }
            }
            else {
                data = await indexFile()
                fs.writeFileSync(projectDetails.name + '/index.js', data)
                console.log("[" + "✓".green + "]" + " [ index.js file created..]".green + projectDetails.name + '/index.js')
            }

            spinner.stop(true);
            console.log("[" + "separate".green + "]" + " run " + ` cd ${projectDetails.name}`.yellow);
            console.log("[" + "separate".green + "]" + " and run " + ` npm i `.yellow);
            console.log("[" + "separate".green + "]" + " npm run dev for start Development server.".yellow)
            console.log("[" + "separate".green + "]" + " npm start for production server.".yellow);
            console.log("[" + "separate".green + "]" + " Happy Hacking!..");
            process.exit();
        }
        else {
            spinner.stop(true);
            console.log("[" + "×".red + "]" + ' Project name already exist...'.red);
        }
    }


}
const utils = new Utils();

module.exports = { utils }