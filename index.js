#!/usr/bin/env node
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
const { utils } = require('./Utils');
const readline = require('readline');
const inputInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const title = '[' + 'separate'.green + ']';
const error = '[' + 'Error'.red + ']';
let projectDetails = require('./projectDetails.json')
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
    .command('make <route>', 'Crate new project', () => { }, (argv) => {
        console.info(argv)
    })
    .demandCommand(1)
    .argv