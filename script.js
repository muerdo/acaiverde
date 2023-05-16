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

  // Gera o documento com as respostas
  const documentContent = generateDocumentContent(answers);

  // Gera o PDF
  generatePDF(documentContent);

  // Envia o formulário
  form.submit();

  // Opcional: redireciona para uma página de confirmação após o envio
  window.location.href = 'https://google.com';
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

