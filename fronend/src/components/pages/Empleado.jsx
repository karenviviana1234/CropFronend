import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import axiosClient from './Cultivos' // Ajusta la ruta según tu estructura de proyecto

const ListarEmpleados = () => {
  const [empleado, setEmpleado] = useState([]);
  const [formData, setFormData] = useState({ observacion: '' });

  const ObtenerDatos = async () => {
    try {
      const response = await axiosClient.get('/Listar');
      console.log('Datos obtenidos:', response.data);
      setEmpleado(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      Alert.alert('Error', 'Error al obtener los datos');
    }
  };

  useEffect(() => {
    ObtenerDatos();
  }, []);

  const handleSubmit = async (id_actividad) => {
    try {
      await axiosClient.put(`/EmpleadoMood/Registrar/${id_actividad}`, formData);
      Alert.alert('Éxito', 'Observación Registrada exitosamente');
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      Alert.alert('Error', 'Error al registrar la observación');
    }
  };

  const Desactivar = async (id_actividad) => {
    try {
      await axiosClient.put(`/cambioestado/${id_actividad}`);
      ObtenerDatos(); // Refrescar los datos después de desactivar
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      Alert.alert('Error', 'Error al cambiar el estado');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Listar Empleados</Text>
      <ScrollView>
        {empleado.map((empleado, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.text}>Identificación: {empleado.identificacion}</Text>
            <Text style={styles.text}>Nombre: {empleado.nombre}</Text>
            <Text style={styles.text}>Fecha Inicio: {new Date(empleado.fecha_inicio).toLocaleDateString()}</Text>
            <Text style={styles.text}>Fecha Fin: {new Date(empleado.fecha_fin).toLocaleDateString()}</Text>
            <Text style={styles.text}>Variedad: {empleado.nombre_variedad}</Text>
            <Text style={styles.text}>Actividad: {empleado.nombre_actividad}</Text>
            <Text style={styles.text}>Tiempo: {empleado.tiempo}</Text>
            <Text style={styles.text}>Estado: {empleado.estado}</Text>

            <TextInput
              style={styles.input}
              placeholder="Ingrese la observación"
              value={formData.observacion}
              onChangeText={(text) => setFormData({ ...formData, observacion: text })}
            />

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit(empleado.id_actividad)}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => Desactivar(empleado.id_actividad)}>
              <Text style={styles.buttonText}>Estado</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
    padding: 5,
  },
  button: {
    backgroundColor: 'blue',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ListarEmpleados;
