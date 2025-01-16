
import styled from "styled-components";
import Boton from "../Boton/boton"
import { Link, useResolvedPath } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";


const ContenedorEstilizado = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
    padding: 1rem 0;
    bottom: 0;
    left: 2rem;
    position: fixed;
    justify-content: center;
    z-index: 1;
  }
`;

const BotonesDeEscritorio = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const BotonesMoviles = styled.div`
  display: none;
  gap: 63px;  
  align-items: center;
  position: fixed;
  bottom: 15px;  
  left: 50%;  
  transform: translateX(-50%);  
  z-index: 1;
  
  a {
    text-decoration: none;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;


const BotonDeInicio = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 24px;
  border: 0.25em solid ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
  border-radius: 50px;
  background-color: transparent;
  color: ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  box-shadow: 0 0 1em 0.25em ${({ $colorPrimario }) => $colorPrimario || '#007bff'},
              0 0 4em 1em rgba(191, 123, 255, 0.781),
              inset 0 0 0.75em 0.25em ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
  text-shadow: 0 0 0.5em ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
    color: white;
    box-shadow: 0 0 1em 0.25em ${({ $colorPrimario }) => $colorPrimario || '#007bff'},
                0 0 4em 2em rgba(191, 123, 255, 0.781),
                inset 0 0 0.75em 0.25em ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
  }

  &:active {
    box-shadow: 0 0 0.6em 0.25em ${({ $colorPrimario }) => $colorPrimario || '#007bff'},
                0 0 2.5em 2em rgba(191, 123, 255, 0.781),
                inset 0 0 0.5em 0.25em ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
  }

  svg {
    margin-right: 8px;
  }
`;

const BotonDeMas = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border: 0.25em solid ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
  border-radius: 50%;
  background-color: transparent;
  color: ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
  cursor: pointer;
  outline: none;
  box-shadow: 0 0 1em 0.25em ${({ $colorPrimario }) => $colorPrimario || '#007bff'},
              0 0 4em 1em rgba(191, 123, 255, 0.781),
              inset 0 0 0.75em 0.25em ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
  text-shadow: 0 0 0.5em ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
    color: white;
    box-shadow: 0 0 1em 0.25em ${({ $colorPrimario }) => $colorPrimario || '#007bff'},
                0 0 4em 2em rgba(191, 123, 255, 0.781),
                inset 0 0 0.75em 0.25em ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
  }

  &:active {
    box-shadow: 0 0 0.6em 0.25em ${({ $colorPrimario }) => $colorPrimario || '#007bff'},
                0 0 2.5em 2em rgba(191, 123, 255, 0.781),
                inset 0 0 0.5em 0.25em ${({ $colorPrimario }) => $colorPrimario || '#007bff'};
  }
`;


const Navegacion = () => {
  const url = useResolvedPath().pathname;

  return (
    <ContenedorEstilizado>
      <BotonesDeEscritorio>
        <Link to="/">
          <Boton titulo="Home" $activo={url === "/"} />
        </Link>
        <Link to="/video">
          <Boton titulo="Nuevo Video" $activo={url === "/video"} />
        </Link>
      </BotonesDeEscritorio>

      <BotonesMoviles>
        <Link to="/">
          <BotonDeInicio>
            <FaHome />
            HOME
          </BotonDeInicio>
        </Link>
        <Link to="/video">
          <BotonDeMas>
            <FaPlus />
          </BotonDeMas>
        </Link>
      </BotonesMoviles>
    </ContenedorEstilizado>
  );
};

export default Navegacion;