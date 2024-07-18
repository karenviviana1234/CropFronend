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
        console.error('Error de respuesta:', error.response.data);
        console.error('Código de estado:', error.response.status);
        console.error('Encabezados de respuesta:', error.response.headers);
      } else if (error.request) {
        console.error('No se recibió respuesta:', error.request);
      } else {
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
  }

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
        console.error('Error de respuesta:', error.response.data);
        console.error('Código de estado:', error.response.status);
        console.error('Encabezados de respuesta:', error.response.headers);
      } else if (error.request) {
        console.error('No se recibió respuesta:', error.request);
      } else {
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
  }

  useEffect(() => {
    obtenerProducciones();
    obtenerInversiones();
  }, []);

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
      <div className='mx-20 my-5 border shadow-2xl p-8'style={{ height: '550px'}}>
        <h1 className='mb-2 text-4xl text-center text-gray-700'>Producciones</h1>
        <h2 className='font-semibold'>Fincas Registradas:</h2>
        <ReactEchartsCore
          echarts={echarts}
          option={optionProducciones}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: '440px', width: '100%' }}
          theme="light"
        />
      </div>
      <div className='mx-20 my-5 border shadow-2xl p-8'style={{ height: '550px'}}>
        <h1 className='mb-2 text-4xl text-center text-gray-700'>Inversiones</h1>
        <h2 className='font-semibold'>Fincas Registradas:</h2>
        <ReactEchartsCore
          echarts={echarts}
          option={optionInversiones}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: '440px', width: '100%' }}
          theme="light"
        />
      </div>
    </div>
  );
}

export default Grafica;

