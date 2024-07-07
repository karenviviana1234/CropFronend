import React, { useState, useEffect } from 'react';
import ReactEchartsCore from 'echarts-for-react';
import * as echarts from 'echarts';
import axiosClient from '../axiosClient';
import Header from '../organismos/Header/Header';

function Grafica() {
  const [producciones, setProducciones] = useState([]);
  const [inversiones, setInversiones] = useState([]);
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  // Función para obtener las producciones por finca desde la API
  async function obtenerProducciones() {
    try {
      const token = localStorage.getItem('token');
      const getURL = 'http://localhost:3000/sumarProducciones';

      const response = await axiosClient.get(getURL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data);
      setProducciones(response.data);
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error('Error de respuesta:', error.response.data);
        console.error('Código de estado:', error.response.status);
        console.error('Encabezados de respuesta:', error.response.headers);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error('No se recibió respuesta:', error.request);
      } else {
        // Ocurrió un error antes de enviar la solicitud
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
  }

  // Función para obtener las inversiones por finca desde la API
  async function obtenerInversiones() {
    try {
      const token = localStorage.getItem('token');
      const getURL = 'http://localhost:3000/sumarProducciones';

      const response = await axiosClient.get(getURL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data);
      setInversiones(response.data);
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error('Error de respuesta:', error.response.data);
        console.error('Código de estado:', error.response.status);
        console.error('Encabezados de respuesta:', error.response.headers);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error('No se recibió respuesta:', error.request);
      } else {
        // Ocurrió un error antes de enviar la solicitud
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
  }

  // Efecto para llamar obtenerProducciones() y obtenerInversiones() al montar el componente
  useEffect(() => {
    obtenerProducciones();
    obtenerInversiones();
  }, []);

  // Función para formatear los datos para ECharts (producciones)
  const formatDataForChartProducciones = () => {
    const nombresFincas = producciones.map(produccion => produccion.nombre_finca);
    const valoresProduccion = producciones.map(produccion => ({
      name: produccion.nombre_finca,
      value: produccion.total_produccion
    }));

    return {
      nombresFincas,
      valoresProduccion
    };
  };

  // Función para formatear los datos para ECharts (inversiones)
  const formatDataForChartInversiones = () => {
    const nombresFincas = inversiones.map(inversion => inversion.nombre_finca);
    const valoresInversion = inversiones.map(inversion => ({
      name: inversion.nombre_finca,
      value: inversion.total_inversion
    }));

    return {
      nombresFincas,
      valoresInversion
    };
  };

  // Estado y configuración inicial del gráfico de producciones usando ECharts
  const [optionProducciones, setOptionProducciones] = useState({
    backgroundColor: 'white',
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: []
    },
    series: [
      {
        name: 'Producciones',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  // Estado y configuración inicial del gráfico de inversiones usando ECharts
  const [optionInversiones, setOptionInversiones] = useState({
    backgroundColor: 'white',
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: []
    },
    series: [
      {
        name: 'Inversiones',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  // Efecto para actualizar el gráfico de producciones cuando cambian los datos
  useEffect(() => {
    const { nombresFincas, valoresProduccion } = formatDataForChartProducciones();

    setOptionProducciones(prevOption => ({
      ...prevOption,
      legend: {
        ...prevOption.legend,
        data: nombresFincas
      },
      series: [
        {
          ...prevOption.series[0],
          data: valoresProduccion
        }
      ]
    }));
  }, [producciones]);

  // Efecto para actualizar el gráfico de inversiones cuando cambian los datos
  useEffect(() => {
    const { nombresFincas, valoresInversion } = formatDataForChartInversiones();

    setOptionInversiones(prevOption => ({
      ...prevOption,
      legend: {
        ...prevOption.legend,
        data: nombresFincas
      },
      series: [
        {
          ...prevOption.series[0],
          data: valoresInversion
        }
      ]
    }));
  }, [inversiones]);

  return (
    <div className={`contenidos ${sidebarAbierto ? 'contenido-extendidos' : ''}`}>
      <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      <div className='m-20 border shadow-2xl p-10'>
        <h1 className='mb-20 text-4xl text-center text-gray-700'>Distribución de las Producciones Totales por Finca Registrada</h1>
        <h2 className='mb-3 font-semibold'>Fincas Registradas:</h2>
        <ReactEchartsCore
          echarts={echarts}
          option={optionProducciones}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: '700px', width: '100%' }}
          theme="light"
        />
      </div>
      <div className='m-20 border shadow-2xl p-10'>
        <h1 className='mb-20 text-4xl text-center text-gray-700'>Distribución de las Inversiones Totales por Finca Registrada</h1>
        <h2 className='mb-3 font-semibold'>Fincas Registradas:</h2>
        <ReactEchartsCore
          echarts={echarts}
          option={optionInversiones}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: '600px', width: '100%' }}
          theme="light"
        />
      </div>
    </div>
  );
}

export default Grafica;
