import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from '../../../assets/Diseño_sin_título-removebg-preview.png';

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '90px',
        margin: '15px 15px 15px 15px',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', // Alinea los elementos a la derecha
        alignItems: 'center',
    },
    headerOne: {
        width: '410px',
        textAlign: 'left',
        backgroundColor: '#006000',
        height: '90px',
        display: 'flex',
        flexDirection: 'column', // Alinea los elementos verticalmente
        justifyContent: 'center', // Alinea los elementos horizontalmente
        marginRight: '5px', // Ajusta el espaciado a la derecha
    },
    headerTwo: {
        width: '170px',
        textAlign: 'right',
        backgroundColor: '#006000',
        height: '90px',
        display: 'flex',
        flexDirection: 'row', // Alinea los elementos en una fila
        justifyContent: 'flex-end', // Alinea los elementos a la derecha
        alignItems: 'center', // Alinea los elementos verticalmente
    },
    image: {
        width: 65,
        height: 60,
        left: 0
    },
    title: {
        fontSize: '12px',
        fontWeight: 'bold',
        marginLeft: '15px',
    },
    titletwo: {
        fontSize: '25px',
        marginRight: '20px', 
    },
});

const HeaderPDF = ({ title }) => (
    <View style={styles.header}>
        <div style={styles.headerOne}>
            <Text style={styles.title}>Yamboro</Text>
            <Text style={styles.title}>Daniel Felipe Gonzalez Bravo</Text>
        </div>
        <div style={styles.headerTwo}>
            <Image src={Logo} style={styles.image} />
            <Text style={styles.titletwo}>CropLink</Text>
        </div>
    </View>
);

export default HeaderPDF;
