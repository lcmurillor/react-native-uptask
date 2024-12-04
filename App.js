import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./views/Login";
import CrearCuenta from "./views/CrearCuenta";
import Proyectos from "./views/Proyectos";

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Iniciar Sesión",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="CrearCuenta"
            component={CrearCuenta}
            options={{
              title: "Crear Cuenta",
              headerStyle: {
                backgroundColor: "#28303B",
              },
              headerTintColor: "#FFF",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="Proyectos"
            component={Proyectos}
            options={{
              title: "Proyectos",
              headerStyle: {
                backgroundColor: "#28303B",
              },
              headerTintColor: "#FFF",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
