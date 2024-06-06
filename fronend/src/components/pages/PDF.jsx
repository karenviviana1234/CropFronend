import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import HeaderPDF from '../moleculas/PDF/HeaderPDF';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row'
    },
    section: {
        margin: '5px',
        marginTop: '80px',
        padding: 10,
        flexGrow: 1,
        textAlign: 'center'
    },
    tituloUno: {
        margin: 30,
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
    },
    table: {
        marginTop: '20px',
        marginBottom: '20px',
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
    }, tableCellTotal: {
        flex: 4, // Ajusta el ancho de la celda "Total"
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
            <View style={styles.section}>
                <Text style={styles.tituloUno}>REPORTE GENERAL</Text>
                <Text style={styles.text}>INVERSIONES Y PRODUCCIONES</Text>
                <View style={styles.line} />
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                    <View style={styles.tableCell}><Text>Numero</Text></View>
                        <View style={styles.tableCell}><Text>Lote</Text></View>
                        <View style={styles.tableCell}><Text>Tipo de Cultivo</Text></View>
                        <View style={styles.tableCell}><Text>Cultivo</Text></View>
                        <View style={styles.tableCell}><Text>Cantidad</Text><Text>Sembrada</Text></View>
                        <View style={styles.tableCell}><Text>Inversión</Text></View>
                        <View style={styles.tableCell}><Text>Producción</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableData}><Text>1</Text></View>
                        <View style={styles.tableData}><Text>A</Text></View>
                        <View style={styles.tableData}><Text>Alimenticios</Text></View>
                        <View style={styles.tableData}><Text>Maiz</Text></View>
                        <View style={styles.tableData}><Text>50</Text></View>
                        <View style={styles.tableData}><Text>$1000</Text></View>
                        <View style={styles.tableData}><Text>800 kg</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableData}><Text>1</Text></View>
                        <View style={styles.tableData}><Text>B</Text></View>
                        <View style={styles.tableData}><Text>Alimenticios</Text></View>
                        <View style={styles.tableData}><Text>Maiz</Text></View>
                        <View style={styles.tableData}><Text>20</Text></View>
                        <View style={styles.tableData}><Text>$1000</Text></View>
                        <View style={styles.tableData}><Text>800 kg</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableData}><Text>1</Text></View>
                        <View style={styles.tableData}><Text>C</Text></View>
                        <View style={styles.tableData}><Text>Alimenticios</Text></View>
                        <View style={styles.tableData}><Text>Maiz</Text></View>
                        <View style={styles.tableData}><Text>200</Text></View>
                        <View style={styles.tableData}><Text>$1000</Text></View>
                        <View style={styles.tableData}><Text>800 kg</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCellTotal}><Text>Total:</Text></View>
                        <View style={styles.tableDataTotal}><Text>$4.000.000</Text></View>
                        <View style={styles.tableDataTotal}><Text>$5.000.000</Text></View>
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