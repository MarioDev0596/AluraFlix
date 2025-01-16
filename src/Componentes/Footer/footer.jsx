import styled from 'styled-components';
import logo from '../../assets/img/Logo.png';

const COLORES = {
  primario: '#2171D1',
  secundario: '#6bd1ff',
  claro: '#F0F0F0',
  oscuro: '#03122f',
  negro: '#000000',
  blanco: '#ffffff',
};

const PieEstilizado = styled.footer`
  background-color: ${COLORES.negro};
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-top: 2px solid ${COLORES.primario};

  img {
    width: 150px;
  }

  span {
    padding-top: 5px;
    color: ${COLORES.claro};
    font-weight: lighter;
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8vh;
    justify-content: center;
    padding: 0 10px;

    img, span {
      display: none;
    }
  }
`;

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Footer = () => (
  <Contenedor>
    <PieEstilizado>
      <img src={logo} alt="Logo AluraFlix" />
      <span>© 2024 Mario Todos los derechos reservados</span>
    </PieEstilizado>
  </Contenedor>
);

export default Footer;