// Funções de validação do formulário de cadastro
function validarNome() {
  const inputNome = document.querySelector("#nome");
  const valorNome = inputNome.value.trim();

  if (!valorNome) {
    inputNome.classList.add("erro");
    inputNome.nextElementSibling.textContent = "O campo Nome é obrigatório";
    return false;
  }

  inputNome.classList.remove("erro");
  inputNome.nextElementSibling.textContent = "";
  return true;
}
    
function validarCampo(input, regex, mensagem) {
  const valor = input.value.trim();

  if (valor === "") {
    input.classList.add("erro");
    input.nextElementSibling.innerText = mensagem;
    return false;
  }

  if (regex && !regex.test(valor)) {
    input.classList.add("erro");
    input.nextElementSibling.innerText = "Valor inválido";
    return false;
  }

  input.classList.remove("erro");
  input.nextElementSibling.innerText = "";
  return true;
}

function validarNome() {
  const inputNome = document.getElementById("nome");
  return validarCampo(inputNome, null, "O campo Nome é obrigatório");
}

function validarEmail() {
  const inputEmail = document.getElementById("email");
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return validarCampo(inputEmail, regexEmail, "O campo E-mail é obrigatório");
}

function validarCPF() {
  const inputCPF = document.getElementById("cpf");
  const regexCPF = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  return validarCampo(inputCPF, regexCPF, "O campo CPF é obrigatório");
}

function validarTelefone() {
  const inputTelefone = document.getElementById("telefone");
  const regexTelefone = /^\(\d{2}\)\s?\d{4,5}\-\d{4}$/;
  return validarCampo(inputTelefone, regexTelefone, "O campo Telefone é obrigatório");
}

function validarSexo() {
  const inputSexo = document.getElementById("sexo");
  return validarCampo(inputSexo, null, "O campo Sexo é obrigatório");
}

