window.onload = function(){
	//carregarPoltronas();
	carregarDestinos();
	configurarDtViagem_min();
	atribuirEvento("cpfPass","focusout",validarCPF);
	atribuirEvento("mailPass","focusout",validarEmail);
	atribuirEvento("nomePass","focusout",validarNome);
	atribuirEvento("btnAvancar","click",avancar);
	atribuirEvento("btnCompra","click",confirmar);
	var btnCloseDados = document.getElementsByClassName("close")[0];
	btnCloseDados.onclick = function(){
		document.getElementById("dados").style.display = "none";
		document.getElementsByClassName("avancar")[0].style.display = "block";
	}

	var btnCloseBilhete = document.getElementsByClassName("close")[1];
	btnCloseBilhete.onclick = function(){
		document.getElementById("bilhete").style.display = "none";
		document.getElementsByClassName("avancar")[0].style.display = "block";
		document.getElementById("areaBilhete").style.display = "none";
	}
	var f = setInterval(function(){
		if (verificaCamposNecessarios(1)) {
			carregarPoltronas();
			clearInterval(f);
		}
	},1000);

	// window.onclick = function(event){
	// 	var divDados = document.getElementById("dados");
	// 	if (event.target == divDados) {
	// 		divDados.style.display= "none";
	// 	}
	// }
}


var imgPoltronas = document.getElementsByClassName("polt");
var listaPoltronas = [];
var pltDisp = 0;

/*
	Função responsável por gerar e numerar as imgs das poltronas
*/
function numPoltrona(poltrona,pos) {
	imgPoltronas[pos].innerHTML = "<a id='" + poltrona +"' href='#' onclick='selecionarPoltrona(" +poltrona+","+pos+");'>" +
				 "<figure>" +
						"<img src='imgs/poltrona2_disp.png'>" +
						"<figcaption>" + (poltrona) + "</figcaption>" +
				 "</figure>" +
			"</a>";
	pltDisp++;
}

/*
	Função responsavel por destribuir as poltronas em sua respectiva fila
*/
function carregarPoltronas(){
	var filaPolt1 = 37;
	var filaPolt2 = 38;
	var filaPolt3 = 39;
	var filaPolt4 = 40;

	for (i=0; i < imgPoltronas.length; i++) {
		if (i<=9) {
			numPoltrona(filaPolt1,i);
			filaPolt1 = (filaPolt1 - 4);
		} else if (i<=19) {
			numPoltrona(filaPolt2,i);
			filaPolt2 = (filaPolt2 - 4);
		} else if (i<=29) {
			numPoltrona(filaPolt3,i);
			filaPolt3 = (filaPolt3 - 4);
		} else {
			numPoltrona(filaPolt4,i);
			filaPolt4 = (filaPolt4 - 4);
		}
	}
	document.getElementById("cortina").style.display = "none";
	document.getElementById("lotacao").style.display="flex";
	document.getElementsByClassName("lbls")[0].style.display = "inline-block";
}

/*
	Função responsável por trocar a img da poltrona
*/
function selecionarPoltrona(plt,p){
	imgPoltronas[p].innerHTML = "<a id='" + plt +"' href='#' onclick='cancelarPoltrona("+plt+","+p+");'>" +
				 "<figure>" +
						"<img src='imgs/poltrona2_indisp.png'>" +
						"<figcaption>" + (plt) + "</figcaption>" +
				 "</figure>" +
			"</a>";
	carregarPassagens();
	calcularTotal();
	listaPoltronas.push(plt);
	pltDisp--;
	atualizaLotacao();
}

/*
	Função responsável por trocar a img da poltrona
*/
function cancelarPoltrona(plt,p){
	//document.getElementsByClassName("polt")[2].firstChild.id; imgPoltronas
	if(confirm("Cancelar poltrona?")){
	imgPoltronas[p].innerHTML = "<a id='" + plt +"' href='#' onclick='selecionarPoltrona(" +plt+","+p+");'>" +
				 "<figure>" +
						"<img src='imgs/poltrona2_disp.png'>" +
						"<figcaption>" + (plt) + "</figcaption>" +
				 "</figure>" +
			"</a>";
	listaPoltronas.splice(0,1,plt);
	pltDisp++;
	atualizaLotacao();
	calcularTotal();
	}
}


