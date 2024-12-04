import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import globalStyles from '../styles/global';
const Proyectos = () => {
    return (  <>
   <View style={[globalStyles.contenedor, styles.contenedor]}>
    <TouchableOpacity style= {[globalStyles.boton, styles.boton]}>
        <Text style={[globalStyles.botonTexto, styles.botonTexto]}>
            Nuevo Proyecto
        </Text>
    </TouchableOpacity>
    <Text style = {globalStyles.subtitulo}>Selecciona un Proyecto</Text>
   </View>
    </>);
}

const styles = StyleSheet.create({
contenedor :{
    backgroundColor: '#E84347'
},

boton: {
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 30
  },
  botonTexto: {
    textAlign: "center",
    fontSize: 18,
  },
})
 
export default Proyectos;