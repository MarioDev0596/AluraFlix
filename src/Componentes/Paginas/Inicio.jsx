/* eslint-disable react/prop-types */
import Banner from "../Banner/banner.jsx";
import Categoria from "../Categoria/categoria.jsx";
import Modal from "../Modal/modal.jsx";
import { useState } from "react";
import usarVentanaModal from "../../Util/usarVentanaModal.jsx"
import FormularioEditarVideo from "../VideoForm/editarVideoFormulario.jsx";
import styled from "styled-components";

const ContenedorIframe = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
`;

const IframeEstilizado = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Incio = ({ categorias, videos }) => {
  const { abierto, cambiarEstado, tipoVentanaModal } = usarVentanaModal();
  const [videoSeleccionado, setVideoSeleccionado] = useState(null);

  const obtenerIDYouTube = (url) =>
    url.match(/[?&]v=([^&#]*)/)?.[1] || null;

  const categoriasFiltradas = categorias?.filter((categoria) =>
    videos.some((video) => video.categoria === categoria.titulo)
  );

  const renderizarContenidoModal = () => {
    if (tipoVentanaModal === "editar") {
      return (
        <Modal
          estado={abierto}
          cambiarEstado={() => cambiarEstado(null)}
          titulo="Editar Video"
          mostrarEncabezado
          padding="20px"
        >
          <FormularioEditarVideo
            categorias={categorias}
            videoSeleccionado={videoSeleccionado}
          />
        </Modal>
      );
    }
    if (tipoVentanaModal === "verVideo") {
      return videoSeleccionado ? (
        <Modal
          estado={abierto}
          cambiarEstado={() => cambiarEstado(null)}
          titulo={videoSeleccionado.titulo}
          mostrarEncabezado={false}
          padding="0px"
        >
          <ContenedorIframe>
            <IframeEstilizado
              src={`https://www.youtube.com/embed/${obtenerIDYouTube(
                videoSeleccionado.link
              )}`}
              title="Reproductor de video de YouTube"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </ContenedorIframe>
          </Modal>
      ) : (
        <h3>Selecciona un video</h3>
      );
    }
    return null;
  };

  return (
    <>
      <Banner />
      {categoriasFiltradas?.map((categoria) => (
        <Categoria
          key={categoria.id}
          titulo={categoria.titulo}
          colorPrimario={categoria.colorPrimario}
          videos={videos.filter(
            (video) => video.categoria === categoria.titulo
          )}
          cambiarEstado={cambiarEstado}
          setVideoSeleccionado={setVideoSeleccionado}
        />
      ))}
      {renderizarContenidoModal()}
    </>
  );
};

export default Incio;