function validarSenha() {
  const inputSenha = document.getElementById("senha");
  return validarCampo(inputSenha, null, "O campo Senha é obrigatório") && inputSenha.value.length >= 6;
}
  
  // Funções de validação do formulário de compra
  function validarPagamento() {
    const inputPagamento = document.getElementById("pagamento");
    const valorPagamento = inputPagamento.value.trim();
    const erroPagamento = document.querySelector(".erro-pagamento");
  
    if (valorPagamento === "") {
      inputPagamento.classList.add("input-erro");
      erroPagamento.innerText = `O campo ${inputPagamento.name} é obrigatório`;
      return false;
    }
  
    inputPagamento.classList.remove("input-erro");
    erroPagamento.innerText = "";
    return true;
  }
  
  
  function validarProdutos() {
    const inputsProdutos = document.querySelectorAll("[name='produto']");
    const selecionouProduto = Array.from(inputsProdutos).some(inputProduto => inputProduto.checked);
    const mensagemErro = document.querySelector("#produtos .erro");
    
    if (!selecionouProduto) {
      mensagemErro.textContent = "Selecione pelo menos um produto";
      return false;
    }
  
    mensagemErro.textContent = "";
    return true;
  }
  
  
  function validarQuantidades() {
    const inputsQuantidades = document.querySelectorAll("[name='quantidade']");
    const selecionouQuantidade = Array.from(inputsQuantidades).some(inputQuantidade => inputQuantidade.value !== "0");
    const mensagemErro = document.querySelector("#quantidades .erro");
  
    if (!selecionouQuantidade) {
      mensagemErro.textContent = "Selecione pelo menos uma quantidade";
      return false;
    }
  
    mensagemErro.textContent = "";
    return true;
  }
  
  async function validarFormularioCompra(event) {
    event.preventDefault();
  
    const formCompra = document.getElementById("form-compra");
  
    const pagamentoValido = await validarPagamento();
    const produtosValidos = validarProdutos();
    const quantidadesValidas = validarQuantidades();
  
    if (pagamentoValido && produtosValidos && quantidadesValidas) {
      const dadosCompra = {
        pagamento: formCompra.pagamento.value.trim(),
        produtos: Array.from(document.querySelectorAll("[name='produto']:checked")).map(inputProduto => ({
          nome: inputProduto.dataset.nome,
          quantidade: inputProduto.parentElement.nextElementSibling.querySelector("[name='quantidade']").value
        }))
      };
  
      try {
        const response = await fetch("http://localhost:3000/compras", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosCompra),
        });
  
        if (!response.ok) {
          throw new Error("Ocorreu um erro ao cadastrar a compra");
        }
  
        alert("Compra cadastrada com sucesso!");
        formCompra.reset();
      } catch (error) {
        alert(error.message);
      }
    }
  }
  
  
  function validarFormularioCompra(event) {
    event.preventDefault();
  
    const formCompra = document.getElementById("form-compra");
    const inputsProdutos = document.querySelectorAll("[name='produto']");
    const inputsQuantidades = document.querySelectorAll("[name='quantidade']");
    const dadosCompra = { pagamento: formCompra.pagamento.value.trim(), produtos: [] };
  
    inputsProdutos.forEach((inputProduto, index) => {
      if (inputProduto.checked) {
        dadosCompra.produtos.push({
          nome: inputProduto.dataset.nome,
          quantidade: inputsQuantidades[index].value,
        });
      }
    });
  
    const pagamentoValido = validarPagamento();
    const produtosValidos = validarProdutos();
    const quantidadesValidas = validarQuantidades();
  
    if (pagamentoValido && produtosValidos && quantidadesValidas) {
      fetch("http://localhost:3000/compras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCompra),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ocorreu um erro ao cadastrar a compra");
          }
          alert("Compra cadastrada com sucesso!");
          formCompra.reset();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
  
  // Event listeners
  document.getElementById("form-cadastro").addEventListener("submit", validarFormularioCadastro);
  document.getElementById("form-compra").addEventListener("submit", validarFormularioCompra);
  

// Importação da biblioteca jQuery
import $ from "jquery";

// Função principal
function main() {
  // Validação do formulário de cadastro
  const formCadastro = document.getElementById("form-cadastro");

  formCadastro.addEventListener("submit", validarFormularioCadastro);

  // Validação do formulário de compra
  const formCompra = document.getElementById("form-compra");

  formCompra.addEventListener("submit", validarFormularioCompra);
}
main();

// Script para simular uma API REST com json-server
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("banco-dados.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/compras", async (req, res, next) => {
  const { pagamento, produtos } = req.body;

  if (!pagamento || !produtos) {
    return res.status(400).json({
      mensagem: "Dados inválidos",
    });
  }

  const id = Date.now().toString();
  const data = new Date().toISOString();

  const compra = {
    id,
    data,
    pagamento,
    produtos,
  };

  router.db.get("compras").push(compra).write();

  res.status(201).json({
    mensagem: "Compra cadastrada com sucesso",
    compra,
  });
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server está rodando na porta 3000");
});

$(document).ready(() => {
  // Máscara para o campo CPF
  $("#cpf").mask("000.000.000-00");

  // Validação do formulário de compra
  $("#form-compra").submit(async (event) => {
    event.preventDefault();

   // Validar o campo de quantidade
const quantidade = $("#quantidade-ticket-premium").val();
if (quantidade < 1) {
  $("#quantidade-ticket-premium").siblings(".erro").text("Quantidade inválida");
  return;
}

// Fazer a requisição para cadastrar a compra
const pagamento = $("#pagamento").val();
const produtos = $("#produtos").val();

try {
  const response = await fetch("/compras", {
    method: "POST",
    body: JSON.stringify({ pagamento, produtos }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const { mensagem } = await response.json();
    throw new Error(mensagem);
  }

  const { compra } = await response.json();

  alert(`Compra cadastrada com sucesso! ID: ${compra.id}`);

} catch (error) {
  console.error(error);
  alert("Ocorreu um erro ao cadastrar a compra, tente novamente mais tarde.");
}
});
});

// Validar o campo de meio de pagamento
const meioPagamento = $("input[name='meio-pagamento']:checked").val();
if (!meioPagamento) {
$("#meio-pagamento-erro").text("Selecione um meio de pagamento").attr("aria-describedby", "meio-pagamento-erro");
return;
}

// Validar o campo de produtos
const produtos = [];
let produtoErro = false;
$("input[name='produto']:checked").each((index, element) => {
const produto = $(element).val();
const quantidade = parseInt(
$(element).siblings(".quantidade").find("input").val()
);
if (isNaN(quantidade) || quantidade < 1) {
$(element).siblings(".quantidade").find(".erro").text("Quantidade inválida").attr("aria-describedby", "quantidade-erro-" + index);
produtoErro = true;
} else {
produtos.push({ nome: produto, quantidade: quantidade });
}
});
if (produtoErro) {
return;
}
if (produtos.length === 0) {
$("#produto-erro").text("Selecione pelo menos um produto").attr("aria-describedby", "produto-erro");
return;
}

// Validar o campo de meio de pagamento
const meioPagamentos = $("input[name='meio-pagamento']:checked").val();
if (!meioPagamentos) {
  $("#meio-pagamento-erro").text("Selecione um meio de pagamento");
  return;
}

// Validar o campo de produtos
const produto = [];
let produtosErro = false;
$("input[name='produto']:checked").each((index, element) => {
  const { value: produto } = element;
  const quantidade = parseInt(
    $(element).siblings(".quantidade").find("input").val()
  );
  if (isNaN(quantidade) || quantidade < 1) {
    $(element).siblings(".quantidade").find(".erro").text("Quantidade inválida");
    produtoErro = true;
  } else {
    produtos.push({ nome: produto, quantidade });
  }
});
if (produtoErro) {
  return;
}
if (produtos.length === 0) {
  $("#produto-erro").text("Selecione pelo menos um produto");
  return;
}

// Enviar o formulário
const data = { quantidade, meioPagamento, produtos };
$.ajax({
  type: "POST",
  url: "http://localhost:3000/compra",
  data: JSON.stringify(data),
  contentType: "application/json",
  success: () => {
    alert("Compra realizada com sucesso!");
    location.reload();
  },
  error: () => {
    alert("Erro ao realizar a compra.");
  },
});


// Validação do formulário de cadastro
$("#form-cadastro").submit((event) => {
  event.preventDefault();
  // Validar o campo de nome
  const nome = $("#nome").val();
  if (nome.trim() === "") {
    $("#nome").siblings(".erro").text("Campo obrigatório");
    return;
  }

  // Validar o campo de e-mail
  const email = $("#email").val();
  if (email.trim() === "") {
    $("#email").siblings(".erro").text("Campo obrigatório");
    return;
  }
  if (!isValidEmail(email)) {
    $("#email").siblings(".erro").text("E-mail inválido");
    return;
  }

  // Validar o campo de CPF
  const cpf = $("#cpf").val();
  if (cpf.trim() === "") {
    $("#cpf").siblings(".erro").text("Campo obrigatório");
    return;
  }
  if (!isValidCpf(cpf)) {
    $("#cpf").siblings(".erro").text("CPF inválido");
    return;
  }

  // Validar o campo de telefone
  const telefone = $("#telefone").val();
  if (telefone.trim() === "") {
    $("#telefone").siblings(".erro").text("Campo obrigatório");
    return;
  }
  if (!isValidTelefone(telefone)) {
    $("#telefone").siblings(".erro").text("Telefone inválido");
    return;
  }
});

// Define um objeto carrinho vazio
let carrinho = {};

// Função para adicionar ao carrinho
function adicionarAoCarrinho(nome, preco, quantidade) {
  // Verifica se o item já está no carrinho
  if (carrinho[nome]) {
    // Se o item já existe, adiciona a quantidade
    carrinho[nome].quantidade += parseInt(quantidade);
  } else {
    // Se o item não existe, cria um novo objeto
    carrinho[nome] = {
      preco: preco,
      quantidade: parseInt(quantidade)
    };
  }
  // Exibe uma mensagem de sucesso
  alert("Item adicionado ao carrinho!");
}

// Função para exibir o carrinho
function exibirCarrinho() {
  // Obtém a div de exibição do carrinho
  let divCarrinho = document.getElementById("carrinho");
  // Remove todos os filhos da div de exibição do carrinho
  while (divCarrinho.firstChild) {
    divCarrinho.removeChild(divCarrinho.firstChild);
  }
  // Cria uma tabela para exibir os itens do carrinho
  let tabela = document.createElement("table");
  // Adiciona uma linha para o cabeçalho da tabela
  let cabecalho = tabela.insertRow();
  cabecalho.insertCell().appendChild(document.createTextNode("Item"));
  cabecalho.insertCell().appendChild(document.createTextNode("Quantidade"));
  cabecalho.insertCell().appendChild(document.createTextNode("Preço unitário"));
  cabecalho.insertCell().appendChild(document.createTextNode("Preço total"));
  // Adiciona uma linha para cada item no carrinho
  let total = 0;
  for (let nome in carrinho) {
    let item = carrinho[nome];
    let linha = tabela.insertRow();
    linha.insertCell().appendChild(document.createTextNode(nome));
    linha.insertCell().appendChild(document.createTextNode(item.quantidade));
    linha.insertCell().appendChild(document.createTextNode(item.preco.toFixed(2)));
    let precoTotal = item.quantidade * item.preco;
    total += precoTotal;
    linha.insertCell().appendChild(document.createTextNode(precoTotal.toFixed(2)));
  }
  // Adiciona uma linha para o total da compra
  let linhaTotal = tabela.insertRow();
  linhaTotal.insertCell();
  linhaTotal.insertCell();
  linhaTotal.insertCell().appendChild(document.createTextNode("Total:"));
  linhaTotal.insertCell().appendChild(document.createTextNode(total.toFixed(2)));
  // Adiciona a tabela à div de exibição do carrinho
  divCarrinho.appendChild(tabela);
}

// Exibe o carrinho ao carregar a página
window.onload = function() {
  exibirCarrinho();
};

