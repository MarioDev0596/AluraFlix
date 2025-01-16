/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const estiloActivo = css`
  background-color: #000;
  color: #2171D1; 
  border-color: #2171D1; 
  box-shadow: 0 0 1em 0.25em #2171D1, 
              0 0 4em 1em rgba(33, 113, 209, 0.5), 
              inset 0 0 0.75em 0.25em #2171D1; 
  text-shadow: 0 0 0.5em #2171D1;
`;

const BotonEstilizado = styled.button`
  width: 11rem;
  height: 4rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  padding: 0.8rem 2.5rem;
  border: 2px solid #fff;
  background-color: #262626;
  text-align: center;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 1em 0.25em #fff, 
              0 0 4em 1em rgba(255, 255, 255, 0.5), 
              inset 0 0 0.75em 0.25em #fff;

  ${({ $activo }) => $activo && estiloActivo}

  &:hover {
    background-color: #2171D1;
    color: #fff;
    box-shadow: 0 0 1em 0.25em #2171D1, 
                0 0 4em 2em rgba(33, 113, 209, 0.5), 
                inset 0 0 0.75em 0.25em #2171D1;
    cursor: pointer;
  }

  &:active {
    box-shadow: 0 0 0.6em 0.25em #2171D1, 
                0 0 2.5em 2em rgba(33, 113, 209, 0.5), 
                inset 0 0 0.5em 0.25em #2171D1;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    width: 10rem;
    height: 4rem;
  }
`;

const Boton = ({ titulo, $activo }) => (
  <BotonEstilizado $activo={$activo}>{titulo}</BotonEstilizado>
);

export default Boton;
