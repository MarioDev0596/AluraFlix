import styled from "styled-components";
import logo from "../../assets/img/logo.png";
import Navegacion from "../Navegacion/nav";

const HeaderEstilizado = styled.header`
    padding: 30px 60px;
    display: flex;
    justify-content: space-between;

    img {
        width: 212px;
    }

    @media (max-width: 768px) {
        img {
            display: none;
        }

        padding: 0;
    }
`

const Header = () => (
    <HeaderEstilizado>
        <img src={logo} alt="Logo de AluraFlix" />
        <Navegacion />
    </HeaderEstilizado>
);

export default Header;