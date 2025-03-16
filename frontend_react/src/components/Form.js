import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #ff1e8c;
  color: white;
  height: 42px;
`;

const SwitchButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #d2d2d2;
  color: black;
  border: none;
`;

const Form = ({ getusuarios, onEdit, setOnEdit, switchToLogin }) => {
  const ref = useRef();

  useEffect(() => {
    // Carregar os dados sempre que o formulário for visível ou quando onEdit mudar
    if (onEdit) {
      const usuarios = ref.current;
      usuarios.nome.value = onEdit.nome;
      usuarios.email.value = onEdit.email;
      usuarios.senha.value = onEdit.senha;
    } else {
      getusuarios(); // Puxar os dados sempre que o form estiver visível
    }
  }, [onEdit, getusuarios]); // Dependência para garantir a atualização sempre que onEdit ou getusuarios mudar

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarios = ref.current;

    if (!usuarios.nome.value || !usuarios.email.value || !usuarios.senha.value) {
      return toast.warn("Preencha todos os campos");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.codigo, {
          nome: usuarios.nome.value,
          email: usuarios.email.value,
          senha: usuarios.senha.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: usuarios.nome.value,
          email: usuarios.email.value,
          senha: usuarios.senha.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    usuarios.nome.value = "";
    usuarios.email.value = "";
    usuarios.senha.value = "";

    setOnEdit(null);
    getusuarios();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <label>Nome</label>
        <Input type="text" name="nome" />
      </InputArea>
      <InputArea>
        <label>E-mail</label>
        <Input type="email" name="email" />
      </InputArea>
      <InputArea>
        <label>Senha</label>
        <Input type="password" name="senha" />
      </InputArea>
      <Button type="submit">{onEdit ? "Editar" : "Cadastrar"}</Button>
      <SwitchButton onClick={switchToLogin}>Voltar ao Login</SwitchButton>
    </FormContainer>
  );
};

export default Form;
