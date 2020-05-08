module.exports = app => {
    const controller = require('../controllers/planos')();
  
    app.route('/api/v1/planos')
      .get(controller.listaPlanos);

    app.route('/api/v1/planos')
    .post(controller.calculaMinutagem);
  }