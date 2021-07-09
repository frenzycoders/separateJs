class MiddleWares {
    static async RequireBody(data) {
        const errorFields = []
        const requiredFields = Object.keys(req.body)

        fields.forEach(field => {
            !requiredFields.includes(field) && errorFields.push(f);
        })
        errorFields.length > 0 ? res.status(400).send(`${errorFields.join(', ')} fields are required`) : next()
    }

    static async RequireHeaders(data) {
        return (req, res, next) => {
            const errorFields = []
            const requiredFields = Object.keys(req.headers)

            data.forEach(fields => {
                !requiredFields.includes(fields) && errorFields.push(f);
            })

            errorFields.length > 0 ? res.status(400).send(`${errorFields.join(', ')} fields are required in headers`) : next()
        }
    }

    static async RequireQueries(data) {
        return (req, res, next) => {
            const errorFields = []
            const requiredFields = Object.keys(req.query)
            data.forEach(field => {
                !requiredFields.includes(field) && errorFields.push(field);
            })
            errorFields.length > 0 ? res.status(400).send(`${errorFields.join(', ')} fields are required in queries`) : next()
        }
    }
}

module.exports = MiddleWares;