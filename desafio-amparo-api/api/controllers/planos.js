module.exports = () => {
    const planos = require('../data/planos.json');
    const tarifas = require('../data/tarifasMinutos.json') 
    const controller = {};
  
    controller.listaPlanos = (req, res) => {
        res.status(200).json(planos);
    }
  
    controller.calculaMinutagem = (req, res) =>{
        let valorPlano = 0;
        let valoSemPlano = 0;

        //CALCULO DO VALOR DOS MINUTOS SEM O PLANO
        for(let j = 0; j < tarifas.length; j++)
        {
            if(tarifas[j].origem == req.body.origem && tarifas[j].destino == req.body.destino)
            {                            
                valoSemPlano = tarifas[j].tarifa * req.body.minutos;                                            
                break;
            }
        }
        

        //CALCULO DO VALOR DA LIGAÇÃO PELO PLANO
        for(let i = 0; i < planos.length; i++)
        {
            if(planos[i].id == req.body.idPlano)
            {
                if(req.body.minutos <= planos[i].minutagem)
                {
                    valorPlano = 0;
                    break;
                }else{
                    for(let j = 0; j < tarifas.length; j++)
                    {
                        if(tarifas[j].origem == req.body.origem && tarifas[j].destino == req.body.destino)
                        {
                            let minutos = req.body.minutos - planos[i].minutagem;                            
                            valorPlano = ((tarifas[j].tarifa * 0.1) + tarifas[j].tarifa) * minutos;                            
                         
                           break;
                        }
                    }
                }
            }
        }

        return res.json({"valorPlano":valorPlano,"valorSemPlano":valoSemPlano})

    }

    return controller;
  }