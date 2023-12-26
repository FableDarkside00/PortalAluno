const verificar = document.querySelector('.verificar')

verificar.addEventListener("click", (evento)=>{
   evento.preventDefault()
   
   const pesquisa_cpf = document.querySelector('.pesquisa_cpf')
   let resposta_nome = document.querySelector('.resposta_nome')
   let resposta_cpf = document.querySelector('.resposta_cpf')
   
   const cpfVal = pesquisa_cpf.value

    if (cpfVal === "") {
        alert("Preencha todos os campos!")
    }else{


    const dados = {
        cpf : cpfVal
    }

    const opcoes = {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json' 
        }, 
        body : JSON.stringify(dados) 
    }


    fetch('http://comoamovc.free.nf/teste/api_teste/request_aluno.php', opcoes)
    .then(resposta =>{
        if (resposta.ok) {
            return resposta.json()
        }else{
            throw new Error('Erro na resposta da rede: ' + resposta.status )
        }
    }).then(dados_resposta =>{
        dados_resposta.forEach(resposta => {
            if (resposta !== "" && resposta !== null) {
                console.log(resposta)
                resposta_nome.textContent = `Nome: ${JSON.stringify(resposta.nome)}`
                resposta_cpf.textContent = `CPF: ${JSON.stringify(resposta.cpf)}`    
            }else{
                console.error("Erro ao receber dados [cpf, nome]: " + JSON.stringify(resposta))
            }
        })

    }).catch(erro =>{
        console.error("Erro no resquest_fetch: " + erro)
    })

    }

})

