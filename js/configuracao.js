var local = {endereco:"Rua abc", numero:"39",cidade: "São Paulo", uf: "SP", pais: "Brasil"}

var diaSemana =
[
  "domingo","segunda-feira","terça-feira",
  "quarta-feira","quinta-feira","sexta-feira","sabado"
];
var emissao = new Date().toLocaleDateString();
var horaAtual = new Date().toLocaleTimeString();

var agencia = "AG Tiete";
var numPassagem = 12345;
var linhas = ["219","002","45","038","100","325"];
var itinerarios =["São Paulo/Suzano","São Paulo/Pinheiros","São Paulo/Barueri",
                "São Paulo/Jacarei","São Paulo/Bertioga","São Paulo/Santos"];
var origem = local.cidade +" - "+ local.uf;
var buses = ["1001","2010","5210","9856","7412","7854","98563","87542","96325","2365"]
var plataformas = ["39", "10", "26","31", "45", "70"];
var tarifas = ["12.65","9.20","11.30","5.50","29.30","40.50"];
var taxas = ["0.00","0.00","0.00","0.00","0.00","0.00"];
var pedagios =["0.00","0.00","0.00","0.00","0.00","0.00"];

var cidades = ["Suzano", "Pinheiros", "Barueri","Jacarei", "Bertioga", "Santos"];
var horarios =
[
	["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"], //Suzano
	["07:30","08:30","09:30","10:30","11:30","12:30","13:30","14:30","15:30","16:30","17:30","18:30","19:30","20:30","21:30","22:30"], //Pinheiros
	["07:10","08:10","09:10","10:10","11:10","12:10","13:10","14:10","15:10","16:10","17:10","18:10","19:10","20:10","21:10","22:10"], //Barueri
	["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"], //SP
	["07:00","09:00","11:00","13:00","15:00","17:00","19:00","21:00"],
	["07:00","09:00","11:00","13:00","15:00","17:00","19:00","21:00"]
];

var tabela =
{
  [cidades[0]]:
  {
    plataforma:[plataformas[0]],
    horario:[horarios[0]],
    tarifa: [tarifas[0]],
    taxa: [taxas[0]],
    pedagio: [pedagios[0]],
    itinarario: [itinerarios[0]],
    linha:[linhas[0]],
    onibus: buses.shift()
  },

  [cidades[1]]:
  {
    plataforma:[plataformas[1]],
    horario:[horarios[1]],
    tarifa: [tarifas[1]],
    taxa: [taxas[1]],
    pedagio: [pedagios[1]],
    itinarario: [itinerarios[1]],
    linha:[linhas[1]],
    onibus: buses.shift()
  },

  [cidades[2]]:
  {
    plataforma:[plataformas[2]],
    horario:[horarios[2]],
    tarifa: [tarifas[2]],
    taxa: [taxas[2]],
    pedagio: [pedagios[2]],
    itinarario: [itinerarios[2]],
    linha:[linhas[2]],
    onibus: buses.shift()
  },

  [cidades[3]]:
  {
    plataforma:[plataformas[3]],
    horario:[horarios[3]],
    tarifa: [tarifas[3]],
    taxa: [taxas[3]],
    pedagio: [pedagios[3]],
    itinarario: [itinerarios[3]],
    linha:[linhas[3]],
    onibus: buses.shift()
  },

  [cidades[4]]:
  {
    plataforma:[plataformas[4]],
    horario:[horarios[4]],
    tarifa: [tarifas[4]],
    taxa: [taxas[4]],
    pedagio: [pedagios[4]],
    itinarario: [itinerarios[4]],
    linha:[linhas[4]],
    onibus: buses.shift()
  },

  [cidades[5]]:
  {
    plataforma:[plataformas[5]],
    horario:[horarios[5]],
    tarifa: [tarifas[5]],
    taxa: [taxas[5]],
    pedagio: [pedagios[5]],
    itinarario: [itinerarios[5]],
    linha:[linhas[5]],
    onibus: buses.shift()
  },
};

function imprimirBilhete(conteudo){
  /*var data = new Date();
  var emissao = data.toLocaleDateString();
  var horaEmissao = data.toLocaleTimeString();*/
  //pega o Html da DIV
  var divElements = document.getElementById(conteudo).innerHTML;
  //pega o HTML de toda tag Body
  var oldPage = document.body.innerHTML;

  //Alterna o body
  document.body.innerHTML =
      "<html><head><title></title></head><body>" +
      divElements + "</body>";

  //Imprime o body atual
  window.print();

  //Retorna o conteudo original da página.
  document.body.innerHTML = oldPage;
}

function imprimirBilhetePopup(conteudo){
  var conteudo = document.getElementById(divID).innerHTML;
  var win = window.open();
  win.document.write(conteudo);
  win.print();
  win.close();
}

/*
  Função responsável por configurar a propriedade min do
  select data
*/
function configurarDtViagem_min(){
  var inputData = document.getElementById("dt_Viagem");
  var data = new Date();
  inputData.min = data.getFullYear() +"-"+
      (data.getMonth() < 9? "0"+(data.getMonth()+1) : (data.getMonth()+1))
      +"-"+
      (data.getDate() < 10? "0"+(data.getDate()) : (data.getDate()));
  inputData.addEventListener("change", atualizarHorarios);
}

/*
  Função responsável por retornar o valor do select data no
  formato yyyy/mm/dd para a função validarHora(h)
*/
function configurarDtViagem_value(){
  var data = document.getElementById("dt_Viagem").value;
  var re_dtViagem_value = /^([\d]{4})\-([\d]{2})\-([\d]{2})$/;
  if (re_dtViagem_value.test(data)){
    return data.replace(re_dtViagem_value, "$1/$2/$3");
  }
}
/*
  Função responsável por atulizar os horarios de acordo com o destino
  pré-selecionado quando o usuario trocar a data da viagem
*/
function atualizarHorarios(){
  var index = document.getElementById("destino").selectedIndex;
  var destino = document.getElementById("destino")[index].value;
  carregarHorarios(destino);
}

function atribuirEvento(id,evento,funcao){
  var elem = document.getElementById(id);
  elem.addEventListener(evento, funcao);
}
/*Função que retorna o mes por extenso
<script>
Date.prototype.myMet = function() {
    if (this.getMonth() == 0){this.myProp = "January"};
    if (this.getMonth() == 1){this.myProp = "February"};
    if (this.getMonth() == 2){this.myProp = "March"};
    if (this.getMonth() == 3){this.myProp = "April"};
    if (this.getMonth() == 4){this.myProp = "May"};
    if (this.getMonth() == 5){this.myProp = "June"};
    if (this.getMonth() == 6){this.myProp = "July"};
    if (this.getMonth() == 7){this.myProp = "August"};
    if (this.getMonth() == 8){this.myProp = "September"};
    if (this.getMonth() == 9){this.myProp = "October"};
    if (this.getMonth() == 10){this.myProp = "November"};
    if (this.getMonth() == 11){this.myProp = "December"};
};

function myFunction() {
    var d = new Date();
    d.myMet();
    document.getElementById("demo").innerHTML = d.myProp;
}
</script>
*/
