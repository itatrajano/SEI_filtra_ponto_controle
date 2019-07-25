//Array com as opções, incluindo, a primeira opção a ser exibida
var pontos_de_controle = ["Todos os Pontos de Controle"];

/********Obtém os Pontos de Controle da Página*************************************************************************************************/
//Retorna uma NodeList com os links que atendem à consulta (Barras invertidas duplas (\\) antes de cada caractere especial)
var lista = document.querySelectorAll('a[href^=controlador\\.php\\?acao\\=andamento\\_situacao\\_gerenciar]');

// Da lista acima, obtém o valor de cada atributo "onmouseover" e adiciona o nome da etapa ao array "pontos_de_controle"
var pontos_de_controle_duplicados = [];
for (let i = 0; i < lista.length; i++) {
  //Barra invertida (\) antes do (')
  pontos_de_controle_duplicados.push(lista[i].getAttribute('onmouseover').split("\'")[1]);
}

//Função que filtra elementos duplicados
function removeDuplicateUsingSet(arr){
  let unique_array = Array.from(new Set(arr))
  return unique_array
}
//Lista sem elementos repetidos
var pontos_de_controle = removeDuplicateUsingSet(pontos_de_controle_duplicados);

/********Cria o menu suspenso com os Pontos de Controle*****************************************************************************************/
//Cria o elemento <select> dentro de um elemento <div>
var div = document.createElement("DIV");
var menu = document.createElement("SELECT");

//Adiciona a opção "Exibir Todos"
var opcao = document.createElement("OPTION");
opcao.setAttribute("value", "Exibir Todos os Pontos de Controle");
var nome_opcao = "Exibir Todos os Ponto de Controle";
var texto = document.createTextNode("Exibir Todos Pontos de Controle");
opcao.appendChild(texto);
menu.appendChild(opcao);

//Relaciona o menu à função "filtra()"
menu.onchange = function(){filtra()};

//Adiciona o menu à página
div.appendChild(menu);

//Usando o nome do array "pontos_de_controle", inclui a opção no elemento "menu"
for (let i = 0; i < pontos_de_controle.length; i++) {
  opcao = document.createElement("OPTION");
  opcao.setAttribute("value", pontos_de_controle[i]);
  nome_opcao = pontos_de_controle[i];
  texto = document.createTextNode(pontos_de_controle[i]);
  opcao.appendChild(texto);
  menu.appendChild(opcao);
}

//Referência de localização do menu
var local = document.getElementById('divFiltro');

//Adiciona o Menu à página
local.prepend(div);


//*********Exbe apenas os processos com o Ponto de Controle Selecionado************************************************************/
//Cria um NodeList com os processos (classe infraTrClara)
var elementos = document.querySelectorAll('.infraTrClara,.infraTrseippalerta,.infraTrseippcritico');

//Função que é executada quando o menu é alterado
function filtra(){
  //Guarda o valor selecionado
  var valor = menu.value;
  //Exibe todos os Pontos de Controle
  if (valor == "Exibir Todos os Pontos de Controle") {
    for (let i = 0; i < elementos.length; i++) {
      elementos[i].style.visibility = "visible";
    }
  }
  //Esconde os Pontos de Controle não selecionados
  else {
    for (let i = 0; i < elementos.length; i++) {
      if (elementos[i].innerHTML.includes(valor)) {
        elementos[i].style.visibility = "visible";
      }else{
        elementos[i].style.visibility = "collapse";
      }
    }
  }
}
