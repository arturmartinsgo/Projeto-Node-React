import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1000px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;
export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
`;

const Grid = ({ usuarios, setusuarios, setOnEdit }) => {
  // Função para deletar um usuário
  const handleDelete = async (codigo) => {
    try {
      console.log("Iniciando a deleção do usuário com código:", codigo);
      
      // Enviar requisição DELETE para a API
      const response = await axios.delete(`http://localhost:8800/usuarios/${codigo}`);
      console.log("Resposta do servidor:", response);

      // Verifica se a resposta foi bem-sucedida
      if (response.status === 200) {
        // Atualiza a lista de usuários após deletar
        const newUsuarios = usuarios.filter((usuariosItem) => usuariosItem.codigo !== codigo);
        setusuarios(newUsuarios);
        
        // Exibe mensagem de sucesso
        toast.success("Usuário deletado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      toast.error(
        error.response
          ? `Erro ao deletar usuário: ${error.response.data.message || error.response.data}`
          : `Erro: ${error.message}`
      );
    }
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>Senha</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {usuarios.map((usuariosItem) => (
          <Tr key={usuariosItem.codigo}>
            <Td>{usuariosItem.nome}</Td>
            <Td>{usuariosItem.email}</Td>
            <Td>{usuariosItem.senha}</Td>
            <Td alignCenter>
              <FaEdit onClick={() => setOnEdit(usuariosItem)} />
              <FaTrash
                onClick={() => handleDelete(usuariosItem.codigo)}
                style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
