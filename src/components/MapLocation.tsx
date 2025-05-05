import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Para criar um ícone customizado
import "leaflet/dist/leaflet.css";

// Tipos para simulação de dados
interface LocationData {
  latitude: number;
  longitude: number;
}

// Trajeto simulado (pode ser alterado para o trajeto real do pedido)
const route: LocationData[] = [
  { latitude: -23.55052, longitude: -46.633308 }, // São Paulo (início)
  { latitude: -23.55100, longitude: -46.63400 },
  { latitude: -23.55200, longitude: -46.63500 },
  { latitude: -23.55300, longitude: -46.63600 }, // São Paulo (final)
];

const MapLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Índice para o trajeto

  useEffect(() => {
    // Função para simular o movimento ao longo do trajeto
    const interval = setInterval(() => {
      setLocation(route[currentIndex]); // Atualiza a posição do marcador
      setCurrentIndex((prevIndex) => (prevIndex + 1) % route.length); // Avança no trajeto (volta ao início quando chega ao final)
    }, 3000); // Atualiza a cada 3 segundos (ajustável para simular o tempo de movimento)

    return () => clearInterval(interval); // Limpar o intervalo quando o componente for desmontado
  }, [currentIndex]);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[route[0].latitude, route[0].longitude]} // Começa com a posição inicial
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && (
          <Marker
            position={[location.latitude, location.longitude]}
            icon={new L.Icon({
              iconUrl: "/locationIcon.svg", // Ícone customizado
              iconSize: [30, 30],
            })}
          >
            <Popup>
              Pedido em andamento. Localização: {location.latitude}, {location.longitude}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapLocation;