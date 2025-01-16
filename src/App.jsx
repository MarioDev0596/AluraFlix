import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Componentes/Header/header";
import Incio from "./Componentes/Paginas/Inicio";
import Video from "./Componentes/Paginas/Video";
import Footer from "./Componentes/Footer/footer";
import styled from "styled-components";   
import { DataContext } from "./DataContext/DataContext";
import { useContext } from "react";
import EstilosGlobales from "./Componentes/EstilosGlobales/globalstyle"

const FondoDegradado = styled.div` 
  background-color: #262626; 
  width: 100%; 
  min-height: 100vh; 
`;

const ContenedorAplicacion = styled.div` 
  max-width: 100%; 
  margin: 0 auto; 
`;

const ContenedorPrincipal = styled.main`
  gap: 24px;

  @media (max-width: 768px) {
    margin-bottom: 8vh;
  }
`;

function App() {

  const { categorias, videos } = useContext(DataContext);

  return (
    <Router>
      <FondoDegradado>
        <EstilosGlobales />
        <ContenedorAplicacion>
          <Header />
          <ContenedorPrincipal>
            <Routes>
              <Route path="/" element={<Incio categorias={categorias} videos={videos} />} />
              <Route path="/video" element={<Video categorias={categorias} videos={videos} />} />
              <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </ContenedorPrincipal>
          <Footer />
        </ContenedorAplicacion>
      </FondoDegradado>
    </Router>
  );
}

export default App;
