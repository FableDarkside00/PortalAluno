<?php 
include("dbconnect.php");

$respostas = array();

function resquistaAluno($cpf) {
    global $respostas;    
    
    $server = new ServerConnect();
    
    if ($server->connect() !== false) {
        $request_cpf = $server->pesquisaAluno($cpf);
        if ($request_cpf !== null) {
            $respostas[] = $request_cpf;
        } else {
            $respostas[] = ['erro' => 'Aluno não encontrado'];
        }
    } else {
        $respostas[] = ['erro' => 'Não foi possivel se conectar com o Servidor: '];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dados_cpf = file_get_contents('php://input');
    $dados = json_decode($dados_cpf, true);

    if (isset($dados['cpf'])) {
        $cpf = $dados['cpf'];
        resquistaAluno($cpf);
    } else {
        $respostas[] = ['erro' => 'CPF não fornecido'];
    }
}

echo json_encode($respostas);
?>
