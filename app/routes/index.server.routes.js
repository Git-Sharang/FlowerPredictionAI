const index_controller = require('../controllers/index.server.controller');
module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index', {
            info: "see the results in console window"
        })
    });
    
    app.route('/run')
        .post(index_controller.trainAndPredict);
};