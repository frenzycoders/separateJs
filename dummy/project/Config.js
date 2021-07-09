const { Errors } = require('./Error');
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
