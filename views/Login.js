import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  TextInput,
} from "react-native";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";

import { gql, useMutation } from "@apollo/client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Proyectos from "./Proyectos";

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mensaje, setMensaje] = useState(null);

  const navigation = useNavigation();

  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    // Validar formato de correo electrónico básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMensaje("Por favor, ingresa un correo válido");
      return;
    }

    try {
      const { data } = await autenticarUsuario({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      const {token} = data.autenticarUsuario;
      await AsyncStorage.setItem('token', token)
      navigation.navigate(Proyectos)
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
            Iniciar Sesión
          </Text>
        </TouchableOpacity>

        <Text
          style={[globalStyles.enlace]}
          onPress={() => {
            navigation.navigate("CrearCuenta");
          }}
        >
          Crear cuenta
        </Text>
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

export default Login;
