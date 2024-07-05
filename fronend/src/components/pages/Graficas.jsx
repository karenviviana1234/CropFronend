import React, { useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import Header from '../organismos/Header/Header';
import './VistasCss.css';

const Graficas = () => {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const historiaRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  const dataset = {
    source: [
      ['product', '2020', '2021', '2022'],
      ['Yamboro', 10000, 40000, 123110],
      ['Brusuelas', 50000, 70000, 120000],
      ['RuizSeñor', 20000, 900000, 54000],
      ['sinai', 73000, 500000, 39000]
    ]
  };

  const pieOptions = {
    title: {
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    dataset: dataset,
    series: [
      {
        name: '2020',
        type: 'pie',
        radius: '50%',
        center: ['50%', '60%'],
        encode: {
          itemName: 'product',
          value: '2020'
        }
      }
    ]
  };

  const graficapie = {
    title: {
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    dataset: dataset,
    series: [
      {
        name: '2020',
        type: 'pie',
        radius: '50%',
        center: ['50%', '60%'],
        encode: {
          itemName: 'product',
          value: '2020'
        }
      }
    ]
  };

  const lineOptions = {
    title: {
    },
    legend: {},
    tooltip: {},
    dataset: dataset,
    xAxis: { type: 'category' },
    yAxis: {},
    series: [
      { type: 'line' },
      { type: 'line' },
      { type: 'line' }
    ]
  };

  const graficalineal = {
    title: {
    },
    legend: {},
    tooltip: {},
    dataset: dataset,
    xAxis: { type: 'category' },
    yAxis: {},
    series: [
      { type: 'line' },
      { type: 'line' },
      { type: 'line' }
    ]
  };

  return (
    <div className={`contenidos : '60px' ${sidebarAbierto ? 'contenido-extendidos' : ''}`}>
      <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      <div className='m-20 border shadow-2xl p-10'>
      <h1 className='mb-20 text-4xl text-center text-gray-700'>Distribución de las Inversiones Totales por Finca Registrada</h1>
      <h2>Fincas Registradas</h2>
      <ReactECharts option={pieOptions} style={{ height: '400px', width: '100%' }} />
      <ReactECharts option={lineOptions} style={{ height: '400px', width: '100%' }} />
      </div>
      <div className='m-20 border shadow-2xl p-10'>
      <h1 className='mb-20 text-4xl text-center text-gray-700'>Distribución de la Producción Total por Finca Registrada</h1>
      <h2>Fincas Registradas</h2>
      <ReactECharts option={graficapie} style={{ height: '400px', width: '100%' }} />
      <ReactECharts option={graficalineal} style={{ height: '400px', width: '100%' }} />
      </div>
    </div>
  );
};

export default Graficas;
