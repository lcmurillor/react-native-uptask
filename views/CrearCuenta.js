import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from "react-native";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";

import { gql, useMutation } from "@apollo/client";

const NUEVA_CUENTA = gql`
  mutation ($input: UsuarioInput) {
    crearUsuario(input: $input)
  }
`;

const CrearCuenta = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mensaje, setMensaje] = useState(null);

  const navigation = useNavigation();

  const [crearUsuario] = useMutation(NUEVA_CUENTA);

  const handleSubmit = async () => {
    if (nombre === "" || email === "" || password === "") {
      setMensaje("Todos los campos son obligatorios");
      return;
    }
    if (password.length < 6) {
      setMensaje("La contraseña debe ser mayor a 6 caracteres");
      return;
    }
    // Validar formato de correo electrónico básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMensaje("Por favor, ingresa un correo válido");
      return;
    }

    try {
      const { data } = await crearUsuario({
        variables: {
          input: {
            nombre,
            email,
            password,
          },
        },
      });
      setMensaje(data.CrearCuenta)
      navigation.navigate('Login')
    } catch (error) {
      setMensaje(error.message.replace('ApolloError: ', ''));
    }
  };

  const mostrarAlerta = () => {
    ToastAndroid.show(mensaje, ToastAndroid.LONG);
  };

  return (
    <View style={[globalStyles.contenedor, { backgroundColor: "#E84347" }]}>
      <View style={globalStyles.contenido}>
        <Text style={globalStyles.titulo}>UpTask</Text>

        <TextInput
          style={globalStyles.input}
          placeholder="Nombre"
          onChangeText={(texto) => setNombre(texto)}
        />

        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          onChangeText={(texto) => setEmail(texto)}
        />

        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(texto) => setPassword(texto)}
        />

        <TouchableOpacity
          style={[globalStyles.boton, styles.btnLogin]}
          onPress={() => handleSubmit()}
        >
          <Text style={[globalStyles.botonTexto, styles.btnText]}>
            Crear cuenta
          </Text>
        </TouchableOpacity>
        {mensaje && mostrarAlerta()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    borderRadius: 5,
    paddingVertical: 10,
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default CrearCuenta;
