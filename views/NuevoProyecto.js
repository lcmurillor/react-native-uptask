import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";

import { gql, useMutation, useQuery } from "@apollo/client";

const NUEVO_PROYECTO = gql`
  mutation nuevoProyecto($input: ProyectoInput) {
    nuevoProyecto(input: $input) {
      nombre
      id
    }
  }
`;

const OBTENER_PROYECTOS = gql`
  query obtenerProyectos {
    obtenerProyectos {
      id
      nombre
    }
  }
`;

const NuevoProyecto = () => {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const navigation = useNavigation();
  const [nuevoProyecto] = useMutation(NUEVO_PROYECTO, {
    update(cache, { data: { nuevoProyecto } }) {
      const { obtenerProyectos } = cache.readQuery({
        query: OBTENER_PROYECTOS,
      });
      cache.writeQuery({
        query: OBTENER_PROYECTOS,
        data: { obtenerProyectos: obtenerProyectos.concat([nuevoProyecto]) },
      });
    },
  });

  const handleSubmit = async () => {
    if (nombre === "") {
      setMensaje("El nombre del proyecto es obligatorio");
      return;
    }

    try {
      const { data } = await nuevoProyecto({
        variables: {
          input: {
            nombre,
          },
        },
      });
      setMensaje("Proyecto creado correctamente");
      navigation.navigate("Proyectos");
    } catch (error) {
      // console.log(error);
      setMensaje(error.message.replace("ApolloError: ", ""));
    }
  };

  const mostrarAlerta = () => {
    ToastAndroid.show(mensaje, ToastAndroid.LONG);
  };

  return (
    <>
      <View style={[globalStyles.contenedor, styles.contenedor]}>
        <View style={globalStyles.contenido}>
          <Text style={globalStyles.subtitulo}>Nuevo Proyecto</Text>
          <TextInput
            placeholder="Nombre del proyecto"
            style={globalStyles.input}
            onChangeText={(texto) => setNombre(texto)}
          ></TextInput>
          <TouchableOpacity
            style={[globalStyles.boton, styles.boton]}
            onPress={() => handleSubmit()}
          >
            <Text style={[globalStyles.botonTexto, styles.botonTexto]}>
              Crear Proyecto
            </Text>
          </TouchableOpacity>
          {mensaje && mostrarAlerta()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#E84347",
  },

  boton: {
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 30,
  },
  botonTexto: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default NuevoProyecto;
