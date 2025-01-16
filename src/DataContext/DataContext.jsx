/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, createContext, useEffect } from "react";
import displayAlert from "../Util/Alerta";

const DataContext = createContext();

const urlApi = "https://67748e239222224148198b13.mockapi.io/";

export const ProveedorDatos = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [videos, setVideos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerDatos = async (endpoint, setter) => {
    try {
      const response = await axios.get(`${urlApi}${endpoint}`);
      setter(response.data);
    } catch (error) {
      console.error(`Error al obtener ${endpoint}:`, error);
    }
  };

  const manejarDatos = async (metodo, endpoint, data, setter, mensajeExito) => {
    try {
      const response = await axios[metodo](`${urlApi}${endpoint}`, data);
      if (metodo === "post") setter((prev) => [...prev, response.data]);
      if (metodo === "put")
        setter((prev) =>
          prev.map((item) => (item.id === data.id ? response.data : item))
        );
      if (metodo === "delete")
        setter((prev) => prev.filter((item) => item.id !== data));
      if (mensajeExito)
        displayAlert({
          title: mensajeExito.title,
          text: mensajeExito.message,
          icon: "success",
          confirmButtonText: "Aceptar"
        });
    } catch (error) {
      console.error(`Error al ${metodo} ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    obtenerDatos("Categorias", setCategorias);
    obtenerDatos("Videos", setVideos);
  }, []);

  useEffect(() => {
    if (categorias.length && videos.length) setCargando(false);
  }, [categorias, videos]);

  const valorContexto = {
    categorias,
    videos,
    cargando,
    crearVideo: (video) =>
      manejarDatos("post", "Videos", video, setVideos, {
        title: "Video Agregado con Exito",
        message: `El video "${video.titulo}" ha sido agregado con éxito`,
      }),
    actualizarVideo: (video) =>
      manejarDatos("put", `Videos/${video.id}`, video, setVideos, {
        title: "Video Actualizado con Exito",
        message: `El video "${video.titulo}" ha sido actualizado con éxito`,
      }),
    borrarVideo: (id) =>
      manejarDatos("delete", `Videos/${id}`, id, setVideos, {
        title: "Video Eliminado con Exito",
        message: "El video ha sido eliminado con éxito",
      }),
    obtenerVideo: async (id) => {
      try {
        const response = await axios.get(`${urlApi}Videos/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error al obtener el video:", error);
      }
    },
    crearCategoria: (categorias) =>
      manejarDatos("post", "Categorias", categorias, setCategorias, {
        title: "Categoría Agregada con Exito",
        message: `La categoría "${categorias.titulo}" ha sido agregada con éxito`,
      }),
    actualizarCategoria: (categorias) =>
      manejarDatos("put", `Categorias/${categorias.id}`, categorias, setCategorias, {
        title: "Categoría Actualizada con Exito",
        message: `La categoría "${categorias.titulo}" ha sido actualizada con éxito`,
      }),
    eliminarCategoria: (id) =>
      manejarDatos("delete", `Categorias/${id}`, id, setCategorias, {
        title: "Categoría Eliminada con Exito",
        message: "La categoría ha sido eliminada con éxito",
      }),
    obtenerCategoria: async (id) => {
      try {
        const response = await axios.get(`${urlApi}Categorias/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error al obtener la categoría:", error);
      }
    },
  };

  return (
    <DataContext.Provider value={valorContexto}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext };