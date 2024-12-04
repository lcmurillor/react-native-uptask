import {StyleSheet} from 'react-native'
const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    contenido:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
        flex: 1
    },
     titulo:{
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFF'
     },
    input: {
        backgroundColor: '#FFF',
        marginBottom: 20,
        height: 40,
        paddingLeft: 5
    },
    boton:{
        backgroundColor: '#28303B'
    },
    botonTexto:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF'
    }, 
    enlace:{
        color: '#FFF',
        marginTop: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    subtitulo:{
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF'
    }
})
 
export default globalStyles;