import styled from "styled-components";
import Galeria from "../Galeria/galeria";

const ContenedorCategorias = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 0 50px 50px 50px;
  

  @media (min-width: 769px) {
    align-items: flex-start;
    padding: 0 15px 50px 15px;
  }
`;

const TituloCategoria = styled.h2`
  background-color: #6bd1ff;
  color: white;
  padding: 10px 80px;
  border-radius: 10px;
  font-size: 2.5rem;
  margin-bottom: 20px;
  max-width: 850px;
  text-align: center;

  @media (min-width: 769px) {
    padding: 10px 40px;
  }
`;

const ContenedorTarjetas = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (min-width: 769px) {
    justify-content: center;
  }
`;

const Categorias = ({ titulo, colorPrimario, videos, cambiarEstado, setVideoSeleccionado }) => (
  <ContenedorCategorias>
    <TituloCategoria style={{ backgroundColor: colorPrimario }}>{titulo}</TituloCategoria>
    <ContenedorTarjetas>
      <Galeria
        videos={videos}
        colorPrimario={colorPrimario}
        cambiarEstado={cambiarEstado}
        setVideoSeleccionado={setVideoSeleccionado}
      />
    </ContenedorTarjetas>
  </ContenedorCategorias>
);

export default Categorias;