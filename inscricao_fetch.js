//Variaveis

let nome = document.querySelector('.nome')
let cpf = document.querySelector('.cpf')
const enviar = document.querySelector('.enviar')
const gerador = document.querySelector('.gerador')

//Gerador
gerador.addEventListener("click", (gerador_evento)=>{
    gerador_evento.preventDefault()

    fetch("https://api.invertexto.com/v1/faker?token=5907|SPIar9wAgkoLvtND5rAvZFV8zOPPicmK&fields=name,cpf&locale=pt_BR")
    
    .then(resposta =>{
        if (resposta.ok) {
            console.log("Tudo ok")
            return resposta.json()
        }else{
            console.error("Não foi possivel achar a API")
        }
    }).then(dados=>{
        if (dados !== "") {
            let nome_gerado = dados.name
            let cpf_gerado = dados.cpf 
            let cpf_tratado = cpf_gerado.replace(/\D/g, "")
     
            nome.value = nome_gerado
            cpf.value = cpf_tratado            
        }else{
            console.error("Não foi possivel obter dados")
            alert.error("Não foi possivel obter dados")
        }
        
    }).catch(erro=>{
        console.error("Não foi possivel se conectar a API" + erro)
    })

})

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
    fetch('http://comoamovc.free.nf/teste/api_teste/insert_aluno.php', opcoes)
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