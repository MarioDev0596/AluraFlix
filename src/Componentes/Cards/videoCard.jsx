/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { DataContext } from '../../DataContext/DataContext';
import displayAlert from '../../Util/Alerta';

const TarjetaContenedor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(0deg, #000, #272727);
  border-radius: 15px;
  max-width: 500px;
  width: 100%;
  padding: 20px;
  position: relative;
  color: white;
  cursor: pointer;
  font-weight: 900;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:before,
&:after {
  content: '';
  position: absolute;
  left: -4px;
  top: -4px;
  border-radius: 15px;
  background: ${({ $colorPrimario }) => $colorPrimario || '#00ff00'};
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  z-index: -1;
}

&:after {
  filter: none; /* Quita el desenfoque */
}

  @keyframes steam {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const ContenedorMedios = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 15px;
`;

const ImagenMedios = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
`;

const ContenedorBotones = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; 
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
`;

const Boton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #ffffff;
  border: 2px solid ${({ $colorPrimario }) => $colorPrimario || '#00ff00'};
  border-radius: 10px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1.2rem;
  gap: 8px;

  &:hover {
    background: ${({ $colorPrimario }) => $colorPrimario || '#00ff00'};
    color: #000;
  }
`;

const TarjetaVideo = ({ colorPrimario, video, cambiarEstado, setVideoSeleccionado }) => {
  const { borrarVideo } = useContext(DataContext);

  const manejarBorrarVideo = () =>
    displayAlert({
      title: 'Confirmar Eliminación',
      text: `¿Eliminar "${video.titulo}"?`,
      icon: 'warning',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        borrarVideo(video.id);
        displayAlert({
          title: 'Video Eliminado',
          text: `"${video.titulo}" eliminado.`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
    });

  return (
    <TarjetaContenedor $colorPrimario={colorPrimario}>
      <ContenedorMedios
        onClick={() => {
          setVideoSeleccionado(video);
          cambiarEstado("verVideo");
        }}
      >
        <ImagenMedios src={video.imagen} alt={video.titulo} />
      </ContenedorMedios>

      <ContenedorBotones>
        <Boton $colorPrimario={colorPrimario} onClick={manejarBorrarVideo}>
          <FaTrash /> Borrar
        </Boton>
        <Boton
          $colorPrimario={colorPrimario}
          onClick={() => {
            setVideoSeleccionado(video);
            cambiarEstado('editar');
          }}
        >
          <FaEdit /> Editar
        </Boton>
      </ContenedorBotones>
    </TarjetaContenedor>
  );
};

export default TarjetaVideo;