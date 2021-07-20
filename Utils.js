const { exec } = require('child_process');
const { exit } = require('process')
const color = require('colors')
const { Spinner } = require('cli-spinner')
const fs = require('fs')
const { returnPackageJsonFile,middleWares,appController,
    appService,
    errorFile,
    pathConfig,
    indexFile,
    configFile} = require('./dummy/config')
const npm = require('npm')
const npmLog = require('npmlog');
const title = '[' + 'separate'.green + ']';


class Utils {
    async nameGenerator(name) {
        let nName = name;
        let l = nName.split(" ");
        for (var i = 0; i < l.length; i++) {
            nName = nName.replace(" ", "-");
        }
        return nName;
    }
    async initProject(projectDetails, argv) {
        console.log("[" + "separate".green + "]" + " Initialising your project....".yellow)
        var spinner = new Spinner('%s Creating Projects....\n');
        spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");
        spinner.start();
        if (!fs.existsSync(projectDetails.name)) {
            fs.mkdirSync(projectDetails.name, { recursive: true })
            console.log("[" + "✓".green + "]" + " ["+projectDetails.name+" is created..]".green +projectDetails.name)
            let data = await returnPackageJsonFile(projectDetails.name, projectDetails.description);
            fs.writeFileSync(projectDetails.name + '/' + 'package.json', JSON.stringify(data));
            console.log("[" + "✓".green + "]" + " [ package.json file created..]".green + projectDetails.name + '/' + 'package.json')
            fs.writeFileSync(projectDetails.name+'/'+'projectDetails.json', JSON.stringify(projectDetails));
            console.log("[" + "✓".green + "]" + " [projectDetails.json file created..]".green + projectDetails.name+'/'+'projectDetails.json')
            fs.mkdirSync(projectDetails.name+'/'+'MiddleWares',{recursive:true});
            console.log("[" + "✓".green + "]" + " [ MiddleWares folder created..]".green + projectDetails.name+'/'+'MiddleWares')
            data = await middleWares();
            fs.writeFileSync(projectDetails.name+'/'+'MiddleWares/MiddleWares.js',data);
            console.log("[" + "✓".green + "]" + " [ MiddleWares.js file created..]".green + projectDetails.name+'/'+'MiddleWares/MiddleWares.js')
            fs.mkdirSync(projectDetails.name+'/'+'Routes',{recursive:true});
            console.log("[" + "✓".green + "]" + " [ Routes folder created..]".green +projectDetails.name+'/'+'Routes')
            data = await appController();
            fs.writeFileSync(projectDetails.name+'/'+'Routes/app.controller.js',data);
            console.log("[" + "✓".green + "]" + " [ app.controller.js file created..]".green + projectDetails.name+'/'+'Routes/app.controller.js')
            data = await appService();
            fs.writeFileSync(projectDetails.name+'/'+'Routes/app.service.js',data);
            console.log("[" + "✓".green + "]" + " [ app.service,js file created..]".green + projectDetails.name+'/'+'Routes/app.service.js')
            data = await errorFile();
            fs.writeFileSync(projectDetails.name+'/Error.js',data);
            console.log("[" + "✓".green + "]" + " [ Error.js file created..]".green + projectDetails.name+'/Error.js')
            data = await configFile();
            fs.writeFileSync(projectDetails.name+'/Config.js',data)
            console.log("[" + "✓".green + "]" + " [ Config.js file created..]".green + projectDetails.name+'/Config.js')
            data = await pathConfig();
            fs.writeFileSync(projectDetails.name+'/pathConfig.js',data);
            console.log("[" + "✓".green + "]" + " [ pathConfig.js file created..]".green + projectDetails.name+'/pathConfig.js')
            data = await indexFile()
            fs.writeFileSync(projectDetails.name+'/index.js',data)
            console.log("[" + "✓".green + "]" + " [ index.js file created..]".green + projectDetails.name+'/index.js')
            spinner.stop(true);
            console.log("["+"separate".green+"]"+" run "+` cd ${projectDetails.name}`.yellow);
            console.log("["+"separate".green+"]"+" and run "+` npm i `.yellow);
            console.log("["+"separate".green+"]"+" npm run dev for start Development server.".yellow)
            console.log("["+"separate".green+"]"+" npm start for production server.".yellow);
            console.log("["+"separate".green+"]"+" Happy Hacking!..");
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