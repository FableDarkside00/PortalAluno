<?php 
include ("dbconnect.php");

class Aluno {
    private $nome;
    private $cpf;

    public function __construct($nome, $cpf) {
        $this->nome = $nome;
        $this->cpf = $cpf;
    }

    public function getNome() {
        return $this->nome;
    }

    public function getCpf() {
        return $this->cpf;
    }
}

$respostas = array();  

function salvaAluno($aluno) {
    global $respostas;  
    
    $nome = $aluno->getNome();
    $cpf = $aluno->getCpf();

    $server = new ServerConnect();
    $result = $server->salvarAlunos($nome, $cpf);

    if ($result) {
       $respostas[] = ['sucesso' => true];
    } else {
       $respostas[] = ['erro' => 'Falha ao salvar o aluno'];
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receber dados JSON do corpo da requisição
    $dados_json = file_get_contents('php://input');
    
    // Converter dados JSON para um array associativo
    $dados = json_decode($dados_json, true);

    // Verificar se os dados estão presentes e têm a estrutura esperada
    if (isset($dados['nome']) && isset($dados['cpf'])) {
        // Criar um objeto Aluno com os dados recebidos
        $aluno = new Aluno($dados['nome'], $dados['cpf']);

        // Chamar a função para salvar o aluno
        if (salvaAluno($aluno)) {
            // Adicionar os valores à variável $respostas
            $respostas[] = ['valores' => 'Nome: ' . $aluno->getNome() . " " . 'CPF: '. $aluno->getCpf()];
        } else {
            // Tratar falha ao salvar
            $respostas[] = ['erro' => 'Falha ao salvar o aluno'];
        }

    } else {
        // Se os dados não estão presentes ou têm uma estrutura incorreta
        $respostas[] = ['erro' => 'Dados inválidos'];
    }
}

// Enviar todas as respostas de uma só vez no final do script
echo json_encode($respostas);
?>