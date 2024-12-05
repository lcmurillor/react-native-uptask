import React, { useState } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation, useQuery } from "@apollo/client";
import Tarea from "../components/Tarea";

const NUEVA_TAREA = gql`
  mutation nuevaTarea($input: TareaInput) {
    nuevaTarea(input: $input) {
      nombre
      id
      proyecto
      estado
    }
  }
`;

const OBTENER_TAREAS = gql`
  query obtenerTareas($input: ProyectoIDInput) {
    obtenerTareas(input: $input) {
      id
      nombre
      estado
    }
  }
`;

const Proyecto = ({ route }) => {
  const { id } = route.params;

  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const [nuevaTarea] = useMutation(NUEVA_TAREA, {
    update(cache, { data: { nuevaTarea } }) {
      const { obtenerTareas } = cache.readQuery({
        query: OBTENER_TAREAS,
        variables: {
          input: {
            proyecto: id,
          },
        },
      });

      cache.writeQuery({
        query: OBTENER_TAREAS,
        variables: {
          input: {
            proyecto: id,
          },
        },data:{
            obtenerTareas: [...obtenerTareas, nuevaTarea]
        }
      })
    },
  });

  const { data, loading, error } = useQuery(OBTENER_TAREAS, {
    variables: {
      input: {
        proyecto: id,
      },
    },
  });

  const handlerSubmit = async () => {
    if (nombre === "") {
      setMensaje("El nombre de la tarea es obligatorio");
      return;
    }

    try {
      const { data } = await nuevaTarea({
        variables: {
          input: {
            nombre,
            proyecto: id,
          },
        },
      });
      setNombre("");
      setMensaje("Tarea creada correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarAlerta = () => {
    ToastAndroid.show(mensaje, ToastAndroid.LONG);
  };

  if (loading) {
    return (
      <View style={[globalStyles.contenedor, styles.contenedor]}>
        <Text style={globalStyles.subtitulo}>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[globalStyles.contenedor, styles.contenedor]}>
        <Text style={globalStyles.subtitulo}>
          Error al cargar los proyectos: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={[globalStyles.contenedor, { backgroundColor: "#e84347" }]}>
        <View style={styles.formulario}>
          <TextInput
            style={globalStyles.input}
            placeholder="Nombre de la tarea"
            value={nombre}
            onChangeText={(text) => setNombre(text)}
          ></TextInput>
          <TouchableOpacity
            style={[globalStyles.boton, styles.boton]}
            onPress={() => handlerSubmit()}
          >
            <Text style={[globalStyles.botonTexto, styles.botonTexto]}>
              Crear Tarea
            </Text>
          </TouchableOpacity>
          <Text style={globalStyles.subtitulo}>
            Tareas: {route.params.nombre}
          </Text>
          <FlatList
            data={data.obtenerTareas} // Solo pasamos el arreglo de tareas
            renderItem={({ item }) => <Tarea tarea={item} proyectoId={id} />} // Asegúrate de devolver el componente
            keyExtractor={(item) => item.id.toString()} // Convertimos id a string si no lo es
          />
        </View>
        {mensaje && mostrarAlerta()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    marginHorizontal: "2.5%",
    marginTop: 20,
  },
  boton: {
    borderRadius: 5,
    paddingVertical: 10,
  },
  botonTexto: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default Proyecto;
