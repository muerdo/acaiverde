document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('cadastroForm');
  form.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
  event.preventDefault(); // Impede o envio do formulário

  // Coleta as respostas do formulário
  const form = document.getElementById('cadastroForm');
  const formData = new FormData(form);
  const answers = Object.fromEntries(formData.entries());

  // Adiciona informações extras
  answers.dataHora = new Date().toLocaleString(); // Data e hora atual
  answers.usuario = 'Nome do usuário'; // Substitua pelo nome do usuário que cadastrou (pode ser obtido de outra forma, como um campo de nome no formulário)

  let reports = loadReports();

  // Adiciona o novo relatório à lista
  reports.push(answers);

  // Salva os relatórios atualizados
  saveReports(reports);

  // Gera o documento com as respostas
  const documentContent = generateDocumentContent(answers);

  // Gera o PDF
  generatePDF(documentContent);

  // Envia o formulário
  form.submit();

  // Opcional: redireciona para uma página de confirmação após o envio
  window.location.href = 'confirm/confirma.html';
}

function generateDocumentContent(answers) {
  const {
    dataHora,
    usuario,
    cpf,
    nome,
    dataNascimento,
    sexo,
    estadoCivil,
    rendaFamiliar,
    telefone,
    email,
    cep,
    municipio,
    uf,
    bairro,
    logradouro,
    numero,
    complemento,
    informacoesAdicionais,
    quantidadeDependentes,
    quantidadeMoradores,
    quantidadeDeficientes,
    observacoes
  } = answers;

  const documentContent = `
    Data e Hora: ${dataHora}
    Usuário: ${usuario}

    Dados Pessoais:
    CPF: ${cpf}
    Nome: ${nome}
    Data de Nascimento: ${dataNascimento}

    Sexo: ${sexo}
    Estado Civil: ${estadoCivil}
    Renda Familiar: ${rendaFamiliar}
    Telefone: ${telefone}
    E-mail: ${email}

    Endereço:
    CEP: ${cep}
    Município: ${municipio}
    UF: ${uf}
    Bairro: ${bairro}
    Logradouro: ${logradouro}
    Número: ${numero}
    Complemento: ${complemento}
    Informações Adicionais: ${informacoesAdicionais}

    Família:
    Quantidade de Dependentes: ${quantidadeDependentes}
    Quantidade de Moradores: ${quantidadeMoradores}
    Quantidade de Pessoas com Deficiência: ${quantidadeDeficientes}

    Observações: ${observacoes}
  `;

  return documentContent;
}
function generatePDF(documentContent) {
  const pdf = new jsPDF();
  pdf.text(documentContent, 10, 10);
  pdf.save('formulario_cadastro.pdf');
}

function getFormData() {
  const formData = {};

  // Dados pessoais
  formData.cpf = document.getElementById('cpf').value;
  formData.nome = document.getElementById('nome').value;
  formData.dataNascimento = document.getElementById('data-nascimento').value;

  // Sexo
  const sexoInputs = document.getElementsByName('sexo');
  for (const input of sexoInputs) {
    if (input.checked) {
      formData.sexo = input.value;
      break;
    }
  }

  // Estado civil
  formData.estadoCivil = document.getElementById('estado-civil-select').value;

  // Renda familiar
  formData.rendaFamiliar = document.getElementById('renda-familiar-input').value;
  formData.telefone = document.getElementById('telefone').value;
  formData.email = document.getElementById('email').value;

  // Endereço
  formData.cep = document.getElementById('cep').value;
  formData.municipio = document.getElementById('municipio').value;
  formData.uf = document.getElementById('uf').value;
  formData.bairro = document.getElementById('bairro').value;
  formData.logradouro = document.getElementById('logradouro').value;
  formData.numero = document.getElementById('numero').value;
  formData.complemento = document.getElementById('complemento').value;
  formData.informacoesAdicionais = document.getElementById('informacoes-adicionais').value;

  // É chefe de família?
  const chefeFamiliaInputs = document.getElementsByName('chefe-familia');
  for (const input of chefeFamiliaInputs) {
    if (input.checked) {
      formData.chefeFamilia = input.value;
      break;
    }
  }

  // Quantidade de dependentes
  formData.quantidadeDependentes = document.getElementById('quantidade-dependentes').value;

  // Quantidade de moradores
  formData.quantidadeMoradores = document.getElementById('quantidade-moradores').value;

  // Quantidade de pessoas com deficiência
  formData.quantidadeDeficientes = document.getElementById('quantidade-deficientes').value;

  // Observações
  formData.observacoes = document.getElementById('observacoes-input').value;
  localStorage.setItem('formData', JSON.stringify(formData));

  return formData;
}
