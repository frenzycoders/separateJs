class AppServices {

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
module.exports = appService;