/*
	Função responsável por gerar cada item no select destino
*/
function carregarDestinos(){
	for (i in cidades) {
		var x = document.createElement("OPTION");
    x.setAttribute("value", cidades[i]);
		x.setAttribute("onclick", 'carregarHorarios("'+cidades[i]+'")');
    var t = document.createTextNode(cidades[i]);
    x.appendChild(t);
    document.getElementById("destino").appendChild(x);
	}
}

/*
	Função responsável por gerar cada hora no select horario de acordo com o destino
*/
function carregarHorarios(dest){
		resetById("horario");
		var horarios = tabela[dest].horario.join();

		do
		{
			var hora = horarios.split(",", 1);
			var horarios = horarios.substr(horarios.search(",")+1);

			if (validarHora(hora.toString())) {
				var x = document.createElement("OPTION");
    		x.setAttribute("value", hora);
    		var t = document.createTextNode(hora);
    		x.appendChild(t);
				document.getElementById("horario").appendChild(x);
			}
		}
		while(horarios.includes(","));
		carregarTarifa();
}

/*
	Função genérica responsável por remover todas as tags filhas
	atraves do id
*/
function resetById(id){
	var elem = document.getElementById(id);
	while (elem.hasChildNodes()) {
	    elem.removeChild(elem.firstChild);
	}
}

/*
	Função que valida se as horas do select horario é maior do
	a hora atual
*/
function validarHora(h) {
	var horaAtual = new Date();
	var dt_viagem = configurarDtViagem_value();// document.getElementById("dt_Viagem").value;

	if (dt_viagem == "") {
		var horaViagem = new Date();
  } else {
		var horaViagem = new Date(dt_viagem);
	}

	horaViagem.setHours(h.slice(0,2));
	horaViagem.setMinutes(h.slice(3,5));

	if(horaViagem.getFullYear() > horaAtual.getFullYear()){return true;}

	if(horaViagem.getFullYear() == horaAtual.getFullYear())
	{
		if (horaViagem.getMonth() > horaAtual.getMonth())
			{return true;}
		else if (horaViagem.getMonth() == horaAtual.getMonth())
		{
			if (horaViagem.getDate() > horaAtual.getDate())
				{return true;}
			else if (horaViagem.getDate() == horaAtual.getDate())
			{
				if (horaViagem.getHours() > horaAtual.getHours())
					{return true;}
				else if (horaViagem.getHours() == horaAtual.getHours())
			  {
					if (horaViagem.getMinutes() > horaAtual.getMinutes())
						{return true;}
				}
			}
		}
	}
	return false;
}

function verificaCamposNecessarios(flag){

	var indDest = document.getElementById("destino").selectedIndex;
	var destino = document.getElementById("destino").options[indDest].value;
	var data = document.getElementById("dt_Viagem").value;
	var indHor = document.getElementById("horario").selectedIndex;
	var horario = document.getElementById("horario").options[indHor].value;
	var nome = document.getElementById("nomePass").value;
	var cpf = document.getElementById("cpfPass").value;
	var email = document.getElementById("mailPass").value;

	switch(flag){
		case 1:
			if(destino == "" || data == "" || horario == ""){
			return false;

		}
		break;
		case 2:
			if (destino == ""){alert("Por favor escolha um destino"); return false;}
			if (data == ""){alert("Por favor escolha uma data"); return false;}
			if (horario == ""){alert("Por favor escolha um horario"); return false;}
			if (nome == ""){alert("Por favor digite o nome do passageiro"); return false;}
			if (cpf == ""){alert("Por favor digite o cpf do passageiro"); return false;}
			if (email == ""){alert("Por favor digite o e-mail do passageiro"); return false;}
	}
	return true;
}

function atualizaLotacao() { //utilizar jquery
  var barra = document.getElementById("barra");
	var qtdPlt = 40;
	if (barra.style.width == ""){
		barra.style.width = 0 + "%";
	}
		var valor = barra.style.width;
		var progresso = parseFloat(valor.slice(0,valor.indexOf("%")));
		progresso = (qtdPlt - pltDisp) / qtdPlt * 100;
	  barra.style.width = progresso + "%";
	  barra.innerHTML = progresso + "%";
}

function carregarTarifa(){
	var labelTarifa = document.getElementById("trfPass");
	var indDest = document.getElementById("destino").selectedIndex;
	var dest = document.getElementById("destino").options[indDest].value;
	labelTarifa.textContent = "R$" + tabela[dest].tarifa;
	sessionStorage.setItem("tarifa", labelTarifa.textContent);
	labelTarifa.style.display = "in-line";
}

