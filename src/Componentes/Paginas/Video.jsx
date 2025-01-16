/* eslint-disable react/prop-types */
import styled from "styled-components";
import FormularioVideo from "../VideoForm/videoFormulario.jsx";
import Modal from "../Modal/modal.jsx";
import usarVentanaModal from "../../Util/usarVentanaModal.jsx";
import FormularioCategoria from "../CategoriaForm/categoriaFormulario.jsx";
import { useState } from "react";
import FormularioEditarCategoria from "../CategoriaForm/editarCatForm.jsx";
import FormularioEliminarCategoria from "../CategoriaForm/eliminarCatForm.jsx"

const ContenedorVideo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #0e0e0e;
  color: white;
  padding: 20px;
`;

const TituloVideo = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const SubtituloVideo = styled.p`
  font-size: 1rem;
  margin-bottom: 40px;
  color: #b3b3b3;
`;

const ContenedorBotones = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BotonEstilizado = styled.button`
  background-color: ${(props) => (props.$activo ? "#000000" : "#03122F")};
  color: ${(props) => (props.$activo ? "#2171D1" : "#ffffff")};
  border: 1px solid ${(props) => (props.$activo ? "#2171D1" : "#ffffff")};
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size:${(props) => (props.$activo ? "0.95rem" : "1rem")}; 
  transition: all 0.3s ease;
  box-shadow: ${(props) => (props.$activo ?  "inset 0 0 8px #2171D1" : "none")};
  text-transform: ${(props) => (props.$activo ? "uppercase" : "none")};

  &:hover {
    background-color: ${(props) => (props.$activo ? "#2a238d" : "#2171D1")};
    color: white;
  }
`;

const Video = ({ categorias, videos }) => {
  const { abierto, cambiarEstado } = usarVentanaModal();
  const [tipo, setTipo] = useState("crear");

  return (
    <>
      <ContenedorVideo>
        <TituloVideo>Nuevo Video</TituloVideo>
        <SubtituloVideo>
          Complete el formulario para crear una nueva tarjeta de video
        </SubtituloVideo>
        <FormularioVideo categorias={categorias} cambiarEstado={cambiarEstado} />
      </ContenedorVideo>
      <Modal estado={abierto} cambiarEstado={() => cambiarEstado(null)}
        titulo={"Administrar Categorias"}
        mostrarEncabezado={true}
        padding={'20px'}
        >
        <ContenedorBotones>
          <BotonEstilizado
            onClick={() => setTipo("crear")}
            $activo={tipo === "crear"}
          >
            Crear Categoria
          </BotonEstilizado>
          <BotonEstilizado
            onClick={() => setTipo("editar")}
            $activo={tipo === "editar"}
          >
            Editar Categoria
          </BotonEstilizado>
          <BotonEstilizado
            onClick={() => setTipo("eliminar")}
            $activo={tipo === "eliminar"}
          >
            Eliminar Categoria
          </BotonEstilizado>
        </ContenedorBotones>
        {tipo === "crear" && <FormularioCategoria />}
        {tipo === "editar" && <FormularioEditarCategoria categorias={categorias} />}
        {tipo === "eliminar" && <FormularioEliminarCategoria categorias={categorias} videos={videos} />}
      </Modal>
    </>
  );
};

export default Video;