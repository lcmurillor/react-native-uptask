import React from "react";
import { registerRootComponent } from "expo";
import App from "./App";

//Apollo
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";

const UpTaskApp = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(UpTaskApp);