function carregarPassagens(){
	var labelPass = document.getElementById("vlrPass");
	if (labelPass.textContent == "") {
		labelPass.textContent = 1;
	} else {
		labelPass.textContent = parseInt(labelPass.textContent) + 1;
	}
	sessionStorage.setItem("qtd", labelPass.textContent);
	labelPass.style.display = "in-line";
}

function calcularTotal(){
	var total = document.getElementById("total");
	var tarifa = document.getElementById("trfPass").textContent;
	var qtdPass = document.getElementById("vlrPass").textContent;
	var trf = parseFloat(tarifa.slice(2,tarifa.length));
	var n = parseInt(qtdPass);
	var x = trf * n;
	total.maxlength = "5";
	total.textContent = "R$ " + x.toFixed(2);
	sessionStorage.setItem("total", total.textContent);
}

function avancar(){
	var nome = sessionStorage.getItem("passageiro");
	var cpf = sessionStorage.getItem("cpf");
	var mail = sessionStorage.getItem("email");
	var qtd = sessionStorage.getItem("qtd");
	var valor = sessionStorage.getItem("tarifa");
	var total = sessionStorage.getItem("total");

	document.getElementById("dados").children[1].children[1].textContent = nome;
	document.getElementById("dados").children[1].children[3].textContent = mail;
	document.getElementById("dados").children[1].children[5].textContent = cpf;
	document.getElementById("dados").children[2].children[1].textContent = qtd;
	document.getElementById("dados").children[2].children[3].textContent = valor;
	document.getElementById("dados").children[2].children[5].textContent = total;

	document.getElementsByClassName("avancar")[0].style.display = "none";
	document.getElementById("dados").style.display = "block";
}

function confirmar(){
	var nome = sessionStorage.getItem("passageiro");
	var cpf = sessionStorage.getItem("cpf");
	var mail = sessionStorage.getItem("email");
	var qtd = sessionStorage.getItem("qtd");
	var valor = sessionStorage.getItem("tarifa");
	var total = sessionStorage.getItem("total");
	var indDest = document.getElementById("destino").selectedIndex;
	var destino = document.getElementById("destino").options[indDest].value;
	var data = document.getElementById("dt_Viagem").value;
	var indHor = document.getElementById("horario").selectedIndex;
	var horario = document.getElementById("horario").options[indHor].value;

	document.getElementById("bilhete").children[1].children[0].children[1].textContent = nome;
	document.getElementById("bilhete").children[1].children[1].children[1].textContent = mail;
	document.getElementById("bilhete").children[1].children[2].children[1].textContent = cpf;

	document.getElementById("bilhete").children[1].children[4].children[1].textContent = emissao;
	document.getElementById("bilhete").children[1].children[4].children[3].textContent = horaAtual;
	document.getElementById("bilhete").children[1].children[5].children[1].textContent = agencia;
	document.getElementById("bilhete").children[1].children[5].children[3].textContent = numPassagem;
	document.getElementById("bilhete").children[1].children[6].children[1].textContent = tabela[destino].linha;
	document.getElementById("bilhete").children[1].children[6].children[3].textContent = tabela[destino].itinarario;

	document.getElementById("bilhete").children[1].children[8].children[1].textContent = origem;
	document.getElementById("bilhete").children[1].children[8].children[3].textContent = destino;
	document.getElementById("bilhete").children[1].children[9].children[1].textContent = data;
	document.getElementById("bilhete").children[1].children[9].children[3].textContent = tabela[destino].horario[0][indHor];
	document.getElementById("bilhete").children[1].children[10].children[1].textContent = listaPoltronas.sort();
	document.getElementById("bilhete").children[1].children[10].children[3].textContent = tabela[destino].plataforma;

	document.getElementById("bilhete").children[1].children[12].children[1].textContent = valor;
	document.getElementById("bilhete").children[1].children[12].children[3].textContent = qtd;
	document.getElementById("bilhete").children[1].children[13].children[1].textContent = "R$" + tabela[destino].pedagio;
	document.getElementById("bilhete").children[1].children[13].children[3].textContent = "R$" + tabela[destino].taxa;
	document.getElementById("bilhete").children[1].children[14].children[1].textContent = total;

	document.getElementById("dados").style.display = "none";
	document.getElementById("bilhete").style.display = "block";
	document.getElementById("areaBilhete").style.display = "block";
}
