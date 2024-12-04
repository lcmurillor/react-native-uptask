import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';  // Cambia aquí también
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Platform } from "react-native";


const httpLink = createHttpLink({
    uri: Platform.OS === 'ios' ? 'http://localhost:4000/' : 'http://192.168.0.102:4000/',
});

const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

export default client;