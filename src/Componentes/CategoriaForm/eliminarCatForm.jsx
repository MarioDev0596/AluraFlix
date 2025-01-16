import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useContext, useState } from "react";
import { DataContext } from "../../DataContext/DataContext";
import displayAlert from "../../Util/Alerta";

const ContenedorEliminar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 20px 10px;

  h2 {
    margin: 10px 0;
    padding: 15px 0;
    text-align: center;
    width: 100%;
    max-width: 600px;
    background: #6bd1ff;
    color: white;
    border-radius: 5px;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 500px;
  }

  li {
    background: #03122f;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 1rem;
    }

    button {
      background: #6bd1ff;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background: #005f99;
      }
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #6bd1ff;
  background-color: #03122f;
  color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &.has-error {
    border-color: #e63946;
    box-shadow: inset 0 0 5px #e63946;
  }
`;

const GrupoBotones = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }
`;

const Boton = styled.button`
  background-color: #03122f;
  color: #ffffff;
  border-color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #000000;
    color: #2171d1;
    border-color: #2171d1;
    box-shadow: inset 0 0 10px #2171d1;
  }

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const Seleccionar = styled.select`
  width: 100%;
  padding: 20px 10px;
  border: 1px solid #6bd1ff;
  background: #03122f;
  color: white;
  border-radius: 5px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &.has-error {
    border-color: #e63946;
    box-shadow: inset 0 0 5px #e63946;
  }
`;

const Error = styled.p`
  color: #e63946;
  font-size: 14px;
  margin: 5px 0;
`;

const FormularioEliminarCategoria = () => {
  const { categorias, eliminarCategoria, borrarVideo, videos } = useContext(DataContext);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    if (!categoriaSeleccionada) {
      displayAlert({ title: "Error", text: "Debe seleccionar una categoría", icon: "error", confirmButtonText: "Aceptar" });
      return;
    }

    const videosCategoria = videos.filter(video => video.categoria === categoriaSeleccionada?.titulo);

    const eliminarCategoriaYVideos = () => {
      videosCategoria.forEach(video => borrarVideo(video.id));
      eliminarCategoria(categoriaSeleccionada.id);
      resetForm();
    };

    if (videosCategoria.length > 0) {
      displayAlert({
        title: "No se puede eliminar la categoría",
        text: "La categoría tiene videos asociados. ¿Desea eliminarla de todos modos?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarCategoriaYVideos();
        } else {
          displayAlert({ title: "Eliminación cancelada", text: "La categoría no ha sido eliminada.", icon: "info", confirmButtonText: "Aceptar" });
        }
      });
    } else {
      displayAlert({
        title: "Eliminación de categoría",
        text: "La categoría no tiene videos asociados. ¿Desea eliminarla?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarCategoria(categoriaSeleccionada.id);
          resetForm();
        }
      });
    }
  };

  const resetForm = () => {
    reset({
      colorPrimario: "#000000",
      descripcion: "",
      titulo: "",
      categoria: "",
    });
    setCategoriaSeleccionada(null);
  };

  const handleCategoryChange = (categoriaTitulo) => {
    const categoriaSeleccionada = categorias.find(categoria => categoria.titulo === categoriaTitulo);
    setCategoriaSeleccionada(categoriaSeleccionada);
    if (categoriaSeleccionada) {
      setValue("titulo", categoriaSeleccionada.titulo || "");
      setValue("colorPrimario", categoriaSeleccionada.colorPrimario || "#ffffff");
      setValue("descripcion", categoriaSeleccionada.descripcion || "");
    }
  };

  return (
    <ContenedorEliminar>
      <h2>Eliminar Categoría</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Seleccionar
          className={errors.categoria ? "has-error" : ""}
          {...register("categoria", {
            required: "Seleccione una categoría",
            onChange: (e) => handleCategoryChange(e.target.value),
          })}
          defaultValue=""
        >
          <option value="" disabled>Seleccione una categoría para Eliminar</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.titulo}>
              {categoria.titulo}
            </option>
          ))}
        </Seleccionar>
        {errors.categoria && <Error>{errors.categoria.message}</Error>}

        <Input
          className={errors.titulo ? "has-error" : ""}
          {...register("titulo", { required: "El título es obligatorio" })}
          placeholder="Ingrese el título de la categoría"
          disabled
        />
        {errors.titulo && <Error>{errors.titulo.message}</Error>}

        <Input
          type="color"
          className={errors.colorPrimario ? "has-error" : ""}
          {...register("colorPrimario", { required: "El color primario es obligatorio" })}
          disabled
        />
        {errors.colorPrimario && <Error>{errors.colorPrimario.message}</Error>}

        <Input
          className={errors.descripcion ? "has-error" : ""}
          {...register("descripcion", { required: "La descripción es obligatoria" })}
          placeholder="Ingrese la descripción de la categoría"
          disabled
        />
        {errors.descripcion && <Error>{errors.descripcion.message}</Error>}

        <GrupoBotones>
          <Boton type="submit">ELIMINAR</Boton>
          <Boton type="button" onClick={resetForm}>LIMPIAR</Boton>
        </GrupoBotones>
      </form>
    </ContenedorEliminar>
  );
};

export default FormularioEliminarCategoria;