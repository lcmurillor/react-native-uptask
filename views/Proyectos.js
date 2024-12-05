import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";

const OBTENER_PROYECTOS = gql`
  query obtenerProyectos {
    obtenerProyectos {
      id
      nombre
    }
  }
`;

const Proyectos = () => {
  const navigation = useNavigation();

  const { data, loading, error } = useQuery(OBTENER_PROYECTOS);

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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => navigation.navigate("Proyecto", item)}>
        <Text style={styles.title}>{item.nombre}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View style={[globalStyles.contenedor, styles.contenedor]}>
        <TouchableOpacity
          style={[globalStyles.boton, styles.boton]}
          onPress={() => navigation.navigate("NuevoProyecto")}
        >
          <Text style={[globalStyles.botonTexto, styles.botonTexto]}>
            Nuevo Proyecto
          </Text>
        </TouchableOpacity>
        <Text style={globalStyles.subtitulo}>Selecciona un Proyecto</Text>
        <View style={{ flex: 1 }}>
          <FlatList
            data={data.obtenerProyectos} // Solo pasamos el arreglo de proyectos
            renderItem={renderItem} // Usamos el método renderItem corregido
            keyExtractor={(item) => item.id.toString()} // Convertimos id a string si no lo es
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#E84347",
  },
  contenido: {
    backgroundColor: "#FFF",
    marginHorizontal: "2.5%",
  },
  boton: {
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 30,
    marginHorizontal: 10,
  },
  botonTexto: {
    textAlign: "center",
    fontSize: 18,
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
});

export default Proyectos;
