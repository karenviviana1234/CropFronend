import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, LayersControl, useMapEvent, useMap } from 'react-leaflet';
import Header from '../organismos/Header/Header.jsx';
import L from 'leaflet';
import 'leaflet-minimap';
import 'leaflet-minimap/dist/Control.MiniMap.min.css'; // Importa el CSS del mini mapa
import axiosClient from '../axiosClient.js';
import './CssTablas.css';
import '../../mapa.css';

// Define los iconos personalizados
const houseIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/5074/5074409.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const lotIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1581/1581869.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

function MiniMap() {
  const map = useMap();

  useEffect(() => {
    const miniMapLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 0,
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    });

    const miniMap = new L.Control.MiniMap(miniMapLayer, {
      toggleDisplay: true,
      minimized: false,
      position: 'bottomleft' // Posiciona el mini mapa en la esquina inferior izquierda
    }).addTo(map);

    return () => {
      miniMap.remove();
    };
  }, [map]);

  return null;
}

function Map() {
  const [fincas, setFincas] = useState([]);
  const [lotes, setLotes] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    peticionGet();
    peticionLo();
  }, []);

  const peticionGet = async () => {
    try {
      const response = await axiosClient.get('/finca/listarFinca');
      const fincasActivas = response.data.filter(finca => finca.estado === 'activo');
      setFincas(fincasActivas);
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  };

  const peticionLo = async () => {
    try {
      const response = await axiosClient.get('/listarlote');
      const lotesActivos = response.data.filter(lote => lote.estado === 'activo');
      setLotes(lotesActivos);
    } catch (error) {
      console.error('Error al obtener los lotes:', error);
    }
  };

  const showPopup = (lat, lng, name) => {
    L.popup()
      .setLatLng([lat, lng])
      .setContent(`Nombre: ${name}<br>Coordenadas: ${lat}, ${lng}`)
      .openOn(mapRef.current);
  };

  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  const fincasLayer = fincas.map(finca => (
    <Marker
      key={finca.id_finca}
      position={[finca.latitud, finca.longitud]}
      icon={houseIcon}
      eventHandlers={{
        click: () => showPopup(finca.latitud, finca.longitud, finca.nombre_finca),
        dblclick: () => {
          const map = mapRef.current;
          if (map) {
            map.flyTo([finca.latitud, finca.longitud], map.getMaxZoom());
          }
        }
      }}
    >
      <Popup>{finca.nombre_finca}</Popup>
    </Marker>
  ));

  const lotesLayer = lotes.map(lote => (
    <Marker
      key={lote.id_lote}
      position={[lote.latitud, lote.longitud]}
      icon={lotIcon}
      eventHandlers={{
        click: () => showPopup(lote.latitud, lote.longitud, lote.nombre),
        dblclick: () => {
          const map = mapRef.current;
          if (map) {
            map.flyTo([lote.latitud, lote.longitud], map.getMaxZoom());
          }
        }
      }}
    >
      <Popup>{lote.nombre}</Popup>
    </Marker>
  ));

  const fincasGroup = <LayerGroup>{fincasLayer}</LayerGroup>;
  const lotesGroup = <LayerGroup>{lotesLayer}</LayerGroup>;

  function MapClickHandler() {
    useMapEvent('click', (e) => {
      const { lat, lng } = e.latlng;
      L.popup()
        .setLatLng(e.latlng)
        .setContent(`Has clickeado ${e.latlng.toString()}`)
        .openOn(mapRef.current);
    });

    return null;
  }

  return (
    <div className={`contenido ${sidebarAbierto ? 'contenido-extendido' : ''}`}>
      <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      <div id="map-container">
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }} ref={mapRef}>
          <LayersControl position="topright">
            {/* Capas base */}
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Streets">
              <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" maxZoom={20} subdomains={['mt0','mt1','mt2','mt3']} />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Satellite">
              <TileLayer url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" maxZoom={20} subdomains={['mt0','mt1','mt2','mt3']} />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="CartoDB Positron">
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
            </LayersControl.BaseLayer>
            
            
            {/* Superposiciones */}
            <LayersControl.Overlay name="Fincas">
              {fincasGroup}
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Lotes">
              {lotesGroup}
            </LayersControl.Overlay>
          </LayersControl>
          <MapClickHandler />
          <MiniMap />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
