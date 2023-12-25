//Variaveis

const nome = document.querySelector('.nome')
const cpf = document.querySelector('.cpf')
const enviar = document.querySelector('.enviar')

//Inscrição

enviar.addEventListener("click", (evento) => {
    evento.preventDefault()
    
    let nomeVal = nome.value;
    let cpfVal = cpf.value;    
    
    if (nomeVal === "" || cpfVal === "") {
        alert('Preencha todos os campos');
    } else {

    //Objeto de dados 
    const dados = {
        nome : nomeVal,
        cpf: cpfVal
    }

    //Opções
    const opcoes = {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json' 
        }, 
        body : JSON.stringify(dados) 
    }

    //Requisição PHP
    fetch('insert_aluno.php', opcoes)
    .then(resposta =>{
        if (resposta.ok) {
            return resposta.json()
        }else{
            throw new Error('Erro na resposta da rede: ' + resposta.status )
        }
    })
    .then(dado_resposta => {
        dado_resposta.forEach(resposta => {
            if (resposta !== "" && resposta !== null) {
                alert('Cadastrado com sucesso');
                console.log('Cadastrado com sucesso');
            } else {
                console.error('Erro ao cadastrar: ' + JSON.stringify(resposta));
            }
        })
    })
        .catch(erro => {
        console.error('Erro no Fetch: ' + erro);
    });    

}

})





