import React from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { gql, useMutation, useQuery } from "@apollo/client";

const ACTUALIZAR_TAREA = gql`
  mutation actualizarTarea($id: ID!, $input: TareaInput, $estado: Boolean) {
    actualizarTarea(id: $id, input: $input, estado: $estado) {
      nombre
      id
      proyecto
      estado
    }
  }
`;

const ELIMINAR_TAREA = gql`
  mutation eliminarTarea($id: ID!) {
    eliminarTarea(id: $id)
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

const Tarea = ({ tarea, proyectoId }) => {
  const [actualizarTarea] = useMutation(ACTUALIZAR_TAREA);
  const [eliminarTarea] = useMutation(ELIMINAR_TAREA, {
    update(cache) {
      const { obtenerTareas } = cache.readQuery({
        query: OBTENER_TAREAS,
        variables: {
          input: {
            proyecto: proyectoId,
          },
        },
      });

      cache.writeQuery({
        query: OBTENER_TAREAS,
        variables: {
          input: {
            proyecto: proyectoId,
          },
        },
        data: {
          obtenerTareas: obtenerTareas.filter(
            (tareaActual) => tareaActual.id !== tarea.id
          ),
        },
      });
    },
  });

  const cambiarEstado = async () => {
    const { id } = tarea;

    try {
      const { data } = await actualizarTarea({
        variables: {
          id,
          input: {
            nombre: tarea.nombre,
          },
          estado: !tarea.estado,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarEliminar = () => {
    Alert.alert("Eliminar Tarea", "Deseas eliminar esta tarea?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        onPress: () => eliminarTareaBD(),
      },
    ]);
  };
  const eliminarTareaBD = async () => {
    const { id } = tarea;
    try {
      const { data } = await eliminarTarea({
        variables: {
          id,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.item}>
      <TouchableWithoutFeedback
        onPress={cambiarEstado}
        onLongPress={mostrarEliminar}
      >
        <View style={styles.contenedorHorizontal}>
          <Text style={styles.title}>{tarea.nombre}</Text>
          <Icon
            name="check-circle"
            size={30}
            style={tarea.estado ? styles.completo : styles.incompleta}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  incompleta: {
    color: "#E1E1E1",
  },
  completo: {
    color: "green",
  },
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contenedorHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingEnd: 10,
  },
});

export default Tarea;
