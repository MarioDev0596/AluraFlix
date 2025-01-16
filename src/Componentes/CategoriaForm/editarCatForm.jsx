/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useContext, useState } from "react";
import { DataContext } from "../../DataContext/DataContext";

const ContenedorFormulario = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  h2 {
    margin-bottom: 5px;
    padding: 15px 0;
    border-bottom: 1px solid #6bd1ff;
    border-top: 1px solid #6bd1ff;
  }
`;

const Etiqueta = styled.label`
  display: block;
  margin: 5px 0 8px;
  color: white;
`;

const Entrada = styled.input`
  width: 100%;
  padding: 10px 10px;
  border: 1px solid #6bd1ff;
  background: #03122f;
  color: white;
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

const Error = styled.p`
  color: #e63946;
  font-size: 14px;
  margin: 5px 0;
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

const GrupoCampos = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const GrupoEntrada = styled.div`
  display: flex;
  flex-direction: column;
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

const FormularioEditarCategoria = ({ categorias }) => {
  const { actualizarCategoria } = useContext(DataContext);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    const { categoria, ...cleanData } = data;
    const categoriaEditada = { ...cleanData, id: categoriaSeleccionada.id };
    actualizarCategoria(categoriaEditada);
    
    reset({
      colorPrimario: "#000000",
      descripcion: "",
      titulo: "",
      categoria: "",
    });
  };

  const handleCategoryChange = (categoriaTitulo) => {
    if (!categoriaTitulo) return;

    const seleccionCategoria = categorias.find(
      (categoria) => categoria.titulo === categoriaTitulo
    );

    setCategoriaSeleccionada(seleccionCategoria);

    if (seleccionCategoria) {
      setValue("titulo", seleccionCategoria.titulo || "");
      setValue("colorPrimario", seleccionCategoria.colorPrimario || "#ffffff");
      setValue("descripcion", seleccionCategoria.descripcion || "");
    }
  };

  return (
    <ContenedorFormulario>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GrupoCampos>
          <GrupoEntrada>
            <Etiqueta>Categoría</Etiqueta>
            <Seleccionar
              className={errors.categoria ? "has-error" : ""}
              {...register("categoria", {
                required: "Seleccione una categoría",
                onChange: (e) => handleCategoryChange(e.target.value),
              })}
              defaultValue=""
            >
              <option value="" disabled>
                Seleccione una categoría para Editar
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.titulo}>
                  {categoria.titulo}
                </option>
              ))}
            </Seleccionar>
          </GrupoEntrada>

          <GrupoEntrada>
            <Etiqueta>Título</Etiqueta>
            <Entrada
              className={errors.titulo ? "has-error" : ""}
              {...register("titulo", { required: "El título es obligatorio" })}
              placeholder="Ingrese el título de la categoría"
            />
            {errors.titulo && <Error>{errors.titulo.message}</Error>}
          </GrupoEntrada>

          <GrupoEntrada>
            <Etiqueta>Color Primario</Etiqueta>
            <Entrada
              style={{ height: "50px" }}
              type="color"
              className={errors.colorPrimario ? "has-error" : ""}
              {...register("colorPrimario", {
                required: "El color primario es obligatorio",
              })}
            />
            {errors.colorPrimario && <Error>{errors.colorPrimario.message}</Error>}
          </GrupoEntrada>

          <GrupoEntrada>
            <Etiqueta>Descripción</Etiqueta>
            <Entrada
              className={errors.descripcion ? "has-error" : ""}
              {...register("descripcion", {
                required: "La descripción es obligatoria",
              })}
              placeholder="Ingrese la descripción de la categoría"
            />
            {errors.descripcion && <Error>{errors.descripcion.message}</Error>}
          </GrupoEntrada>
        </GrupoCampos>

        <GrupoBotones>
          <Boton type="submit">ACTUALIZAR</Boton>
          <Boton
            type="button"
            onClick={() =>
              reset({
                colorPrimario: "#000000",
                descripcion: "",
                titulo: "",
                categoria: "",
              })
            }
          >
            LIMPIAR
          </Boton>
        </GrupoBotones>
      </form>
    </ContenedorFormulario>
  );
};

export default FormularioEditarCategoria;