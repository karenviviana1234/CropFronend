import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import HeaderPDF from '../moleculas/PDF/HeaderPDF';
import axiosClient from '../axiosClient';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
    },
    section: {
        width: '100%',
        padding: 10,
        textAlign: 'center',
    },
    container: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    tituloUno: {
        marginTop: '120px',
        marginBottom: '30px',
        marginHorizontal: '30px',
        fontSize: '35px',
        color: '#006000',
        fontWeight: 'bold'
    },
    text: {
        fontSize: '12px',
        fontWeight: 'semibold',
        textAlign: 'left',
        color: '#006000',
        marginBottom: '5px'
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'yellow',
        marginBottom: 10,
    },
    table: {
        width: '90%',
        marginVertical: 20,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    tableCell: {
        flex: 1,
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        color: '#FFFFFF',
        backgroundColor: '#006000',
        fontSize: '11px',
    },
    tableData: {
        flex: 1,
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        color: '#000000',
        backgroundColor: '#E5EAEE',
        fontSize: '11px',
    },
    tableCellTotal: {
        flex: 3,
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        color: '#FFFFFF',
        backgroundColor: '#006000',
        fontSize: '11px',
    },
    tableDataTotal: {
        flex: 1,
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        color: '#FFFFFF',
        backgroundColor: '#006000',
        fontSize: '11px',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'right',
        color: 'grey',
        marginRight: '10px',
        marginBottom: '5px',
    },
});

const PDF = () => {
    const [produccion, setProduccion] = useState([]);

    useEffect(() => {
        const fetchProduccion = async () => {
            try {
                const token = localStorage.getItem("token");
                const getURL = "http://localhost:3000/listarProduccion";
                const response = await axiosClient.get(getURL, {
                    headers: { token: token }
                });
                setProduccion(response.data);
            } catch (error) {
                console.error("Error al obtener la información", error.response ? error.response.data : error.message);
            }
        };
        fetchProduccion();
    }, []);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <HeaderPDF />
                <View style={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.tituloUno}>REPORTE GENERAL</Text>
                        <Text style={styles.text}>INVERSIONES</Text>
                        <View style={styles.line} />
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCell}><Text>ID</Text></View>
                                <View style={styles.tableCell}><Text>Nombre</Text></View>
                                <View style={styles.tableCell}><Text>Asignacion</Text></View>
                                <View style={styles.tableCell}><Text>Valor de la Inversion</Text></View>
                            </View>
                            {produccion.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <View style={styles.tableData}><Text>{item.id_inversion}</Text></View>
                                    <View style={styles.tableData}><Text>{item.nombre_lote}</Text></View>
                                    <View style={styles.tableData}><Text>{item.fk_id_programacion}</Text></View>
                                    <View style={styles.tableData}><Text>{item.valor_inversion}</Text></View>
                                </View>
                            ))}
                            <View style={styles.tableRow}>
                                <View style={styles.tableCellTotal}><Text>Total:</Text></View>
                                <View style={styles.tableDataTotal}><Text>$4.000.000</Text></View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.text}>PRODUCCIONES</Text>
                        <View style={styles.line} />
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCell}><Text>Numero</Text></View>
                                <View style={styles.tableCell}><Text>Lote</Text></View>
                                <View style={styles.tableCell}><Text>Cantidad Produccion</Text></View>
                                <View style={styles.tableCell}><Text>Producción</Text></View>
                            </View>
                            {produccion.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <View style={styles.tableData}><Text>{item.id_producccion}</Text></View>
                                    <View style={styles.tableData}><Text>{item.nombre_lote}</Text></View>
                                    <View style={styles.tableData}><Text>{item.cantidad_produccion}</Text></View>
                                    <View style={styles.tableData}><Text>{item.precio}</Text></View>
                                </View>
                            ))}
                            <View style={styles.tableRow}>
                                <View style={styles.tableCellTotal}><Text>Total:</Text></View>
                                <View style={styles.tableDataTotal}><Text>$4.000.000</Text></View>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Página ${pageNumber} de ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
};

export default PDF;
