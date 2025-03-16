import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
  width: 300px; /* Definindo uma largura fixa para centralizar os botões */
  margin: 0 auto; /* Centralizando o formulário */
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%; /* Ajustando para 100% para que ocupe toda a largura do formulário */
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #ff1e8c;
  color: white;
  height: 42px;
  border: none;
  width: 100%; /* Fazendo o botão de login ocupar toda a largura do formulário */
  margin-top: 10px; /* Adicionando um espaço acima do botão */
`;

const SwitchButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #d2d2d2;
  color: black;
  border: none;
  width: 100%; /* Fazendo o botão de troca de tela ocupar toda a largura do formulário */
`;

const LoginForm = ({ setUser, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Função para pegar todos os usuários
  const getusuarios = async () => {
    try {
      const res = await axios.get("http://localhost:8800/usuarios");
      console.log(res.data); // Aqui você pode fazer algo com os dados dos usuários
      // Caso queira fazer algo com os dados recebidos, você pode armazená-los em um estado, por exemplo.
    } catch (err) {
      toast.error("Erro ao buscar usuários");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/login", { email, senha });
      toast.success(res.data.message);
      setUser(res.data.user);
      
      // Redireciona para o principal.html após o login bem-sucedido
      window.location.href = "/principal.html";
    } catch (err) {
      toast.error(err.response?.data.message || "Erro ao fazer login");
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleLogin}>
        <InputArea>
          <label>E-mail</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputArea>
        <InputArea>
          <label>Senha</label>
          <Input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </InputArea>
        <Button type="submit">Login</Button>
      </form>
      <SwitchButton
        onClick={() => {
          switchToRegister();  // Chama a função de troca para a tela de cadastro
        }}
      >
        Ir para Cadastro
      </SwitchButton>
    </FormContainer>
  );
};

export default LoginForm;
