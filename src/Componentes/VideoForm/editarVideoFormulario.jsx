/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { DataContext } from "../../DataContext/DataContext";
import { useContext, useEffect } from "react";

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

const AreaTexto = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #6bd1ff;
  background: #03122f;
  color: white;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &.has-error {
    border-color: #e63946;
    box-shadow: inset 0 0 5px #e63946;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
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
  background-color: #03122F;
  color: #ffffff;
  border-color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #000000;
    color: #2171D1;
    border-color: #2171D1;
    box-shadow: inset 0 0 10px #2171D1;
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

const FormularioEditarVideo = ({ categorias, videoSeleccionado }) => {
  const { actualizarVideo } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (videoSeleccionado) {
      reset({
        titulo: videoSeleccionado.titulo || "",
        categoria: videoSeleccionado.categoria || "",
        imagen: videoSeleccionado.imagen || "",
        link: videoSeleccionado.link || "",
        descripcion: videoSeleccionado.descripcion || "",
      });
    }
  }, [videoSeleccionado, reset]);

  const onSubmit = async (data) => {
    if (videoSeleccionado && videoSeleccionado.id) {
      const videoConId = { ...data, id: videoSeleccionado.id };
      await actualizarVideo(videoConId); // Espera a que la actualización se complete
      reset();
    } else {
      console.error("El video seleccionado no tiene un ID válido");
    }
  };

  return (
    <ContenedorFormulario>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GrupoCampos>
          <GrupoEntrada>
            <Etiqueta>Título</Etiqueta>
            <Entrada
              className={errors.titulo ? "has-error" : ""}
              {...register("titulo", { required: "El título es obligatorio" })}
              placeholder="Ingrese el título del video"
            />
            {errors.titulo && <Error>{errors.titulo.message}</Error>}
          </GrupoEntrada>

          <GrupoEntrada>
            <Etiqueta>Sección</Etiqueta>
            <Seleccionar
              className={errors.categoria ? "has-error" : ""}
              {...register("categoria", {
                required: "Seleccione una sección",
              })}
              defaultValue=""
            >
              <option value="" disabled>
                Seleccione una sección
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.titulo}>
                  {categoria.titulo}
                </option>
              ))}
            </Seleccionar>
            {errors.categoria && <Error>{errors.categoria.message}</Error>}
          </GrupoEntrada>
        </GrupoCampos>

        <GrupoCampos>
          <GrupoEntrada>
            <Etiqueta>Imagen</Etiqueta>
            <Entrada
              className={errors.imagen ? "has-error" : ""}
              {...register("imagen", { required: "El enlace es obligatorio" })}
              placeholder="Ingrese el enlace de la imagen"
            />
            {errors.imagen && <Error>{errors.imagen.message}</Error>}
          </GrupoEntrada>

          <GrupoEntrada>
            <Etiqueta>Video</Etiqueta>
            <Entrada
              className={errors.link ? "has-error" : ""}
              {...register("link", { required: "El enlace es obligatorio" })}
              placeholder="Ingrese el enlace del video"
            />
            {errors.link && <Error>{errors.link.message}</Error>}
          </GrupoEntrada>
        </GrupoCampos>

        <Etiqueta>Descripción</Etiqueta>
        <AreaTexto
          className={errors.descripcion ? "has-error" : ""}
          {...register("descripcion", {
            required: "La descripción es obligatoria",
          })}
          rows={4}
          placeholder="¿De qué se trata este video?"
        />
        {errors.descripcion && <Error>{errors.descripcion.message}</Error>}

        <GrupoBotones>
          <Boton type="submit">GUARDAR</Boton>
          <Boton type="button" onClick={() => reset()}>
            RESTAURAR
          </Boton>
        </GrupoBotones>
      </form>
    </ContenedorFormulario>
  );
};

export default FormularioEditarVideo;