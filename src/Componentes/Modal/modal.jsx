/* eslint-disable react/prop-types */

import { RiCloseCircleLine } from "react-icons/ri";
import styled from "styled-components";

const Superposicion = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: rgba(3, 18, 47, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const EncabezadoModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #077aa3;

  h3 {
    color: #fff;
    font-size: 2rem;
    font-weight: 500;
    text-transform: uppercase;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const BotonCerrar = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 3rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ContenedorModal = styled.div`
  width: 65%;
  background-color: #03122f;
  border-radius: 10px;
  border: 4px solid #6bd1ff;
  position: relative;
  box-shadow: 0 7px 29px 0px rgba(100, 100, 111, 0.3);
  padding: ${({ $padding }) => $padding || "20px"};

  @media (max-width: 768px) {
    width: 97%;
  }
`;

const Modal = ({ children, estado, cambiarEstado, titulo, mostrarEncabezado, padding }) => {
  return (
    <>
      {estado && (
        <Superposicion>
          <ContenedorModal $padding={padding}>
            {mostrarEncabezado && (
              <EncabezadoModal>
                <h3>{titulo}</h3>
              </EncabezadoModal>
            )}
            {children}
            <BotonCerrar onClick={() => cambiarEstado(!estado)}>
              <RiCloseCircleLine />
            </BotonCerrar>
          </ContenedorModal>
        </Superposicion>
      )}
    </>
  );
};

export default Modal;