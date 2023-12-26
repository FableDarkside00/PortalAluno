<?php     
class ServerConnect{
    private $con;
    public function __construct(){
        $this->connect();
    }

    public function connect() {
        $host = "sql305.infinityfree.com";
        $user = "if0_35298262";
        $passwd = "REWZrs1vLGed";
        $db = "if0_35298262_alunos";
    
        $this->con = mysqli_connect($host, $user, $passwd, $db);
    
        if (mysqli_connect_errno()) {
            return false;
        }else {
            return true;
        }
    }
    
    public function salvarAlunos($nome, $cpf) {
        $stmt = $this->con->prepare('INSERT INTO alunos (nome, cpf) VALUES (?, ?)');
        $stmt->bind_param('ss', $nome, $cpf);
        $result = $stmt->execute();
        $stmt->close();
            
        return $result;
    }


    public function pesquisaAluno ($cpf){
        $stmt = $this->con->prepare('SELECT cpf, nome FROM alunos WHERE cpf = ?');
        $stmt->bind_param('s', $cpf);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        $stmt->close();
    
        return $result;
    }
    
}
?>    
