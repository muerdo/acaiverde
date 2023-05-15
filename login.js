var usuarios = [
    { codigo: 'usuario1', senha: 'senha1' },
    { codigo: 'usuario2', senha: 'senha2' },
    { codigo: 'usuario3', senha: 'senha3' },
    { codigo: 'usuario4', senha: 'senha4' },
    { codigo: 'usuario5', senha: 'senha5' },
    { codigo: 'usuario6', senha: 'senha6' },
    { codigo: 'usuario7', senha: 'senha7' },
    { codigo: 'usuario8', senha: 'senha8' },
    { codigo: 'usuario9', senha: 'senha9' },
    { codigo: 'usuario10', senha: 'senha10' }
  ];
  
  function autenticar(event) {
    event.preventDefault();
  
    var codigoAcesso = document.getElementById('codigoAcesso').value;
    var senha = document.getElementById('senha').value;
  
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].codigo === codigoAcesso && usuarios[i].senha === senha) {
        alert('Autenticado com sucesso!');
        window.location.href = '/home/franz/acai/cadastro/cadastro.html';
        return;
      }
    }
  
    alert('Usuário ou senha incorretos!');
  }
  
  var entrarBtn = document.getElementById('entrarBtn');
  entrarBtn.addEventListener('click', autenticar);
  