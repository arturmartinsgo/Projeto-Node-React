import React, { useState, useEffect } from "react";
import GlobalSyle from "./style/global";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Form from "./components/Form";
import Grid from "./components/Grid";
import LoginForm from "./components/LoginForm";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #ff1e8c;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #ffffff;
  margin-bottom: 10px;
  font-size: 1.5rem;
  text-align: center;
`;

function App() {
  const [usuarios, setusuarios] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [user, setUser] = useState(null); // Estado para o usuário logado
  const [isLogin, setIsLogin] = useState(true); // Estado para controlar a tela de Login ou Cadastro

  const getusuarios = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setusuarios(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      getusuarios();
    }
  }, [user]);

  const switchToLogin = () => setIsLogin(true); // Alterna para o login
  const switchToRegister = () => setIsLogin(false); // Alterna para o cadastro

  return (
    <>
      <Container>
        <Title>{isLogin ? "Login" : "Cadastro de Usuários"}</Title>
        {isLogin ? (
          <LoginForm
            setUser={setUser}
            switchToRegister={switchToRegister} // Passa a função para alternar para o cadastro
          />
        ) : (
          <>
            <Form
              onEdit={onEdit}
              setOnEdit={setOnEdit}
              getusuarios={getusuarios}
              switchToLogin={switchToLogin} // Passa a função para alternar para o login
            />
            <Grid usuarios={usuarios} setusuarios={setusuarios} setOnEdit={setOnEdit} />
          </>
        )}
      </Container>
      <ToastContainer autoClose={3000} />
      <GlobalSyle />
    </>
  );
}

export default App;
