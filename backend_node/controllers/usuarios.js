import { db } from "../db.js";

// Função para processar o login
export const login = (req, res) => {
  const { email, senha } = req.body;

  // Verifica no banco de dados se o usuário existe
  const q = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
  db.query(q, [email, senha], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erro interno no servidor", error: err });
    }

    if (results.length > 0) {
      // Login bem-sucedido
      return res.status(200).json({ message: "Login bem-sucedido!", user: results[0] });
    } else {
      // Credenciais inválidas
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }
  });
};

// Função para listar os usuários
export const getusuarios = (_, res) => {
  const q = "SELECT * FROM usuarios ORDER BY nome";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ message: "Erro ao buscar usuários", error: err });
    return res.status(200).json(data);
  });
};

// Função para adicionar um novo usuário
export const addusuarios = (req, res) => {
  console.log("Dados recebidos:", req.body); // Log para ver os dados recebidos

  const q = "INSERT INTO usuarios (`nome`, `email`, `senha`) VALUES (?)";
  const values = [req.body.nome, req.body.email, req.body.senha];

  db.query(q, [values], (err) => {
    if (err) {
      console.error("Erro ao inserir no banco de dados:", err); // Log do erro
      return res.status(500).json({ message: "Erro ao criar usuário", error: err });
    }
    return res.status(200).json("Registro criado com sucesso");
  });
};

// Função para atualizar um usuário
export const updateusuarios = (req, res) => {
  const q = "UPDATE usuarios SET `nome` = ?, `email` = ?, `senha` = ? WHERE `codigo` = ?";
  const values = [req.body.nome, req.body.email, req.body.senha];

  db.query(q, [...values, req.params.codigo], (err) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao atualizar usuário", error: err });
    }
    return res.status(200).json("Registro atualizado com sucesso");
  });
};

// Função para deletar um usuário
export const deleteusuarios = (req, res) => {
  const { codigo } = req.params;
  console.log("Deletando usuário com código:", codigo); // Log para verificar o valor do código

  // SQL para deletar o usuário com base no código fornecido
  const q = "DELETE FROM usuarios WHERE `codigo` = ?";

  // Realiza a consulta de exclusão no banco de dados
  db.query(q, [codigo], (err, result) => {
    if (err) {
      console.error("Erro ao deletar no banco de dados:", err); // Log do erro
      return res.status(500).json({ message: "Erro ao deletar usuário", error: err });
    }

    // Se nenhum usuário foi afetado pela deleção
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Se a deleção for bem-sucedida
    return res.status(200).json({ message: "Usuário deletado com sucesso!" });
  });
};
