
const api = "http://localhost:8080/api/v1/planos";

getPlanos();

function getPlanos() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {            
        insertPlanos(JSON.parse(this.responseText))    
      }
    };
    xhttp.open("GET", api, true);
    xhttp.send();
  }

function insertPlanos(planos){
    console.log(planos);
    for(let i = 0; i < planos.length; i++)
    {
        let option = document.createElement("option");
        option.value = planos[i].id;
        option.innerHTML = planos[i].plano;

        document.querySelector("#planos").append(option);
    }
}  

function calcular(){
    let idPlano = document.querySelector("#planos").value;
    let origem = document.querySelector("#origem").value;
    let destino = document.querySelector("#destino").value;
    let minutos = document.querySelector("#minutos").value;

    var request = new XMLHttpRequest();
    request.open('POST', api, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
            
            document.querySelector("#valorPlano").innerHTML = data.valorPlano.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});
            document.querySelector("#valorSemPlano").innerHTML = data.valorSemPlano.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});
        }
        else {
            console.log('error');
        }
    };
    request.send(JSON.stringify({ "idPlano": idPlano, "origem":origem, "destino":destino, "minutos":minutos}));

}