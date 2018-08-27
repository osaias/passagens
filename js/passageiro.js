function validarCPF()
  {
    var re_cpf = /^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/;
    var cpf = document.getElementById("cpfPass");
    if(re_cpf.test(cpf.value)){
      cpf.value = cpf.value.replace(re_cpf, "$1.$2.$3-$4");
      sessionStorage.setItem("cpf", cpf.value);
    } else {
      alert("CPF Inválido: o cpf deve conter 11 numeros sem pontos ou caracteres")
  }
}
function validarEmail(){
  var re_email = /^([\w-]+(\.[\w-]+)*)@(([\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(\.[a-z][2])?)$/i;
  var email = document.getElementById("mailPass");
  if (!re_email.test(email.value)){
    alert("Email Inválido: verifique a ortografia e o endereço do email.");
  }
  sessionStorage.setItem("email", email.value);
}

function validarNome(){
  var passageiro = document.getElementById("nomePass");
  if (passageiro.value == ""){
    alert("Campo Inválido: Digite o nome do passageiro.");
  }
  sessionStorage.setItem("passageiro", passageiro.value);
}
