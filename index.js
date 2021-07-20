#!/usr/bin/env node
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
const { utils } = require('./Utils');
const readline = require('readline');
const inputInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
const fs = require('fs');
const { exec } = require('child_process')
const title = '[' + 'separate'.green + ']';
const error = '[' + 'Error'.red + ']';
let projectDetails = require('./projectDetails.json');
const { dynamicRouteController, dynamicRouteService, dynamicRouteModel, pathReConfig } = require('./dummy/config');
yargs(hideBin(process.argv))
    .command('new', 'Crate new project', () => { }, async (argv) => {
        console.log("[" + "separate".green + "]" + " Welcome developer.")
        inputInterface.question(title + ' Input your project name: '.green, async (name) => {
            if (name == '') {
                console.log(error + " [ Project name can't be empty. try again.. ]".red)
                inputInterface.close();
                process.exit();
            }
            let pName = name.includes(" ") ? await utils.nameGenerator(name) : name;
            projectDetails.name = pName;
            inputInterface.question(title + ' Add Description: '.green, (desc) => {
                projectDetails.description = desc;
                inputInterface.question(title + ' Are you want to add mongodb Connection[Y/N][N] ? ', (data) => {
                    if (data == 'n' || data == 'N' || data == '') {
                        console.log(projectDetails);
                        utils.initProject(projectDetails, argv);
                    } else if (data == 'y' || data == 'Y') {
                        projectDetails.isDb = true;
                        console.log(title + " Cool!!");
                        console.log(title + " Currently we only support mongodb make sure that mongodb installed on your local machine or use cloud mongodb.".yellow);
                        inputInterface.question(title + " Do you want to use cloud mongodb[Y/N][N] ?", (data) => {
                            if (data == 'Y' || data == 'y') {
                                projectDetails.isLocalDB = false;
                                inputInterface.question(title + " Please Enter connection url for your cloud mongodb : ", (data) => {
                                    if (data == '') console.log("[" + "Error".red + "]" + " Wrong Url.");
                                    else {
                                        projectDetails.dbUrl = data;
                                        //Authentication.......
                                        inputInterface.question(title + " Do you want to add default login signup end-points[Y/N] [N] ?", (data) => {
                                            if (data == 'Y' || data == 'y') {
                                                projectDetails.isAuth = true;
                                                console.log(projectDetails);
                                            } else if (data == 'n' || data == 'N' || data == '') {
                                                projectDetails.isAuth = false;
                                                console.log(projectDetails);
                                            } else {
                                                console.log(error + " [ Wrong Input try again. ]")
                                            }
                                        })
                                    }
                                })
                            } else if (data == 'n' || data == 'N') {
                                inputInterface.question(title + " Please Enter your local databse name: ", (data) => {
                                    if (data == '') console.log("[" + "error".red + "]" + " [Database name can'/t be null try again.]".red);
                                    projectDetails.dbName = data;
                                    //Authentication.......
                                    inputInterface.question(title + " Do you want to add default login signup end-points[Y/N] [N] ?", (data) => {
                                        if (data == 'Y' || data == 'y') {
                                            projectDetails.isAuth = true;
                                            console.log(projectDetails);
                                        } else if (data == 'n' || data == 'N' || data == '') {
                                            projectDetails.isAuth = false;
                                            console.log(projectDetails);
                                        } else {
                                            console.log(error + " [ Wrong Input try again. ]")
                                        }
                                    })
                                })

                            } else {
                                console.log(error + " [ Wrong Input try again. ]")
                            }
                        })
                    } else {
                        console.log(error + " [ Wrong Input try again. ]")
                    }
                })
            })
        })
    })
    .demandCommand(1)
    .argv

yargs(hideBin(process.argv))
    .command('make <route>', 'Crate new project', () => { }, async (argv) => {
        if (fs.existsSync('./projectDetails.json') && !fs.existsSync('Routes/' + argv.route)) {
            let details = JSON.parse(fs.readFileSync('projectDetails.json', 'utf-8'));
            console.log(title + " Project Name " + `${details.name}`.yellow);
            console.log(title + " Version " + `${JSON.parse(fs.readFileSync('package.json', 'utf-8')).version}`)
            console.log(title + ' Creating new route ' + `${argv.route}`.green + ' for ' + `${details.name}`.yellow);
            fs.mkdirSync('Routes/' + argv.route, { recursive: true });
            let data = await dynamicRouteController(argv.route);
            fs.writeFileSync('Routes/' + argv.route + '/' + argv.route + '.controller.js', data);
            console.log(title + ' Controller for your route ' + `${argv.route}`.yellow + ' created successfully... '.green + `${details.name}/` + 'Routes/' + argv.route + '/' + argv.route + '.controller.js');
            data = await dynamicRouteService(argv.route);
            fs.writeFileSync('Routes/' + argv.route + '/' + argv.route + '.service.js', data);
            console.log(title + ' Service for your route ' + `${argv.route}`.yellow + ' created successfully... '.green + `${details.name}/` + 'Routes/' + argv.route + '/' + argv.route + '.controller.js');
            data = await dynamicRouteModel(argv.route);
            fs.writeFileSync('Routes/' + argv.route + '/' + argv.route + '.model.js', data);
            console.log(title + ' Model for your route ' + `${argv.route}`.yellow + ' created successfully... '.green + `${details.name}/` + 'Routes/' + argv.route + '/' + argv.route + '.controller.js');

            exec('pwd', async (err, out, code) => {
                if (err) throw err;
                let projectDetails = require(`${out.split('\n')[0]}/projectDetails.json`);
                projectDetails.routes.push(`/${argv.route}`);
                fs.writeFileSync('./projectDetails.json', JSON.stringify(projectDetails));
                let routes = [];
                projectDetails.routes.map((e) => {
                    if (e != '/') routes.push(e.replace('/', ''));
                })
                let data = await pathReConfig(routes);
                fs.writeFileSync('./pathConfig.js',data);
            });
            console.log(title + ' Setting up your route please wait.');
            console.log(title+' CRUD'.yellow+" Created successfully for route "+argv.route);
            console.log("Happy Coding".yellow)
        } else {
            if (fs.existsSync('./projectDetails.json')) {
                if (!fs.existsSync('Routes/' + argv.route)) {
                    console.log(error + " Route " + `${argv.route}` + " for " + `${JSON.parse(fs.readFileSync('package.json', 'utf-8')).name}`.yellow + ' is already exist.')
                }
            } else {
                console.log('This is not a separatejs Projects.');
            }

        }
    })
    .demandCommand(1)
    .argv