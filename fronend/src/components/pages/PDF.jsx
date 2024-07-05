import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import HeaderPDF from '../moleculas/PDF/HeaderPDF';

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
        alignItems: 'stretch', // Asegura que todas las celdas tengan la misma altura
    },
    tableCell: {
        flex: 1, // Hace que todas las celdas tengan el mismo ancho
        justifyContent: 'center', // Centra verticalmente el contenido
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        color: '#FFFFFF',
        backgroundColor: '#006000',
        fontSize: '11px',
    },
    tableData: {
        flex: 1, // Hace que todas las celdas tengan el mismo ancho
        justifyContent: 'center', // Centra verticalmente el contenido
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        color: '#000000',
        backgroundColor: '#E5EAEE',
        fontSize: '11px',
    },
    tableCellTotal: {
        flex: 5, // Ajusta el ancho de la celda "Total"
        justifyContent: 'center', // Centra verticalmente el contenido
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        color: '#FFFFFF',
        backgroundColor: '#006000',
        fontSize: '11px',
    },
    tableDataTotal: {
        flex: 1, // Hace que todas las celdas tengan el mismo ancho
        justifyContent: 'center', // Centra verticalmente el contenido
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

const PDF = () => (
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
                            <View style={styles.tableCell}><Text>Numero</Text></View>
                            <View style={styles.tableCell}><Text>Lote</Text></View>
                            <View style={styles.tableCell}><Text>Cultivo</Text></View>
                            <View style={styles.tableCell}><Text>Cantidad Sembrada</Text></View>
                            <View style={styles.tableCell}><Text>Asignacion</Text></View>
                            <View style={styles.tableCell}><Text>Valor Inversion</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableData}><Text>1</Text></View>
                            <View style={styles.tableData}><Text>B</Text></View>
                            <View style={styles.tableData}><Text>2</Text></View>
                            <View style={styles.tableData}><Text>2</Text></View>
                            <View style={styles.tableData}><Text>$2.000.0000</Text></View>
                        </View>
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
                            <View style={styles.tableCell}><Text>Cultivo</Text></View>
                            <View style={styles.tableCell}><Text>Cantidad</Text><Text>Produccion</Text></View>
                            <View style={styles.tableCell}><Text>Producción</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableData}><Text>1</Text></View>
                            <View style={styles.tableData}><Text>B</Text></View>
                            <View style={styles.tableData}><Text>Cebolla</Text></View>
                            <View style={styles.tableData}><Text>50</Text></View>
                            <View style={styles.tableData}><Text>200000</Text></View>
                        </View>
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

export default PDF;
