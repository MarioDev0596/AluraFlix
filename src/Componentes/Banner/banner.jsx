import styled from "styled-components";
import imagenFondo from "../../assets/img/imagen-fondo.png";
import imagenInfo from "../../assets/img/imagen-info.png";

const BannerContenedor = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80vh;
    background-image: url(${imagenFondo});
    background-size: cover;
    background-position: center;

    @media (max-width: 768px) {
        display: none;
  }
`;

const PanelDeInformacion = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: white;
    padding: 50px;
    width: 50%;
`;

const FrontEndBoton = styled.div`
    background-color: #6BD1FF;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 4rem;
    margin-bottom: 20px;
    max-width: 850px;
`;

const Descripcion = styled.div`
    max-width: 600px;

    h3 {
        font-size: 40px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    p {
        font-size: 20px;
        line-height: 1.5;
    }
`;

const BannerImagenContenedor = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
`;

const BannerImagen = styled.img`
    width: 80%;
    height: auto;
`;

const Banner = () => (
    <BannerContenedor>
        <PanelDeInformacion>
            <FrontEndBoton>Front End</FrontEndBoton>
            <Descripcion>
                <h3>Challenge React</h3>
                <p>Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.</p>
            </Descripcion>
        </PanelDeInformacion>
        <BannerImagenContenedor>
            <BannerImagen src={imagenInfo} alt="Imagen de informacion" />
        </BannerImagenContenedor>
    </BannerContenedor>
);

export default Banner;