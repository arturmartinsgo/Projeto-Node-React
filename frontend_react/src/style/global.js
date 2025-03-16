// Importar a biblioteca styled-components associando a createGlobalStyle 
import { createGlobalStyle } from "styled-components"; 

// Criar uma constante com as definições de createGlobalSyle 
const Global = createGlobalStyle` 
  * { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; /* Para garantir que o padding e margin não aumentem o tamanho do elemento */
    font-family: sans-serif; 
  } 

  body { 
    width: 100vw; // Para ocupar todo o espaço da tela  
    height: 100vh; 
    display: flex; 
    justify-content: center; 
    align-items: center; /* Centraliza verticalmente */
    background-color: #1e1e1e; /* Cor de fundo da página */
  } 
`; 

// O estilo definido no arquivo global.js deve ser exportada a constante  
// global para que o resto do código-fonte tenha acesso 
export default Global; 
