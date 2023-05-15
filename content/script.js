document.addEventListener('DOMContentLoaded', function() {
var form = document.getElementById('cadastroForm');
if (form) {
  form.addEventListener('submit', handleFormSubmit);
} else {
  console.error('Elemento do formulário não encontrado');
}


// Função para manipular as alterações nos campos do formulário
function handleFormChanges() {
  var pcdField = document.getElementById('pcdFamilia');
  var numeroPCDField = document.getElementById('numeroPCD');
  if (pcdField.value === 'S') {
    numeroPCDField.disabled = false; // Habilita o campo "Número de PCD"
  } else {
    numeroPCDField.disabled = true; // Desabilita o campo "Número de PCD"
    numeroPCDField.value = ''; // Limpa o valor do campo
  }
}

function handleFormSubmit(event) {
  event.preventDefault(); // Evita o comportamento padrão de envio do formulário

  // Obter os valores dos campos do formulário
  var nomeBeneficiario = document.getElementById('nomeBeneficiario').value;
  var sexo = getSelectedValue('sexo');
  var dataNascimento = document.getElementById('dataNascimento').value;
  var estadoCivil = getSelectedValue('estadoCivil');
  var cpf = document.getElementById('cpf').value;
  var nomeMae = document.getElementById('nomeMae').value;
  var rg = document.getElementById('rg').value;
  var endereco = document.getElementById('endereco').value;
  var possuiRenda = getSelectedValue('possuiRenda');
  var mulherChefeFamilia = getSelectedValue('mulherChefeFamilia');
  var idososFamilia = getSelectedValue('idososFamilia');
  var pcdFamilia = getSelectedValue('pcdFamilia');
  var numeroPessoasFamilia = document.getElementById('numeroPessoasFamilia').value;
  var numeroAdolescentes = document.getElementById('numeroAdolescentes').value;
  var numeroCriancas = document.getElementById('numeroCriancas').value;
  var numeroIdosos = document.getElementById('numeroIdosos').value;
  var numeroPCD = document.getElementById('numeroPCD').value;
  var recebeBolsaFamilia = getSelectedValue('recebeBolsaFamilia');
  var idosos = getSelectedValue('idosos');
  var pcd = getSelectedValue('pcd');
  var familiaMenoresDeficiencia = getSelectedValue('familiaMenoresDeficiencia');
  var coabitacaoFilhosMenores = document.getElementById('coabitacaoFilhosMenores').value;
  var aluguelFilhosMenores = document.getElementById('aluguelFilhosMenores').value;
  var medidaProtetivaLei = getSelectedValue('medidaProtetivaLei');
  var medidasSocioeducativas = getSelectedValue('medidasSocioeducativas');
  var rendaFamiliar = document.getElementById('rendaFamiliar').value;
  var termoCiencia = document.getElementById('termoCiencia').checked;
  var anexoPCD = document.getElementById('anexoPCD').files[0];
  var reciboBolsaFamilia = document.getElementById('reciboBolsaFamilia').files[0];
  // Registra o log do cadastro
  registerLog(nomeBeneficiario, protocolo);
  

  // Gera o documento com a ficha cadastral
  generateFichaCadastral(nomeBeneficiario, protocolo);
  var fichaCadastral = {
    nomeBeneficiario: nomeBeneficiario,
    sexo: sexo,
    dataNascimento: dataNascimento,
    estadoCivil: estadoCivil,
    cpf: cpf,
    nomeMae: nomeMae,
    rg: rg,
    endereco: endereco,
    possuiRenda: possuiRenda,
    mulherChefeFamilia: mulherChefeFamilia,
    idososFamilia: idososFamilia,
    pcdFamilia: pcdFamilia,
    numeroPessoasFamilia: numeroPessoasFamilia,
    numeroAdolescentes: numeroAdolescentes,
    numeroCriancas: numeroCriancas,
    numeroIdosos: numeroIdosos,
    numeroPCD: numeroPCD,
    recebeBolsaFamilia: recebeBolsaFamilia,
    idosos: idosos,
    pcd: pcd,
    familiaMenoresDeficiencia: familiaMenoresDeficiencia,
    coabitacaoFilhosMenores: coabitacaoFilhosMenores,
    aluguelFilhosMenores: aluguelFilhosMenores,
    medidaProtetivaLei: medidaProtetivaLei,
    medidasSocioeducativas: medidasSocioeducativas,
    rendaFamiliar: rendaFamiliar,
    termoCiencia: termoCiencia
  };


  function validarIdade() {
    var dataNascimento = document.getElementById('dataNascimento').value;
  
    // Extrair o dia, mês e ano da data de nascimento
    var dia = dataNascimento.substring(0, 2);
    var mes = dataNascimento.substring(2, 4);
    var ano = dataNascimento.substring(4, 8);
  
    // Verificar se a data é válida
    if (dia.length === 2 && mes.length === 2 && ano.length === 4) {
      var data = new Date(ano, parseInt(mes) - 1, dia); // Subtrair 1 do mês, pois começa em 0 (janeiro)
      var idade = calcularIdade(data);
  
      var campoIdoso = document.getElementById('idososFamilia');
  
      if (idade > 60) {
        campoIdoso.checked = true;
      } else {
        campoIdoso.checked = false;
      }
  
      // Exibir a data formatada no campo de input
      var dataFormatada = dia + '-' + mes + '-' + ano;
      dataNascimentoField.value = dataFormatada;
    }
  }
  


  // Exibir a ficha cadastral no console (pode ser substituído pelo envio para o backend)
  console.log(fichaCadastral);
  // Obtém os anexos
  var anexoPCD = document.getElementById('anexoPCD').files[0];
  var reciboBolsaFamilia = document.getElementById('reciboBolsaFamilia').files[0];

  // Envia os anexos para o backend (exemplo utilizando FormData)
  var formData = new FormData();
  formData.append('anexoPCD', anexoPCD);
  formData.append('reciboBolsaFamilia', reciboBolsaFamilia);

  // Envia o formulário e os anexos para o backend para processamento
  fetch('/caminho-para-o-backend', {
    method: 'POST',
    body: formData
  })
    .then(function (response) {
      // Lida com a resposta do backend
      if (response.ok) {
        // Exibe uma mensagem de sucesso ou redireciona para uma página de confirmação
        console.log('Formulário enviado com sucesso!');
      } else {
        console.error('Erro ao enviar o formulário:', response.statusText);
      }
    })
    .catch(function (error) {
      console.error('Erro ao enviar o formulário:', error);
    });
}

// Função para gerar um protocolo único (exemplo)
function generateProtocol() {
  var timestamp = new Date().getTime();
  var random = Math.floor(Math.random() * 10000);
  return 'PROTO' + timestamp + random;
}

// Função para registrar o log do cadastro (exemplo)
function registerLog(nomeBeneficiario, protocolo) {
  console.log('Cadastro realizado por:', nomeBeneficiario);
  console.log('Protocolo:', protocolo);
}

// Função para gerar o documento com a ficha cadastral (exemplo)
function generateFichaCadastral(nomeBeneficiario, protocolo) {
  // Código para gerar o documento com os dados fornecidos
  
  var conteudoDocumento = 'Ficha Cadastral\n\n';

  conteudoDocumento += 'Nome do Beneficiário: ' + nomeBeneficiario + '\n';
  conteudoDocumento += 'Protocolo: ' + protocolo + '\n';
  // ...

  // Exibe o conteúdo do documento em uma nova janela ou realiza o download
  var documento = window.open('', '_blank');
  documento.document.open();
  documento.document.write('<pre>' + conteudoDocumento + '</pre>');
  documento.document.close();
}


var form = document.getElementById('cadastroForm');
form.addEventListener('change', handleFormChanges);

form.addEventListener('submit', handleFormSubmit);

});